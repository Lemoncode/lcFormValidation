export class SignupEntity {
  login: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.login = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
