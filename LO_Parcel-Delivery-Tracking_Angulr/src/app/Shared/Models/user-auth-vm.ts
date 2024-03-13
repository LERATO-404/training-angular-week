export interface UserLoginFormVM {
  userName: string;
  password: string;
}

export interface LoginResponseVM {
  token: string;
  expiration: string;
  firstName: string;
  lastName: string;
  userName: string;
  roles: string[];
}

export interface LoginResponseMessageVM {
  userName: string;
  userRole: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isAdminUserRole: boolean;
  message: string;
}

export interface UserRegistrationFormVM
{
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}


