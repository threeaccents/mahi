import { Component, ComponentInterface, h, Host, State } from '@stencil/core';
import { SpaceModel } from "../../../../models/space";
import { isEmail, me } from "../../../../util";
import { ApiError } from "../../../../api/base";
import toastr from "../../../../libs/toastr";
import SpaceService, { SpaceResponse } from "../../../../api/space";

interface FormError {
  email: string;
  serverError: string;
}

const initialFormErr: FormError = {
  email: '',
  serverError: '',
}

@Component({
  tag: 'space-setting-view',
  styleUrl: 'space-setting-view.css',
  shadow: true,
})
export class SpaceSettingView implements ComponentInterface {
  initialSpace = me().space;

  @State() space: SpaceModel = this.initialSpace;
  @State() updatingSpace: boolean = false;
  @State() formErr: FormError = initialFormErr;

  private onSubmit = (e: CustomEvent) => {
    e.preventDefault();

    this.validate()
      .then(this.updateSpace)
      .catch((err) => this.formErr = err)
      .finally(() => this.updatingSpace = false)
  }

  private updateSpace = () => {
    this.updatingSpace = true

    return SpaceService()
      .update(this.space.email)
      .then(this.handleSuccess)
      .catch(this.handleError)
  }

  private handleSuccess = (resp: SpaceResponse) => {
    const authUser = me();
    authUser.space = resp.data
    localStorage.setItem('me', JSON.stringify(authUser))
    toastr().success('space was updated')
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

    toastr().danger(msg)
  }

  private validate = (): Promise<void> => {
    const { space } = this;

    let errors: FormError = {} as FormError;

    if (space.email === '') {
      errors = { ...errors, email: 'Email is required' };
    }
    if (!isEmail(space.email)) {
      errors = { ...errors, email: 'Please enter a valid email address' }
    }

    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  private handleUpdateSpace = (key: string, value: string) => {
    this.formErr = initialFormErr
    this.space = { ...this.space, [key]: value }
  }

  private get hasNotUpdatedSpace(): boolean {
    return JSON.stringify(this.initialSpace) === JSON.stringify(this.space)
  }

  render() {
    return (
      <Host>
        <ta-card>
          <ta-form-label>Space</ta-form-label>
          <form>
            <ta-input
              type={"email"}
              label={"Email"}
              value={this.space.email}
              onTaInput={(e: CustomEvent) => this.handleUpdateSpace('email', e.detail)} />
            <ta-button
              disabled={this.hasNotUpdatedSpace}
              loading={this.updatingSpace}
              onTaClick={this.onSubmit}>Update
            </ta-button>
          </form>
        </ta-card>
      </Host>
    );
  }

}
