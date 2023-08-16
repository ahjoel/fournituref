import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();
  erreur = 0;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLoggedIn() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser) {
      this.router.navigate(['/']);
    } else {
      this.erreur = 1;
    }
  }
}
