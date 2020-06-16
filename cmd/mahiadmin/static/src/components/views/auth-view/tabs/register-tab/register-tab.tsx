import { Component, h, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import UserService, { CreateSuperUserRequest } from '../../../../../api/user';
import { ApiError } from '../../../../../api/base';
import AuthService, { AuthenticateRequest } from '../../../../../api/auth';
import { isEmail } from '../../../../../util/validation';
import toastr from '../../../../../libs/toastr'
import { initialNewSuperUserModel, NewSuperUserModel } from '../../../../../models/user';

interface FormError {
  spaceError: string;
  fullNameError: string;
  emailError: string;
  passwordError: string;
}

const initialFormError = { spaceError: '', fullNameError: '', emailError: '', passwordError: '' }

@Component({
  tag: 'register-tab',
  shadow: true
})
export class RegisterTab {
  @State() newSuperUser: NewSuperUserModel = initialNewSuperUserModel;
  @State() fetchingApi: boolean = false;
  @State() formError: FormError = initialFormError;

  @Prop() history: RouterHistory;

  private onSubmit = (e: Event) => {
    e.preventDefault();

    this.validateRegister()
      .then(this.registerUser)
      .catch(this.handleValidationErrors)
  }

  private handleValidationErrors = (errs: FormError) => {
    this.formError = errs;
  }

  private registerUser = () => {
    this.fetchingApi = true;

    const nameArray = this.newSuperUser.fullName.split(' ')
    const firstName = nameArray[0]
    const lastName = nameArray[1] ? nameArray[1] : ''

    const payload: CreateSuperUserRequest = {
      firstName,
      lastName,
      spaceName: this.newSuperUser.space,
      email: this.newSuperUser.email,
      password: this.newSuperUser.password,
    }

    UserService()
      .createSuperUser(payload)
      .then(this.logInUser)
      .catch(this.handleError)
      .finally(this.handleFinally)
  }

  private logInUser = () => {
    this.fetchingApi = true

    const payload: AuthenticateRequest = {
      email: this.newSuperUser.email,
      password: this.newSuperUser.password,
    }

    AuthService()
      .authenticate(payload)
      .then(this.onAuthenticateSuccess)
      .catch(this.handleError)
      .finally(this.handleFinally)
  }

  private onAuthenticateSuccess = () => {
    toastr().success('Registration successful! Welcome to Oriio!');
    this.history.push('/dashboard')
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      toastr().danger('Oops! Something went wrong. Please refresh and try again');
      return console.log(err);
    }

    const msg = err.error
    if (msg.includes('space name is taken')) {
      this.formError = { ...this.formError, spaceError: 'Space name is taken' }
      return;
    }
    if (msg.includes('email is taken')) {
      this.formError = { ...this.formError, emailError: 'Email is taken' }
      return;
    }

    toastr().danger(msg)
  }

  private handleFinally = () => {
    this.fetchingApi = false
  }

  private handleInputChange = (label: string, e: CustomEvent) => {
    this.formError = initialFormError;
    this.newSuperUser = { ...this.newSuperUser, [label]: e.detail }
  }

  private validateRegister = (): Promise<void> => {
    let errors: FormError = {} as FormError;
    if (this.newSuperUser.space === '') {
      errors = { ...errors, spaceError: 'Space is required' }
    }
    if (this.newSuperUser.fullName === '') {
      errors = { ...errors, fullNameError: 'Full name is required' }
    }
    if (this.newSuperUser.fullName.split(' ').length < 2) {
      errors = { ...errors, fullNameError: 'Please provide a first and last name' }
    }
    if (!isEmail(this.newSuperUser.email)) {
      errors = { ...errors, emailError: 'Email is invalid' }
    }
    if (this.newSuperUser.email === '') {
      errors = { ...errors, emailError: 'Email is required' }
    }
    if (this.newSuperUser.password.length < 7) {
      errors = { ...errors, passwordError: 'Password must be at least 7 characters long' }
    }
    if (this.newSuperUser.password == '') {
      errors = { ...errors, passwordError: 'Password is required' }
    }
    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  render() {
    return (
      <div class='register-tab'>
        <ta-form onTaSubmit={(e: CustomEvent) => this.onSubmit((e as any))}>
          <ta-input
            label='Space Name'
            type='text'
            value={this.newSuperUser.space}
            error={this.formError.spaceError}
            onTaInput={(event) => this.handleInputChange('space', event)} />
          <ta-input
            label='Full Name'
            type='text'
            value={this.newSuperUser.fullName}
            error={this.formError.fullNameError}
            onTaInput={(event) => this.handleInputChange('fullName', event)} />
          <ta-input
            label='Email Address'
            type='email'
            value={this.newSuperUser.email}
            error={this.formError.emailError}
            onTaInput={(event) => this.handleInputChange('email', event)} />
          <ta-input
            label='Enter Your Password'
            type='password'
            value={this.newSuperUser.password}
            onTaInput={(event) => this.handleInputChange('password', event)}
            error={this.formError.passwordError} />
          <ta-button
            loading={this.fetchingApi}
            onTaClick={this.onSubmit}>
            Register
          </ta-button>
        </ta-form>
      </div>
    )
  }
}
