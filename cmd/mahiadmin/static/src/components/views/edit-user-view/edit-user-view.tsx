import { Component, ComponentInterface, Event, h, Host, Prop, State, EventEmitter } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { UserModel } from '../../../models/user';
import { ApiError } from '../../../api/base';
import toastr from '../../../libs/toastr';
import UserService, { CreateUserRequest, UpdateUserRequest, UserResponse } from '../../../api/user';
import { isEmail, isFullName } from '../../../util';

interface FormError {
  fullName: string;
  email: string;
  error: string;
}

const initialFormErr: FormError = {
  fullName: '',
  email: '',
  error: '',
}

@Component({
  tag: 'edit-user-view',
  styleUrl: 'edit-user-view.css',
  shadow: true,
})
export class EditUserView implements ComponentInterface {
  @State() user: UserModel = {} as UserModel;
  @State() formErr: FormError = initialFormErr;
  @State() fetchingApi: boolean = false;
  @State() updatingUser: boolean = false;
  @State() fullName: string = '';

  @Prop() history: RouterHistory;

  @Event() taUserWasUpdated: EventEmitter;

  initialUser = {} as UserModel;

  componentWillLoad() {
    this.getUserState();
  }

  private getUserState = () => {
    const { state } = this.history.location
    if (!state || !state.user) return this.fetchUser()
    const { user } = state
    this.initialUser = user
    this.user = user
    this.fullName = `${user.firstName} ${user.lastName}`
  }

  private fetchUser = () => {
    this.fetchingApi = true

    const userId = this.history.location.query.userId

    UserService()
      .getUser(userId)
      .then(this.onFetchUserSuccess)
      .catch(this.handleError)
      .finally(() => this.fetchingApi = false)
  }

  private onFetchUserSuccess = (resp: UserResponse) => {
    const user = resp.data
    this.initialUser = user
    this.user = user
    this.fullName = `${user.firstName} ${user.lastName}`
  }

  private get hasNoFieldUpdates(): boolean {
    const request: UpdateUserRequest = this.getPayload();
    return JSON.stringify(this.initialUser) === JSON.stringify(request);
  }

  private onSubmit = (e: UIEvent) => {
    e.preventDefault();

    this.validate()
      .then(this.updateUser)
      .catch(this.handleValidationErrors)
  }

  private handleValidationErrors = (errs: FormError) => {
    this.formErr = errs;
  }

  private getLastName = () => {
    const fullNameArr = this.fullName.split(" ")
    fullNameArr.shift()
    return fullNameArr.join(" ")
  }

  private updateUser = () => {
    this.updatingUser = true;

    const payload: UpdateUserRequest = this.getPayload();

    UserService()
      .updateUser(this.user.id, payload)
      .then(this.onSuccess)
      .catch(this.handleError)
      .finally(() => this.updatingUser = false)
  }

  private getPayload = (): CreateUserRequest => {
    return {
      ...this.user,
      firstName: this.fullName.split(' ')[0],
      lastName: this.getLastName(),
    }
  }

  private onSuccess = (resp: UserResponse) => {
    toastr().success(`${resp.data.firstName} ${resp.data.lastName} was updated!`);
    this.taUserWasUpdated.emit(resp.data)
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
    const { user } = this;
    let errors: FormError = {} as FormError;
    if (!this.fullName || this.fullName === '') {
      errors = { ...errors, fullName: 'Full name is required' };
    }
    if (!isFullName(this.fullName)) {
      errors = { ...errors, fullName: 'Please enter your full name (first & last name).' };
    }
    if (user.email === '') {
      errors = { ...errors, email: 'Email is required' };
    }
    if (!isEmail(user.email)) {
      errors = { ...errors, email: 'Please enter a valid email address' }
    }
    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  private updateUserField = (key: string, value: string | boolean) => {
    this.formErr = initialFormErr;
    this.user = { ...this.user, [key]: value }
  }

  private updateFullName = (value: string) => {
    this.formErr = initialFormErr;
    this.fullName = value;
  }

  private handleClose = () => {
    const pathname = this.history.location.pathname
    this.history.push(pathname)
  }


  render() {
    const { user, formErr } = this;
    if (this.fetchingApi) return <ta-loader />
    return (
      <Host>
        <div class="header">
          <div class="close-icon" onClick={this.handleClose}>
            <ta-icon icon="close" />
          </div>
        </div>
        <ta-form onTaSubmit={(e: CustomEvent) => this.onSubmit((e as any))}>
          <label>Edit User</label>
          <ta-input
            value={this.fullName}
            label="Full Name"
            onTaInput={(e: CustomEvent) => this.updateFullName(e.detail)}
            error={formErr.fullName}
          />
          <ta-input
            value={user.email}
            label="Email"
            onTaInput={(e: CustomEvent) => this.updateUserField('email', e.detail)}
            error={formErr.email}
          />
          <ta-switch-button
            initialChecked={user.isAdmin}
            label="Administrator"
            onTaChange={(e: CustomEvent) => this.updateUserField('isAdmin', e.detail)}
          />
          <ta-error error={formErr.error} />
          <ta-button
            disabled={this.hasNoFieldUpdates}
            loading={this.updatingUser}
            onTaClick={(e: CustomEvent) => this.onSubmit((e as any))}>
            Save
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
