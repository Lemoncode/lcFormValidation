export class SignupEntity {
  login: string;
  password: string;
  confirmPassword: string;

  public constructor() {
    this.login = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
