import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
 isLoading = false;
 error:string= null;
 authForm: FormGroup;
 takenUserNames = ['pradeep','parker']

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(null, [Validators.required, this.takenNames.bind(this)]),
      password: new FormControl(null, Validators.required),
    });

    this.authForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    this.authForm.setValue({
        username:'mor_2314',
        password:'83r5^_'
      
    })

  }

  onSubmit() {
    this.authForm.value.username
     this.isLoading= true;
    this.authService.signIn(this.authForm.value.username, this.authForm.value.password).subscribe({
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

    this.authForm.reset();
  }

  takenNames(control: FormControl):{[s:string]:boolean}{
    if(this.takenUserNames.indexOf(control.value) !== -1){
      return {'Username taken': true}
    }
    return null
  }
}
