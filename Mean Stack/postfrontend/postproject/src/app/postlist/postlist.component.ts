import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import  { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {

  posts: Post[] ;

  post :Post
  
  id:string;
  title : string;
  body:string;
constructor(private _postService : PostService, private _activatedRouter : ActivatedRoute,public router:Router,private _location:Location){}

  ngOnInit()
  {
    this._postService.getPost().pipe(map(responseData=>{
      return responseData.posts.map(post=>{
        return{
          id : post._id,
          title : post.title,
          body : post.body
        }
      })
    })).subscribe(changedData=>{
      this.posts = changedData;
    })
    }
    
    onDeletePost(postl: Post)
    {
      this._postService.deletePost(postl).subscribe();
      this.router.navigate(['YourPosts']);
      window.location.reload();
    
    
    }
    
}
