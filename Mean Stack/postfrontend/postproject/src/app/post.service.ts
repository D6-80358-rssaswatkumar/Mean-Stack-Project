import { Injectable } from '@angular/core';
import{ Post } from './Post';
import{ HttpClient ,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 
   private _url :string="http://localhost:8080/api/";

  constructor( private _http : HttpClient) { }
  
   getPost()
   {
    return this._http.get<{message:string, posts :any}>(this._url+"posts");
   }
 
  getPostById(id : string)
  {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+localStorage.getItem('token')
    })
    const httpOptions ={
      headers : httpHeaders
    }
    return this._http.post<{message:string,posts:any}>(this._url+'onepost',{id:id},httpOptions)
 
  }
  savePost(post : Post)
  {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+localStorage.getItem('token')
    })
    const httpOptions ={
      headers : httpHeaders
    }

    return this._http.post<{message : string,posts:any}>(this._url+"save",post,httpOptions)
   }
  onUpdatePost(post :Post)
  {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+localStorage.getItem('token')
    })
    const httpOptions ={
      headers : httpHeaders
    }
    return this._http.put<{message : string,posts:any}>(this._url+"update",post,httpOptions)
 
  }
  deletePost(delPost :Post){
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer '+localStorage.getItem('token')
      
    })
    const httpOptions ={
      headers : httpHeaders
    }
    console.log('del')
    const options ={
      headers : new HttpHeaders({
        'Content-type':'application/json'
      }),
      body : JSON.stringify(delPost)
    }
    console.log(options)
    return this._http.delete<{message : string,posts:any}>(this._url+"delete",options)
  }

}
