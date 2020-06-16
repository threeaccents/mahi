import { Component, ComponentInterface, Event, h, Host, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { initialNewUserModel, UserModel } from '../../../models/user';
import { ApiError } from '../../../api/base';
import toastr from '../../../libs/toastr';
import UserService, { CreateUserRequest, UserResponse } from '../../../api/user';
import { isEmail, isFullName } from '../../../util';
import { EventEmitter } from '@stencil/router/dist/types/stencil.core';

interface FormError {
  fullName: string;
  password: string;
  email: string;
  error: string;
}

const initialFormErr: FormError = {
  fullName: '',
  password: '',
  email: '',
  error: '',
}

@Component({
  tag: 'create-user-view',
  styleUrl: 'create-user-view.css',
  shadow: true,
})
export class CreateUserView implements ComponentInterface {
  @State() newUser: UserModel = initialNewUserModel;
  @State() formErr: FormError = initialFormErr;
  @State() creatingUser: boolean = false;
  @State() fullName: string = '';

  @Prop() history: RouterHistory;

  @Event() taUserWasCreated: EventEmitter;

  private onSubmit = (e: UIEvent) => {
    e.preventDefault();

    this.validate()
      .then(this.createUser)
      .catch(this.handleValidationErrors)
  }

  private handleValidationErrors = (errs: FormError) => {
    this.formErr = errs;
  }

  private createUser = () => {
    this.creatingUser = true;

    const payload: CreateUserRequest = this.getPayload();

    UserService()
      .createUser(payload)
      .then(this.onSuccess)
      .catch(this.handleError)
      .finally(() => this.creatingUser = false)
  }

  private getLastName = () => {
    const fullNameArr = this.fullName.split(" ")
    fullNameArr.shift()
    return fullNameArr.join(" ")
  }

  private getPayload = (): CreateUserRequest => {
    return {
      ...this.newUser,
      firstName: this.fullName.split(' ')[0],
      lastName: this.getLastName(),
    }
  }

  private onSuccess = (resp: UserResponse) => {
    toastr().success(`${resp.data.firstName} ${resp.data.lastName} was created!`);
    this.resetForm();
    this.taUserWasCreated.emit(resp.data)
    this.history.push(`/users`)
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      this.formErr.error = 'Oops! Something went wrong. Please refresh and try again';
      return console.log(err);
    }

    const msg = err.error
    if (msg.includes('email is taken')) {
      this.formErr = { ...this.formErr, email: 'Email is taken' }
      return;
    }

    toastr().danger(msg)
  }

  private validate = (): Promise<void> => {
    const { newUser } = this;
    let errors: FormError = {} as FormError;
    if (this.fullName === '') {
      errors = { ...errors, fullName: 'Full name is required' };
    }
    if (!!this.fullName && !isFullName(this.fullName)) {
      errors = { ...errors, fullName: 'Please enter a valid full name' };
    }
    if (newUser.email === '') {
      errors = { ...errors, email: 'Email is required' };
    }
    if (!!newUser.email && !isEmail(newUser.email)) {
      errors = { ...errors, email: 'Please enter a valid email address' }
    }
    if (newUser.password === '') {
      errors = { ...errors, password: 'Password is required' };
    }
    if (!!newUser.password && newUser.password.length < 7) {
      errors = { ...errors, password: 'Password must be at least 7 characters long' };
    }
    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  private updateNewUser = (key: string, value: string | boolean) => {
    this.formErr = initialFormErr;
    this.newUser = { ...this.newUser, [key]: value }
  }

  private updateFullName = (value: string) => {
    this.formErr = initialFormErr;
    this.fullName = value;
  }

  private resetForm = () => {
    this.newUser = initialNewUserModel;
    this.formErr = initialFormErr
  }

  private handleClose = () => {
    const pathname = this.history.location.pathname
    this.resetForm();
    this.history.push(pathname)
  }

  render() {
    const { newUser, formErr } = this;
    return (
      <Host>
        <div class="header">
          <div class="close-icon" onClick={this.handleClose}>
            <ta-icon icon="close" />
          </div>
        </div>
        <ta-form onTaSubmit={(e: CustomEvent) => this.onSubmit((e as any))}>
          <label>Create User</label>
          <ta-input
            value={this.fullName}
            label="Full Name"
            onTaInput={(e: CustomEvent) => this.updateFullName(e.detail)}
            error={formErr.fullName}
          />
          <ta-input
            value={newUser.email}
            label="Email"
            onTaInput={(e: CustomEvent) => this.updateNewUser('email', e.detail)}
            error={formErr.email}
          />
          <ta-input
            type="password"
            value={newUser.password}
            label="Password"
            onTaInput={(e: CustomEvent) => this.updateNewUser('password', e.detail)}
            error={formErr.password}
          />
          <ta-switch-button
            initialChecked={newUser.isAdmin}
            label="Administrator"
            onTaChange={(e: CustomEvent) => this.updateNewUser('isAdmin', e.detail)}
          />
          <ta-error error={formErr.error} />
          <ta-button
            type='submit'
            loading={this.creatingUser}
            onTaClick={(e: CustomEvent) => this.onSubmit((e as any))}>
            Create User
          </ta-button>
          <ta-button
            color="white"
            onTaClick={this.handleClose}>
            Cancel
          </ta-button>
        </ta-form>
      </Host>
    );
  }

}
