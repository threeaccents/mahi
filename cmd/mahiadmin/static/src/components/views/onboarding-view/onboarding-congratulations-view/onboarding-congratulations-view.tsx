import {Component, h, Prop} from '@stencil/core';
import {UserModel} from '../../../../models/user';
import {me} from '../../../../util';
import {RouterHistory} from '@stencil/router';

@Component({
  tag: 'onboarding-congratulations-view',
  styleUrl: 'onboarding-congratulations-view.css',
  shadow: true
})
export class OnboardingCongratulationsView {
  @Prop() history: RouterHistory;

  me: UserModel = me();

  render() {
    return (
      <onboarding-container>
        <onboarding-left-side
          lastStep
          mainTitle={`Congratulations ${this.me.firstName}!`}
          subTitle="You are all setup to start using Oriio!!!"/>
        <onboarding-right-side>
        </onboarding-right-side>
      </onboarding-container>
    );
  }
}
