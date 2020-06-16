import {Component, h, Host, Prop} from '@stencil/core';


@Component({
  tag: 'onboarding-right-side',
  styleUrl: 'onboarding-right-side.css',
  shadow: true
})
export class OnboardingRightSide {
  @Prop() mainTitle: string;
  @Prop() description: string;

  render() {
    return (
      <Host class="right-side-onboarding">
        <img class='wave-overlap' src='../../assets/right-wave-overlap.svg' alt=''/>
        <div class="right-side-onboarding-content">
          <div class="content-wrapper">
            <div class="content-title">{this.mainTitle}</div>
            <p class="content-description">{this.description}</p>
            <div class="content">
              <slot/>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
