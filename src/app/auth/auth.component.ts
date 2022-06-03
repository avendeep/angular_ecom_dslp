import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
 isLoading = false;
 error:string= null;

  constructor(private authService: AuthService, private router:Router) {}

  onSubmit(form: NgForm) {
    console.log(form.value);

    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;
     this.isLoading= true;
    this.authService.signIn(username, password).subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading= false;
          this.router.navigate(['/products'])
        },
        error: (errorRes) => {
          console.log(errorRes);
          this.error = errorRes.error;
          this.isLoading= false;
        },
      });

    form.reset();
  }
}
