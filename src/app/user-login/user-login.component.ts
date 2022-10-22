import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { HttpErrorInterceptorService } from '../Intercepator/http-error-interceptor.service';
import { Login } from '../model/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {


  constructor(private _fb:FormBuilder, private _auth:AuthService,private router:Router,private httperrorinterceptor:HttpErrorInterceptorService) { }
  public LoginForm:FormGroup;
  SubmitButton:boolean;
 login= new Login();
  ngOnInit(): void {


    this.CreatLoginForm();
  }

  CreatLoginForm(){
    // this.LoginForm = this._fb.group({
    //     email: ['' ,Validators.compose([Validators.required,Validators.email])],
    //     password: ['' , Validators.required],

    //   })
   this.LoginForm = new FormGroup({
        email:new FormControl('', Validators.compose([Validators.required,Validators.email])),
        password: new FormControl('',Validators.required),
      })

    }

    onSubmit(){
      this.SubmitButton=true;
       if(this.LoginForm.valid){
        this.LoginMap();
             this._auth.Login(this.login).subscribe(res=>{
             if(res.token !=null){
             localStorage.setItem('jwt',res.token);
            this.router.navigate(["/"]);

             }
                  }
                  // , error=>{
                  //       this.httperrorinterceptor.handleError(error);
                  //       // if(error.status===401){
                  //       //  alert('Un authorized');
                  //       this.router.navigate(['/login']);
                  //       //}
                  //     }



                       )
                }
            else{
           alert("Please fill your form Correctlly");
                }
    }

    LoginMap():void{
      this.login.email = this.LoginForm.controls['email'].value;
      this.login.password = this.LoginForm.controls['password'].value;
    }


}
