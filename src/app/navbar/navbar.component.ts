import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private jwtHelper:JwtHelperService,private router:Router) { }

  ngOnInit(): void {
  }


  Logedinuser:boolean;
    IsLogin(){
    this.Logedinuser=false;
   var token=localStorage.getItem('jwt');
   if(token && !this.jwtHelper.isTokenExpired(token)){

     this.Logedinuser=true;
   }
   return this.Logedinuser;
  }

  Logout(){
       //localStorage.removeItem('userName');
       localStorage.removeItem('jwt');
       console.log(this.IsLogin());
       this.router.navigate(['/login']);
  }
}
