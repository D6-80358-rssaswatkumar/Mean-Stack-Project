const express = require('express');
const mongo = require('mongodb');

const url = "mongodb://localhost:27017/"
const checkAuthentication= require('../middlewire/checkauth');
const router = express.Router();

router.get("/posts",(req,res)=>{
    mongo.connect(url,(err,db)=>{
        if(err)
        {
            throw err;
        }
        const postDb = db.db("postdb");
        postDb.collection("posts").find().toArray((err,result)=>
        
        {
            if(err)
                {
                    throw err;
                }
            
            res.status(200).json(
                {
                    message: "Post Fetched" ,
                    posts: result
                })
            

        })

    
    })
   
})

router.post("/save",checkAuthentication,(req,res)=>{
    const post = 
    {
        title : req.body.title,
        body : req.body.body,
    }
    mongo.connect(url,(err,db)=>{
        if(err)
        {
            throw err;
        }
        const postDb = db.db("postdb");
        postDb.collection("posts").insertOne(post,(err,result)=>
        
        {
            if(err)
                {
                    throw err;
                }
            
            res.status(200).json(
                {
                    message: "Post saved successfully" ,
                    posts: result
                })
            

        })

    
    })
})

router.post('/onepost', (req, res) => {
    //console.log(req.body)
    const id = req.body.id
    mongo.connect(url, (err, db) => {
        if (err)
            throw err
        const postDb = db.db('postDB')
        ObjectID = mongo.ObjectID;
        postDb.collection('posts').findOne({ _id: ObjectID(id) }, (err, result) => {
            res.status(200).json({
                message: "Post Fetched",
                posts: result
            })
        })
    })
})

router.put('/update', (req, res) => {
    console.log(req.body.id)
    console.log(req.body.body)
    console.log(req.body.title)
    const id = req.body.id
    const post = {
        $set: {
            title: req.body.title,
            body: req.body.body
        }

    }
    mongo.connect(url, (err, db) => {
        if (err)
            throw err
        const postDb = db.db('postDB');
        ObjectID = mongo.ObjectID;
        postDb.collection('posts').updateOne({_id: ObjectID(id)}, post, (err, result) => {
            if (err)
            {
                throw err
            }
                
            res.status(200).json({
                message: "Post Updated Successfully",
                posts: result
            })
        })
    })
})

router.delete('/delete', (req, res) => {
    console.log(req.body)
    const id = req.body.id


    mongo.connect(url, (err, db) => {
        if (err)
            throw err
            const postDb = db.db("postdb");
           ObjectID = mongo.ObjectID;
        postDb.collection('posts').deleteOne({ _id: ObjectID(id) }, (err, result) => {
            if (err)
                throw err
            res.status(202).json({
                message: "post Deleted Successfully",
                posts: result
            })
        })
    })
})
module.exports = router; 