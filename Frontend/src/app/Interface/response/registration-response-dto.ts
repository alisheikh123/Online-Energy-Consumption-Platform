export interface RegistrationResponseDto {
  isSuccessfulRegistration: boolean;
    errros: string[];
}
export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  token: string;
}
