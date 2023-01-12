export interface UserForRegistrationDto {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface UserForAuthenticationDto {
  email: string;
  password: string;
}
