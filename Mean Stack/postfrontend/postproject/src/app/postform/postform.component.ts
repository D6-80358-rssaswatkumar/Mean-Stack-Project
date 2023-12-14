import { Component, OnInit} from '@angular/core';
import { Post} from '../Post';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {

 
  post : Post
  
  id: string;
  title : string;
  body : string;
  isActive : boolean = true;
 // postsaved: boolean=false;

  constructor(private _postService : PostService , private _activatedRouter: ActivatedRoute ) { }

  ngOnInit() : void{
    this._activatedRouter.paramMap.subscribe(param => this.id = (param.get('id')));
    this._activatedRouter.paramMap.subscribe(param => this.title = (param.get('title')));
    console.log(this.id);
    if(this.id != null){
        this._postService.getPostById(this.id).pipe(map(responseData=>{
          
        this.title = responseData.posts.title;
        this.body = responseData.posts.body;
      })).subscribe();
      this.updatePost();
      
    }
    
  }

onCreatePost()
{
  this.post = {id:null,title:this.title,body:this.body}
      this._postService.savePost(this.post).subscribe(responseData=>{
        if(responseData.posts.ops[0]._id)
        {
          //this.postsaved = true;
        }

      });
}
 
  updatePost()
  {
    this.post = {id : this.id, title : this.title, body : this.body}

    this._postService.onUpdatePost(this.post).subscribe(responseData=>{
      if(responseData.posts.ops[0]._id){}
       // this.postSaved=true;
      
    })
  }
   
   buttonActive()
   {
    if(this.title == null||this.body == null)
    {
      return  this.isActive=true;

    }
      
    else
    {
      return  this.isActive=false;
    }
   
  }
}
