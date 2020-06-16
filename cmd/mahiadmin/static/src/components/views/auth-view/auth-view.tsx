import {Component, h, Prop} from '@stencil/core';
import {RouterHistory} from '@stencil/router';

@Component({
  tag: 'auth-view',
  styleUrl: 'auth-view.css',
  shadow: true
})
export class AuthView {
  @Prop() history: RouterHistory;

  render() {
    return (
      <div class='auth-view'>
        <div class='auth-form-wrapper'>
          <div class='auth-form'>
            <img class='logo' src='../../assets/logo.svg' alt=''/>

            <ta-tabs>
              <ta-tab-header-bar>
                <ta-tab-header tab="login">Login</ta-tab-header>
                <ta-tab-header tab="register">Sign Up</ta-tab-header>
              </ta-tab-header-bar>

              <ta-tab-body tab="login">
                <login-tab history={this.history}/>
              </ta-tab-body>
              <ta-tab-body tab="register">
                <register-tab history={this.history}/>
              </ta-tab-body>
            </ta-tabs>
          </div>
        </div>
        <div class='auth-image-wrapper'>
          <img class='wave-overlap' src='../../assets/right-wave-overlap.svg' alt=''/>
        </div>

        <div class="copyright-text">
          <p>Copyright © {new Date().getFullYear()} Oriio. All rights reserved.</p>
        </div>
      </div>
    );
  }
}
