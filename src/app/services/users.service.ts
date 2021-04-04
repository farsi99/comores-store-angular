import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../model/result';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: Users;
  userSubject = new Subject<Users>();
  isAuth:boolean = false;


  constructor(private http: HttpClient) { }

  emitUser(): void {
    this.userSubject.next(this.user);
  }

  authentifier(newUser: Users) {
    return new Promise(
      (resolve,reject)=>{
        const url = `${environment.API+'authentifier.php?API_KEY='+environment.API_KEY}`+'&email='+newUser.email+'&password='+newUser.password;
        this.http.get(url).subscribe((data:Result)=>{
          if(data.status == 200){
            this.user = data.result;
            this.isAuth = true;
            this.emitUser();
            resolve(data.result);
          }else{
            console.log('Erreur: ', data.message);
            reject(data.message);
          }
        },(error)=>{
          console.log('Erreur: ', error);
          reject(false);
        });
      });
  }

  createUser(newUser:Users){
    return new Promise((resolve,reject)=>{
      const url = `${environment.API+'createUsers.php?API_KEY='+environment.API_KEY}`+'&email='+newUser.email+'&password='+newUser.password+'&sexe='+newUser.sexe+'&firstname='+newUser.firstname+'&lastname='+newUser.lastname+'&dateBirth='+newUser.dateBirth+'&pseudo='+newUser.pseudo;
      console.log('User: ', newUser);
      this.http.get(url).subscribe(
        (data:Result)=>{
          if(data.status == 200){
            this.user = data.args;
            this.isAuth = true;
            this.emitUser();
            resolve(data);
          }else{
            console.log(data.message);
            reject(data.message);
          }
      }, (error)=>{
        reject(error);
      });
    });
  }

  logout():void{
    this.user = null;
    this.isAuth = false;
    this.userSubject  = new Subject<Users>();
  }

}
