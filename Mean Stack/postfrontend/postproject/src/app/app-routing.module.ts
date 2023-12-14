import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostlistComponent } from './postlist/postlist.component';
import { PostformComponent } from './postform/postform.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common'; 
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent

  },
  {
    path : 'addPost',
    component: PostformComponent

  },
  {
    path : 'list',
    component: PostlistComponent

  },
  {
    path : 'editPost/:id/:title',
    component: PostformComponent

  }, 
  {
    path : 'YourPosts',
    component: PostlistComponent

  }, 
  {
    path : 'register',
    component: RegisterComponent

  }, 
  {
    path : 'login',
    component: LoginComponent

  }, 
  
  {
    path : '**',
    component: NotfoundComponent

  }
]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
