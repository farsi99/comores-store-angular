import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/model/users';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Users;
  loginForm: FormGroup;
  errorMessage:string;

  constructor(private userService:UsersService, private fb:FormBuilder, private cartService:CartService, private router:Router) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin():void{
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required,Validators.email]),
      password: this.fb.control('', [Validators.required,Validators.minLength(6)])
    });
  }

  onSubmit():void{
   const email = this.loginForm.get("email").value;
   const password = this.loginForm.get("password").value;

   const newUser:Users = {email: email, password:password};
   this.userService.authentifier(newUser)
   .then((data)=>{
     const cart = this.cartService.cart;
     if(cart.length){
      this.router.navigate(['/checkout']);
     }else{
      this.router.navigate(['/shop']);
     }

   }).catch((error)=>{
     setTimeout(()=>{
      this.errorMessage = null;
     },3000);
     this.errorMessage = error;
    console.log(error);
   });
  }
}
