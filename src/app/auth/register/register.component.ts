import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Result } from 'src/app/model/result';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  errorMessage:string
  successMessage;

  constructor(private fb:FormBuilder, private userService:UsersService, private router:Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(){
    //On valide les données et on crée le lien avec le formulaire
    this.registerForm = this.fb.group({
      sexe: this.fb.control('',[Validators.required]),
      pseudo: this.fb.control('',[Validators.required]),
      firstname: this.fb.control('',[Validators.required,Validators.minLength(3)]),
      lastname: this.fb.control('',[Validators.required]),
      email: this.fb.control('',[Validators.required, Validators.email]),
      password: this.fb.control('',[Validators.required, Validators.minLength(6)]),
      dateBirth: this.fb.control('',[Validators.required]),
    });
  }

  onSubmit(){
    //On recupere les données saisie par l'utilisateur
    const sexeUser = this.registerForm.get('sexe').value;
    const pseudoUser = this.registerForm.get('pseudo').value;
    const firstnameUser = this.registerForm.get('firstname').value;
    const lastnameUser = this.registerForm.get('lastname').value;
    const emailUser = this.registerForm.get('email').value;
    const passwordUser = this.registerForm.get('password').value;
    const dateBirthUser = this.registerForm.get('dateBirth').value;

    const newUser:Users={sexe:sexeUser,
                         firstname: firstnameUser,
                         lastname: lastnameUser,
                         email: emailUser,
                         password: passwordUser,
                         dateBirth: dateBirthUser,
                         pseudo: pseudoUser

    }
    this.userService.createUser(newUser)
    .then((data: Result)=>{
      this.errorMessage=null;
      this.successMessage=data.result;
      setTimeout(()=>{
        this.successMessage=null;
        this.router.navigate(['/shop']);
      },2000)

    }).catch((error)=>{
      this.errorMessage = error;
      setTimeout(()=>{
        this.errorMessage = null;
      },3000);
      console.log(error);

    })
  }
}
