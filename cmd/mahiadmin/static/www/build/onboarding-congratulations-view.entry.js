import { r as registerInstance, h } from './index-d067c2a6.js';
import './validation-9a44dfe6.js';
import { m as me } from './auth-d1cdc736.js';
import './index-fb199afa.js';

const onboardingCongratulationsViewCss = "onboarding-congratulations-view{}";

const OnboardingCongratulationsView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.me = me();
    }
    render() {
        return (h("onboarding-container", null, h("onboarding-left-side", { lastStep: true, mainTitle: `Congratulations ${this.me.firstName}!`, subTitle: "You are all setup to start using Oriio!!!" }), h("onboarding-right-side", null)));
    }
};
OnboardingCongratulationsView.style = onboardingCongratulationsViewCss;

export { OnboardingCongratulationsView as onboarding_congratulations_view };
