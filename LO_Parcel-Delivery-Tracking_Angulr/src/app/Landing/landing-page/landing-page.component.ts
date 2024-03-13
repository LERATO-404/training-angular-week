import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit  {

  headerLinks = [
    { url: '/home', text: 'Home' },
    { url: '/about', text: 'About' },
    { url: '/services', text: 'Services' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onSubmitLogin(){
    this.router.navigate(['/login']);
  }



}
