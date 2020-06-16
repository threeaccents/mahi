import { Component, ComponentInterface, h, Host, State } from '@stencil/core';
import { UserModel } from "../../../../models/user";
import { isEmail, isFullName, me } from "../../../../util";
import UserService, { UserResponse } from "../../../../api/user";
import toastr from "../../../../libs/toastr";
import { ApiError } from "../../../../api/base";

interface FormError {
  fullName: string;
  email: string;
  oldPassword: string;
  password: string;
  serverError: string;
}

const initialFormErr: FormError = {
  fullName: '',
  email: '',
  oldPassword: '',
  password: '',
  serverError: '',
}

interface UpdatePasswordState {
  oldPassword: string;
  password: string;
  fetchingApi: boolean
}

const initialUpdatePasswordState: UpdatePasswordState = {
  oldPassword: '',
  password: '',
  fetchingApi: false,
}

@Component({
  tag: 'personal-setting-view',
  styleUrl: 'personal-setting-view.css',
  shadow: true,
})
export class PersonalSettingView implements ComponentInterface {
  initialMe = me();

  @State() me: UserModel = this.initialMe;
  @State() formErr: FormError = initialFormErr;
  @State() updatingUser: boolean = false;
  @State() updatePasswordState: UpdatePasswordState = initialUpdatePasswordState

  private onSubmit = (e: Event) => {
    e.preventDefault();

    this.validate()
      .then(this.updateUser)
      .catch(this.handleValidationErrors)
  }

  private updateUser = () => {
    this.updatingUser = true;

    const payload = {
      ...this.me,
      firstName: this.fullName.split(' ')[0],
      lastName: this.getLastName(),
    }

    UserService()
      .updateUser(this.me.id, payload)
      .then(this.onSuccess)
      .catch(this.handleError)
      .finally(() => this.updatingUser = false)
  }

  private onSuccess = (resp: UserResponse) => {
    toastr().success(`Your info was updated!`);
    localStorage.setItem('me', JSON.stringify(resp.data))
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      this.formErr.serverError = 'Oops! Something went wrong. Please refresh and try again';
      return console.log(err);
    }

    const msg = err.error
    if (msg.includes('email is taken')) {
      this.formErr = { ...this.formErr, email: 'Email is taken' }
      return;
    }

    if (msg.includes('invalid credentials')) {
      this.formErr = { ...this.formErr, oldPassword: 'password is incorrect' }
      return;
    }

    toastr().danger(msg)
  }

  private handleValidationErrors = (errs: FormError) => {
    this.formErr = errs;
  }

  private onUpdatePasswordSubmit = (e: Event) => {
    e.preventDefault()

    this.validateUpdatePassword()
      .then(this.updatePassword)
      .catch(this.handleValidationErrors)
  }

  private updatePassword = () => {
    this.updatePasswordState.fetchingApi = true;

    const { password, oldPassword } = this.updatePasswordState

    const payload = {
      userId: this.me.id,
      oldPassword,
      password,
    }

    UserService()
      .updatePassword(payload)
      .then(this.handleUpdatePasswordSuccess)
      .catch(this.handleError)
      .finally(() => this.updatePasswordState.fetchingApi = false)
  }

  private handleUpdatePasswordSuccess = () => {
    toastr().success('password was updated')
    this.updatePasswordState = initialUpdatePasswordState
  }

  private getLastName = () => {
    const fullNameArr = this.fullName.split(" ")
    fullNameArr.shift()
    return fullNameArr.join(" ")
  }

  private updatePasswordField = (key: string, value: string) => {
    this.formErr = initialFormErr
    this.updatePasswordState = { ...this.updatePasswordState, [key]: value }
  }

  private get fullName(): string {
    return `${this.me.firstName} ${this.me.lastName}`.trimRight()
  }

  private updateMe = (key: string, value: string) => {
    this.formErr = initialFormErr
    if (key === 'fullName') {
      const firstName = value.split(" ")[0]
      const nameArray = value.split(" ")
      nameArray.shift()
      const lastName = nameArray.join(" ")
      this.me = { ...this.me, firstName, lastName }
      return
    }
    this.me = { ...this.me, [key]: value }
  }

  private validate = (): Promise<void> => {
    const { me } = this;
    let errors: FormError = {} as FormError;
    if (!this.fullName || this.fullName === '') {
      errors = { ...errors, fullName: 'Full name is required' };
    }
    if (!isFullName(this.fullName)) {
      errors = { ...errors, fullName: 'Please enter your full name (first & last name).' };
    }
    if (me.email === '') {
      errors = { ...errors, email: 'Email is required' };
    }
    if (!isEmail(me.email)) {
      errors = { ...errors, email: 'Please enter a valid email address' }
    }
    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  private validateUpdatePassword = (): Promise<void> => {
    const { password, oldPassword } = this.updatePasswordState
    let errors: FormError = {} as FormError;
    if (oldPassword === '') {
      errors = { ...errors, oldPassword: 'Old password is required' };
    }
    if (password === '') {
      errors = { ...errors, password: 'Password is required' };
    }
    if (password.length < 7) {
      errors = { ...errors, password: 'Password must be at least 7 characters long' };
    }
    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  private get hasNotFilledOutPasswordFields(): boolean {
    return !this.updatePasswordState.oldPassword || !this.updatePasswordState.password;
  }

  private get hasNotChangedPersonalInfo(): boolean {
    return JSON.stringify(this.me) === JSON.stringify(this.initialMe);
  }

  render() {
    return (
      <Host>
        <ta-card>
          <ta-form-label>Personal Info</ta-form-label>
          <form onSubmit={this.onSubmit}>
            <ta-input
              onTaInput={(e: CustomEvent) => this.updateMe('fullName', e.detail)}
              value={this.fullName}
              error={this.formErr.fullName}
              label={"Full Name"} />
            <ta-input
              onTaInput={(e: CustomEvent) => this.updateMe('email', e.detail)}
              value={this.me.email}
              error={this.formErr.email}
              label={"Email"} />
            <ta-button
              disabled={this.hasNotChangedPersonalInfo}
              onTaClick={this.onSubmit}
              type={"submit"}
              loading={this.updatingUser}>Update
            </ta-button>
          </form>
          <hr />
          <ta-form-label>Update Password</ta-form-label>
          <form>
            <ta-input
              onTaInput={(e: CustomEvent) => this.updatePasswordField('oldPassword', e.detail)}
              value={this.updatePasswordState.oldPassword}
              label={"Current Password"}
              error={this.formErr.oldPassword}
              type={"password"} />
            <ta-input
              error={this.formErr.password}
              value={this.updatePasswordState.password}
              type={"password"}
              onTaInput={(e: CustomEvent) => this.updatePasswordField('password', e.detail)}
              label={"Update Password"} />
            <ta-button
              disabled={this.hasNotFilledOutPasswordFields}
              onTaClick={this.onUpdatePasswordSubmit}
              loading={this.updatePasswordState.fetchingApi}
              class={"update-password-btn"}>Update Password
            </ta-button>
          </form>
        </ta-card>
      </Host>
    );
  }


}
