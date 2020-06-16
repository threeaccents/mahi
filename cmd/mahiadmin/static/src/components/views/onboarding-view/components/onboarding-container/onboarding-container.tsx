import {Component, h} from '@stencil/core';

@Component({
  tag: 'onboarding-container',
  styleUrl: 'onboarding-container.css',
  shadow: true
})
export class OnboardingContainer {
  render() {
    return (
      <div class="onboarding-step-view">
        <slot/>
      </div>
    );
  }
}
