import {Component, ComponentInterface, h, Host, State} from '@stencil/core';
import {isEmail} from "../../../util";
import AuthService from "../../../api/auth";
import toastr from "../../../libs/toastr";

@Component({
  tag: 'forgot-password-view',
  styleUrl: 'forgot-password.css',
  shadow: true,
})
export class ForgotPassword implements ComponentInterface {
  @State() email: string = '';
  @State() fetchingApi: boolean = false;

  private onSubmit = (e: CustomEvent) => {
    e.preventDefault()

    this.fetchingApi = true

    AuthService()
      .passwordResetRequest(this.email)
      .then(() => {
        this.email = ''
        toastr().success('Password reset successfully requested! Please check your email.')
      })
      .catch(() => {
        toastr().danger('Oops it seems something went wrong. Please try again later.')
      })
      .finally(() => this.fetchingApi = false)
  }

  get canSubmit(): boolean {
    return this.email
      && this.email != ''
      && isEmail(this.email)
  }

  render() {
    return (
      <Host>
        <div class='auth-view'>
          <div class='auth-form-wrapper'>
            <div class='auth-form'>
              <img class='logo' src='../../assets/logo.svg' alt=''/>

              <ta-form onTaSubmit={this.onSubmit}>
                <ta-input
                  label='Email Address'
                  type='text'
                  value={this.email}
                  onTaInput={(e: CustomEvent) => this.email = e.detail}/>
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
