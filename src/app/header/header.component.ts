import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated:boolean = false
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
        this.isAuthenticated = !user? false:true;
        console.log(this.isAuthenticated)
    });
  }

  onLogout(){
    this.authService.logout()
    console.log("Logged out")
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
