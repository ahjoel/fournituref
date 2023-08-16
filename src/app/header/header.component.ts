import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuthenticated = false;

  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Check if the user is authenticated and set the value of the isAuthenticated property accordingly.
    // For example, if you are using JWT authentication and the token is stored in the browser's local storage:
    // const authToken = localStorage.getItem('token');
    // this.refreshComponent();
    let isloggedin: string;
    let loggedUser: string;
    
    isloggedin = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    
    this.isAuthenticated = (isloggedin !== null);
    
    if (isloggedin != 'true' || !loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }

  refreshComponent() {
    const currentRoute = this.route.snapshot.url.join('/');
    const queryParams = {timestamp: new Date().getTime()};
    this.router.navigate([currentRoute], {queryParams: queryParams});
  }

  onLogout() {
    this.authService.logout();
  }
}
