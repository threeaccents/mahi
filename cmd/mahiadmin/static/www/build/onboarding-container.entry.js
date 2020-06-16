import { r as registerInstance, h } from './index-d067c2a6.js';

const onboardingContainerCss = ".onboarding-step-view{display:flex;height:100vh;flex-direction:row;overflow-y:hidden}@media only screen and (max-width: 768px){.onboarding-step-view{display:flex;height:100vh;flex-direction:column;overflow-x:hidden;overflow-y:auto}}";

const OnboardingContainer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { class: "onboarding-step-view" }, h("slot", null)));
    }
};
OnboardingContainer.style = onboardingContainerCss;

export { OnboardingContainer as onboarding_container };
