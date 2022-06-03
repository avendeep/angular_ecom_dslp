import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { User } from './user.model';
//import { catchError } from 'rxjs';

interface AuthResponseData{
    token:string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject();

  constructor(private http: HttpClient) {}

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
        })
      );
  }
}
