import { Injectable } from '@angular/core';
import { Observable,  of, map, catchError } from 'rxjs';
import { LoginResponseMessageVM, LoginResponseVM, UserLoginFormVM, UserRegistrationFormVM } from '../Models/user-auth-vm';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseurl: string = GlobalConstants._RestBaseURL;

  constructor(private http: HttpClient) { }


  isLoggedIn() {
    let loggedInUser = localStorage.getItem('user');
    let currUser: string = localStorage.getItem('userName') || '';
    console.log("isLoggedIn - loggedInUser: " + loggedInUser);
    console.log("isLoggedIn - currUser: " + currUser);

    if (loggedInUser && currUser) {
      return true;
    } else {
      return false;
    }
  }


  // Get the user token of the user who is logged in
  getUserToken() {
    let currUserToken: string = localStorage.getItem('usertoken') || 'N/A';
    console.log('getUserToken: currUserToken' + currUserToken);

    if (this.isLoggedIn() && currUserToken && currUserToken !== 'N/A') {
      return currUserToken;
    }
    else {
      return '';
    }

  }
  

  getLoggedInUserName() {
    let currUser: string = localStorage.getItem('userName') || '';
    return currUser;
  }

  getLoggedInUserRole() {
    let currUser: string = localStorage.getItem('userRole') || '';
    return currUser;
  }


  isAdmin() {
    let adminUser: string = localStorage.getItem('userRole') || 'NA';
    console.log("adminUser: " + adminUser);

    if (this.isLoggedIn() && adminUser && adminUser == 'Administrator') {
      return true;
    } else {
      return false;
    }
  }

  isManager() {
    let managerUser: string = localStorage.getItem('userRole') || 'NA';
    console.log("managerUser: " + managerUser);

    if (this.isLoggedIn() && managerUser && managerUser == 'Manager') {
      return true;
    } else {
      return false;
    }
  }

  isDriver() {
    let driverUser: string = localStorage.getItem('userRole') || 'NA';
    console.log("driverUser: " + driverUser);

    if (this.isLoggedIn() && driverUser && driverUser == 'Driver') {
      return true;
    } else {
      return false;
    }
  }

  userLogin(userName: string, userPw: string): Observable<any> {
    let loginUrl: string = this._baseurl + '/api/ApplicationUser/Login';

    let logObj: UserLoginFormVM = {
      userName: userName,
      password: userPw
    }

    let tempLoginResponseData: any | undefined;
    let loggedInUser!: LoginResponseVM;
    let adminUsr: string = 'no';
    let currentUserLoginResponse: LoginResponseMessageVM = {
      userName: '',
      userRole: '',
      firstName: '',
      lastName: '',
      fullName: '',
      isAdminUserRole: false,
      message: '',
    };

    //Clear out the local storage first, we are only interested in the latest updated/relevant data
    localStorage.clear();

    console.log('AuthService userLogin data logObj.username:' + logObj.userName);
    localStorage.setItem('AuthService', logObj.userName);


    return this.http.post(loginUrl, logObj).pipe(
      map(async (data) => {

        tempLoginResponseData = await data;

        console.log('this.userModel data:' + data);


        if (
          typeof tempLoginResponseData !== 'undefined' &&
          tempLoginResponseData !== null &&
          tempLoginResponseData
        ) {
          localStorage.setItem('user', JSON.stringify(tempLoginResponseData));

          const tmpResponseObj: LoginResponseVM = JSON.parse(localStorage.getItem('user') || '{}');
          loggedInUser = tmpResponseObj;

          if (
            loggedInUser.roles.find(
              (role: string) => role === 'Administrator'
            )
          ) {
            adminUsr = 'TRUE';
            currentUserLoginResponse.isAdminUserRole = true;
          } else {
            currentUserLoginResponse.isAdminUserRole = false;
          }

          currentUserLoginResponse.message = 'Success';
          currentUserLoginResponse.userName = loggedInUser.userName;
          currentUserLoginResponse.firstName = loggedInUser.firstName;
          currentUserLoginResponse.lastName = loggedInUser.lastName;
          currentUserLoginResponse.fullName = loggedInUser.firstName + ' ' + loggedInUser.lastName;

          currentUserLoginResponse.userRole =
            loggedInUser.roles
              .filter((role: string) => typeof role !== undefined)
              .shift() || '';

          localStorage.setItem('isAdminUser', adminUsr);
          localStorage.setItem('usertoken', loggedInUser.token);
          localStorage.setItem('userRole', currentUserLoginResponse.userRole);
          localStorage.setItem('userName', currentUserLoginResponse.userName);
          localStorage.setItem('firstName', currentUserLoginResponse.firstName);
          localStorage.setItem('lastName', currentUserLoginResponse.lastName);
          localStorage.setItem('fullName', currentUserLoginResponse.fullName);

          console.log('currentUserLoginResponse :');
          console.log({ currentUserLoginResponse });

          return of(currentUserLoginResponse);
        }
        else {
          localStorage.setItem('loginErrorMessage', 'Unable to login user: ' + logObj.userName);
          currentUserLoginResponse.message = 'Unable to login user: ' + logObj.userName;
          console.log('currentUserLoginResponse data:' + currentUserLoginResponse.message);

          return of(currentUserLoginResponse);
        }
      }),
      catchError((err) => {
        console.error(err);
        localStorage.setItem('loginErrorMessage', 'Error: Unable to login user: ' + logObj.userName + ' Server Error: ' + err);
        currentUserLoginResponse.message = 'Error: Unable to login user: ' + logObj.userName + ' Server Error: ' + err;
        console.log('currentUserLoginResponse data:' + currentUserLoginResponse.message);

        return of(currentUserLoginResponse);
      })
    );
  }


  userRegistration(newUserRegData: UserRegistrationFormVM): Observable<any> {
    let regUrl: string = this._baseurl + '/api/ApplicationUser/Register';
    let tempRegResponseData: any | undefined;

    console.log('AuthService userRegistration data logObj.username:' + newUserRegData.userName);

    return this.http.post(regUrl, newUserRegData).pipe(
      map(async (data) => {
        console.log('tempRegResponseData :' + data);

        tempRegResponseData = await data;
        console.log('AuthService userRegistration data this.Model:' + tempRegResponseData);

        setTimeout(() => {
          console.log("Wait for 1 second");
          alert("User created successfully!");

        }, 1000);

        return of(tempRegResponseData);

      }),
      catchError((err) => {
        console.error(err);
        tempRegResponseData = {
          'userRegistrationErrorMessage':
            'Error: Unable to Register user: ' + newUserRegData.userName + ' Server Error: ' + err
        }
        localStorage.setItem(
          'userRegistrationErrorMessage',
          'Error: Unable to Register user: ' + newUserRegData.userName + ' Server Error: ' + err
        );

        return of(tempRegResponseData);
      })
    );
  }

  logout() {
    return localStorage.clear();
  }
}
