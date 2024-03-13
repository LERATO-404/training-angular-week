import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormVM } from 'src/app/Shared/Models/user-auth-vm';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  formModel: UserRegistrationFormVM = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userName: '',
    role: ''
  };

  userRegData: UserRegistrationFormVM = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userName: '',
    role: 'Driver'
  };


  constructor(private auth: AuthService) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.userRegData.email = form.value.email;
    this.userRegData.firstName = form.value.firstName;
    this.userRegData.lastName = form.value.lastName;
    this.userRegData.password = form.value.password;
    this.userRegData.userName = form.value.userName;

    console.log(this.userRegData);

    this.auth.userRegistration(this.userRegData).subscribe((data) => {
      console.log(data);
    });
  }

  isLoginView = true;
  loginFormLeft = 0;
  registerFormLeft = 0;

  toggleView() {
    this.isLoginView = !this.isLoginView;
    this.loginFormLeft = this.isLoginView ? 0 : 50;
    this.registerFormLeft = this.isLoginView ? -400 : 50;
  }
}
