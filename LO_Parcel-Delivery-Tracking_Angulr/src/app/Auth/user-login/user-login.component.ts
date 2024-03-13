import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponseMessageVM, UserLoginFormVM } from 'src/app/Shared/Models/user-auth-vm';
import { AuthService } from 'src/app/Shared/Services/auth.service';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userRoles: string[] = ["Administrator", "Manager", "Driver"];

  formModel: UserLoginFormVM = {
    userName: '',
    password: ''
  };

  formLoggedIn: LoginResponseMessageVM = {
    userName:  '',
    userRole: '',
    firstName: '',
    lastName: '',
    fullName: '',
    isAdminUserRole: false,
    message: '',
  };


  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    this.auth.userLogin(form.value.userName, form.value.password).subscribe((data) => {
      console.log(data);

      setTimeout(() => {
        const userRole = localStorage.getItem('userRole');
        console.log('Role ' + userRole);

        if (userRole === 'Administrator') {
          this.router.navigate(['/dlv']); // Navigate to '/dlv' for Administrators
        }else if (userRole === 'Driver') {
          this.router.navigate(['']); // Navigate to the desired path for Drivers
        } else if (userRole === 'Manager') {
          this.router.navigate(['']); // Navigate to the desired path for Managers
        }
        else{
          alert("Invalid username or password.");
        }
      }, 1000);
    });
  }

  isLoginView = true;
  loginFormLeft = 0;

  toggleView() {
    this.isLoginView = !this.isLoginView;
    this.loginFormLeft = this.isLoginView ? 0 : 50;
  }
}
