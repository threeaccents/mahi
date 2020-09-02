import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';

const taSwitchButtonCss = ":host{display:block;margin-bottom:var(--ta-switch-button-margin-bottom, 16px)}.switch-button-wrapper{display:flex;flex-direction:column}.label{color:var(--primary-text-color);font-size:14px;margin-bottom:8px}.slider{position:absolute;right:2px;cursor:pointer;background-color:var(--primary-color);box-shadow:0 0 1px var(--primary-color);-webkit-transition:.4s;transition:.4s;border-radius:34px;display:flex;width:124px;-ms-flex-pack:center;justify-content:center;height:30px;cursor:pointer;align-items:center;border-radius:4px}.slider.active{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);transform:translateX(-100%)}.switch-button{padding:1px;position:relative;background:#fff;border:1px solid #e3e5eb;border-radius:4px;height:32px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:250px;max-width:250px}.switch-side{display:flex;width:124px;-ms-flex-pack:center;justify-content:center;height:30px;cursor:pointer;align-items:center}.switch-side.active{z-index:9;color:#fff;border-radius:4px}";

const TaSwitchButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.initialChecked = false;
        this.noLabel = 'No';
        this.yesLabel = 'Yes';
        this.handleOnChange = (checked) => {
            this.taChange.emit(checked);
        };
        this.taChange = createEvent(this, "taChange", 7);
    }
    render() {
        return (h(Host, null, h("div", { class: "switch-button-wrapper" }, h("span", { class: "label" }, this.label), h("div", { class: "switch-button" }, h("div", { class: {
                'slider': true,
                'active': this.initialChecked,
            } }), h("div", { onClick: () => this.handleOnChange(true), class: {
                'switch-side': true,
                'active': this.initialChecked
            } }, this.yesLabel), h("div", { onClick: () => this.handleOnChange(false), class: {
                'switch-side': true,
                'active': !this.initialChecked
            } }, this.noLabel)))));
    }
};
TaSwitchButton.style = taSwitchButtonCss;

export { TaSwitchButton as ta_switch_button };
