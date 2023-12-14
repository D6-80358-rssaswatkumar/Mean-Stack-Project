import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import{ Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string;
  password : string;
  LoginFailedMessage : string;
  isLoggedInFailed : boolean= true
  constructor(private _userService : UsersService, private _router : Router) { }

  ngOnInit(): void {
  }
  onLogin()
  {
    this._userService.doLogin({email : this.email, password: this.password}).subscribe(responseData=>
      {
        if(responseData.token!='')
        {
          console.log(responseData.token);
          const token = responseData.token;
          const userName = responseData.user.userName;
          localStorage.setItem('token',token);
          localStorage.setItem('userName',userName);
          this.isLoggedInFailed = false
          this._router.navigate(['/']);


        }
        else{
          this.LoginFailedMessage=responseData.message;
          this.isLoggedInFailed= false;
        }
        

      })

  }

}
