import {Component, h, Prop, State} from '@stencil/core';
import {RouterHistory} from '@stencil/router';
import {ApiError} from '../../../../../api/base';
import AuthService, {AuthenticateRequest} from '../../../../../api/auth';
import toastr from '../../../../../libs/toastr'
import {UserModel} from '../../../../../models/user';

interface LoginUserModel {
  email: string;
  password: string;
}

const initialLoginUserModel: LoginUserModel = {
  email: '',
  password: '',
}

interface InputError {
  emailError: string;
  passwordError: string;
}

const initialInputError = { emailError: '', passwordError: '' }

@Component({
  tag: 'login-tab',
  styleUrl: 'login-tab.css',
  shadow: true
})
export class TaLoginTab {
  @State() fetchingApi: boolean = false;
  @State() newLoginUser: LoginUserModel = initialLoginUserModel;
  @State() inputError: InputError = initialInputError;

  @Prop() history: RouterHistory;

  private onSubmit = (e: Event) => {
    e.preventDefault();

    this.validateLogin()
      .then(this.logInUser)
      .catch(this.handleValidationErrors)
  }

  private handleValidationErrors = (errs: InputError) => {
    this.inputError = errs;
  }

  private logInUser = () => {
    this.fetchingApi = true

    const payload: AuthenticateRequest = {
      email: this.newLoginUser.email,
      password: this.newLoginUser.password,
    }

    AuthService()
      .authenticate(payload)
      .then(this.onAuthenticateSuccess)
      .catch(this.handleError)
      .finally(this.handleFinally)
  }

  private onAuthenticateSuccess = (user: UserModel) => {
    toastr().success('Succesfully logged in!');
    if (user.isAdmin) {
      return this.history.push('/dashboard')
    }
    this.history.push('/applications')
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      toastr().danger('Oops! Something went wrong. Please refresh and try again');
      return console.log(err);
    }
    toastr().danger(err.error);
  }

  private handleFinally = () => {
    this.fetchingApi = false
  }

  private handleInputChange = (label: string, e: CustomEvent) => {
    this.inputError = initialInputError;
    this.newLoginUser = { ...this.newLoginUser, [label]: e.detail }
  }

  private validateLogin = (): Promise<void> => {
    let errors: InputError = {} as InputError;
    if (this.newLoginUser.email === '') {
      errors = { ...errors, emailError: 'Email is required' }
    }
    if (this.newLoginUser.password == '') {
      errors = { ...errors, passwordError: 'Password is required' }
    }
    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  render() {
    return (
      <div class='login-tab'>
        <ta-form onTaSubmit={(e: CustomEvent) => this.onSubmit((e as any))}>
          <ta-input
            label='Email Address'
            type='text'
            value={this.newLoginUser.email}
            error={this.inputError.emailError}
            onTaInput={(event) => this.handleInputChange('email', event)} />
          <ta-input
            class="last"
            label='Enter Your Password'
            type='password'
            value={this.newLoginUser.password}
            error={this.inputError.passwordError}
            onTaInput={(event) => this.handleInputChange('password', event)}/>
          <div class='forgot-password-text'>
            <stencil-route-link url={"/forgot-password"}>
              <p>Forgot Password?</p>
            </stencil-route-link>
          </div>
          <ta-button
            loading={this.fetchingApi}
            onTaClick={this.onSubmit}>
            Log In
          </ta-button>
        </ta-form>
      </div>
    )
  }
}
