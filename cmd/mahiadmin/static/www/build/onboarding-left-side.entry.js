import { r as registerInstance, h } from './index-d067c2a6.js';

const onboardingLeftSideCss = ".left-side-onboarding{position:relative;padding-top:4em;padding-bottom:70px;flex:0 0 450px;padding-left:50px;box-sizing:border-box;min-width:400px;background:white;height:100%;display:flex;flex-direction:column;justify-content:space-between}.onboarding-left-title{font-size:24px;letter-spacing:-0.09px;color:#526981;font-weight:bold;margin-top:72px}.onboarding-left-sub-title{font-size:24px;font-weight:normal;letter-spacing:-0.09px;color:#526981;margin-top:35px}.skip-onboarding{font-size:14px;font-weight:500;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#fe6e71;margin-top:42px;display:flex;flex-direction:row}.copy-right-text{font-size:14px;font-weight:500;color:#425a70}.skip-onboarding span{margin-right:18px}.skip-onboarding ta-icon{cursor:pointer}.get-started{margin-top:42px}a{text-decoration:none}@media only screen and (max-width: 768px){.left-side-onboarding{min-width:unset;align-items:center;padding-left:0;background:#f1f1f1;padding-bottom:0px;padding-top:2em}.left-side-onboarding-section-top{width:530px;max-width:calc(100vw - 2.5rem)}.copy-right-text{display:none}}";

const OnboardingLeftSide = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.lastStep = false;
    }
    showAction() {
        if (!this.lastStep) {
            return (h("stencil-route-link", { url: '/dashboard' }, h("div", { class: "skip-onboarding" }, h("span", null, "Skip Onboarding"), h("ta-icon", { icon: "long-arrow-right" }))));
        }
        return (h("stencil-route-link", { url: '/dashboard' }, h("div", { class: "get-started" }, h("ta-button", null, "Get Started"))));
    }
    render() {
        return (h("div", { class: "left-side-onboarding" }, h("div", { class: "left-side-onboarding-section-top" }, h("img", { class: 'logo', src: '../../static/logo.svg', alt: '' }), h("div", { class: "onboarding-text" }, h("div", { class: "onboarding-left-title" }, this.mainTitle), h("p", { class: "onboarding-left-sub-title" }, this.subTitle), this.showAction())), h("div", { class: "copy-right-text" }, "Copyright \u00A9 2020 Oriio. All rights reserved.")));
    }
};
OnboardingLeftSide.style = onboardingLeftSideCss;

export { OnboardingLeftSide as onboarding_left_side };
