import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const onboardingRightSideCss = ":host{background:url('../../static/onboarding-right.svg');background-position:center center;background-repeat:no-repeat;background-size:cover;position:relative;width:100%;height:100%}:host:before{background:url('../../static/cloud.svg');content:'';position:absolute;top:60px;left:-25px;z-index:99;width:186px;height:42px}:host:after{background:url('../../static/leaf.svg');content:'';position:absolute;bottom:0;left:-25px;z-index:99;width:217px;height:137px}.right-side-onboarding-content{display:flex;justify-content:center;height:100vh;padding-top:calc(4em + 72px + 43px)}.content-wrapper{width:530px;max-width:calc(100vw - 2.5rem)}.wave-overlap{height:100%;position:absolute;left:0;top:0;z-index:90}.content-title{font-size:24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;color:#526981;margin-bottom:24px}.content-description{font-size:16px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:#526981;margin-bottom:24px}.content{}@media only screen and (max-width: 768px){.right-side-onboarding-content{display:flex;justify-content:center;height:100%;padding-top:calc(4em + 72px + 43px)}.wave-overlap{display:none;height:100%;position:absolute;left:0;top:0;z-index:90}.right-side-onboarding-content{padding-top:148px}:host:after{display:none;background:url('../../static/leaf.svg');content:'';position:absolute;bottom:0;left:-25px;z-index:99;width:217px;height:137px}}";

const OnboardingRightSide = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { class: "right-side-onboarding" }, h("img", { class: 'wave-overlap', src: '../../static/right-wave-overlap.svg', alt: '' }), h("div", { class: "right-side-onboarding-content" }, h("div", { class: "content-wrapper" }, h("div", { class: "content-title" }, this.mainTitle), h("p", { class: "content-description" }, this.description), h("div", { class: "content" }, h("slot", null))))));
    }
};
OnboardingRightSide.style = onboardingRightSideCss;

export { OnboardingRightSide as onboarding_right_side };
