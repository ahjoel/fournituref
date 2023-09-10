import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuthenticated = false;

  constructor(public authService: AuthService, private renderer: Renderer2, private route: ActivatedRoute, private router: Router) {}

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

  
  toggleSidebar() {
    const bodyElement = document.getElementById('page-top');
    const bodyElementUl = document.getElementById('accordionSidebar');
    if (bodyElement) {
      if (bodyElement.classList.contains('sidebar-toggled')) {
        // La classe est déjà présente, donc nous la retirons
        this.renderer.removeClass(bodyElement, 'sidebar-toggled');
        this.renderer.removeClass(bodyElementUl, 'toggled');
      } else {
        // La classe n'est pas présente, donc nous l'ajoutons
        this.renderer.addClass(bodyElement, 'sidebar-toggled');
        this.renderer.addClass(bodyElementUl, 'toggled');
      }
    }
  }
}
