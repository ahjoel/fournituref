import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
import 'datatables.net';
import { AuthService } from './service/auth.service';
declare var $: any; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public authService: AuthService, public router: Router){}
  
  ngOnInit() {
    (() => {
      'use strict';
      $('#sidebarToggle, #sidebarToggleTop').on('click', function (e: any) {
        $('body').toggleClass('sidebar-toggled');
        $('.sidebar').toggleClass('toggled');
        if ($('.sidebar').hasClass('toggled')) {
          $('.sidebar .collapse').collapse('hide');
        }
      });
  
      $(window).resize(function () {
        if ($(window).width() < 768) {
          $('.sidebar .collapse').collapse('hide');
        }
        if ($(window).width() < 480 && !$('.sidebar').hasClass('toggled')) {
          $('body').addClass('sidebar-toggled');
          $('.sidebar').addClass('toggled');
          $('.sidebar .collapse').collapse('hide');
        }
      });

  
      //   let o;
      //   if (768 < $(window).width()) {
      //     o = e.originalEvent;
      //     let delta = o.wheelDelta || -o.detail;
      //     this.scrollTop += 30 * (delta < 0 ? 1 : -1);
      //     e.preventDefault();
      //   }
      // });
  
      // $(document).on('scroll', function () {
      //   if (100 < $(this).scrollTop()) {
      //     $('.scroll-to-top').fadeIn();
      //   } else {
      //     $('.scroll-to-top').fadeOut();
      //   }
      // });
  
      // $(document).on('click', 'a.scroll-to-top', function (e: any) {
      //   const o = $(this);
      //   $('html, body')
      //     .stop()
      //     .animate(
      //       { scrollTop: $(o.attr('href')).offset().top },
      //       1000,
      //       'easeInOutExpo'
      //     );
      //   e.preventDefault();
      // });
    })();

    let isloggedin: string;
    let loggedUser: string;

    isloggedin = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    
    if (isloggedin != 'true' || !loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }

  onLogout() {
    this.authService.logout();
  }
  
}
