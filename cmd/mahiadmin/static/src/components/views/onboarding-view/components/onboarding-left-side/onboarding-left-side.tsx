import {Component, h, Prop} from '@stencil/core';


@Component({
  tag: 'onboarding-left-side',
  styleUrl: 'onboarding-left-side.css',
  shadow: true
})
export class OnboardingLeftSide {
  @Prop() mainTitle!: string; // can't name this title
  @Prop() subTitle!: string;
  @Prop() lastStep: boolean = false;

  showAction() {
    if (!this.lastStep) {
      return (
        <stencil-route-link url='/dashboard'>
          <div class="skip-onboarding">
            <span>Skip Onboarding</span>
            <ta-icon icon="long-arrow-right"/>
          </div>
        </stencil-route-link>
      )
    }
    return (
      <stencil-route-link url='/dashboard'>
        <div class="get-started">
          <ta-button>Get Started</ta-button>
        </div>
      </stencil-route-link>
    )
  }

  render() {
    return (
      <div class="left-side-onboarding">
        <div class="left-side-onboarding-section-top">
          <img class='logo' src='../../assets/logo.svg' alt=''/>
          <div class="onboarding-text">
            <div class="onboarding-left-title">{this.mainTitle}</div>
            <p class="onboarding-left-sub-title">{this.subTitle}</p>
            {this.showAction()}
          </div>
        </div>
        <div class="copy-right-text">
          Copyright © 2020 Oriio. All rights reserved.
        </div>
      </div>
    );
  }
}
