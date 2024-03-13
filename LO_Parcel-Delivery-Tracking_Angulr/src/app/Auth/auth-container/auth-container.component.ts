import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.css']
})
export class AuthContainerComponent implements OnInit  {


  ngOnInit(): void {

  }


  isLoginView = true;
  loginFormLeft = 0;
  registerFormLeft = -400;
  formBoxHeight = '500px';

  toggleView() {
    this.isLoginView = !this.isLoginView;
    this.loginFormLeft = this.isLoginView ? 0 : 50;
    this.registerFormLeft = this.isLoginView ? -400 : 50;
    this.formBoxHeight = this.formBoxHeight === '500px' ? '720px' : '500px';
  }
}
