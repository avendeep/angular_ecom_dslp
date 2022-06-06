import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';
//import { catchError } from 'rxjs';

interface AuthResponseData{
    token:string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<any>(null);
  token:string=null;

  constructor(private http: HttpClient,private router:Router ) {}

  signIn(username: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((resData) => {
          const user = new User(resData.token);
          this.user.next(user);
          localStorage.setItem('userData',JSON.stringify(user))
        })
      );
  }

  autoLogin(){
    const userData:{_token:string} = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return;
    }
    const loadedUser = new User(userData._token)
     
    if(loadedUser.token){
      this.user.next(loadedUser)
    }

  }

  logout(){
    this.user.next(null)
    localStorage.removeItem('userData')
     this.router.navigate(['/auth']);
  }

}
