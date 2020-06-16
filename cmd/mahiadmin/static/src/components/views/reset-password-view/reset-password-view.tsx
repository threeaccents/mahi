import {Component, ComponentInterface, h, Host, Prop, State} from '@stencil/core';
import AuthService from "../../../api/auth";
import toastr from "../../../libs/toastr";
import {RouterHistory} from "@stencil/router";

@Component({
  tag: 'reset-password-view',
  styleUrl: 'reset-password-view.css',
  shadow: true,
})
export class ResetPasswordView implements ComponentInterface {
  token: string;

  @State() password: string = '';
  @State() confirmPassword: string = '';
  @State() fetchingApi: boolean = false;

  @Prop() history: RouterHistory;

  componentWillLoad(): Promise<void> | void {
    this.token = this.history.location.query.id
  }

  private onSubmit = (e: CustomEvent) => {
    e.preventDefault()

    this.fetchingApi = true

    AuthService()
      .resetPassword(this.token, this.password)
      .then(() => {
        this.password = ''
        this.confirmPassword = ''
        toastr().success('Password was reset! Redirecting you to login page...')
        this.history.push('/auth');
      })
      .catch(() => {
        toastr().danger('Oops it seems something went wrong. Please try again later.')
      })
      .finally(() => this.fetchingApi = false)
  }

  get canSubmit(): boolean {
    return this.password
      && this.password != ''
      && this.confirmPassword
      && this.confirmPassword != ''
      && this.confirmPassword === this.password
  }

  render() {
    return (
      <Host>
        <div class='auth-view'>
          <div class='auth-form-wrapper'>
            <div class='auth-form'>
              <img class='logo' src='../../assets/logo.svg' alt=''/>
              <ta-form-label>Reset Password</ta-form-label>
              <ta-form onTaSubmit={this.onSubmit}>
                <ta-input
                  label='New Password'
                  type='password'
                  value={this.password}
                  onTaInput={(e: CustomEvent) => this.password = e.detail}/>
                <ta-input
                  class={"last"}
                  label='Confirm Password'
                  type='password'
                  value={this.confirmPassword}
                  onTaInput={(e: CustomEvent) => this.confirmPassword = e.detail}/>
                <div class='forgot-password-text'>
                  <stencil-route-link url={"/auth"}>
                    <p>Back to login?</p>
                  </stencil-route-link>
                </div>
                <ta-button
                  disabled={!this.canSubmit}
                  loading={this.fetchingApi}
                  onTaClick={this.onSubmit}>
                  Submit
                </ta-button>
              </ta-form>
            </div>
          </div>
          <div class='auth-image-wrapper'>
            {/*<img class='wave-overlap' src='../../static/right-wave-overlap.svg' alt=''/>*/}
          </div>

          <div class="copyright-text">
            <p>Copyright © {new Date().getFullYear()} Oriio. All rights reserved.</p>
          </div>
        </div>
      </Host>
    );
  }

}
