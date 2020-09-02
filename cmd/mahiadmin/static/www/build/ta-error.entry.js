import { r as registerInstance, h } from './index-d067c2a6.js';

const taErrorCss = ".ta-error{border-radius:6px;background-color:var(--ta-error-bg-color, #fedfdf);font-size:14px;font-weight:500;width:100%;color:var(--ta-error-color, #fe6e71);padding:0;border:var(--ta-error-border, none);display:flex;align-items:center;justify-content:center;margin-bottom:var(--ta-error-margin-bottom, 0px)}.ta-error span{padding:var(--ta-error-padding, 4px)}";

const TaDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.error = '';
    }
    render() {
        return (!!this.error ?
            h("div", { class: "ta-error" }, h("span", null, this.error)) :
            null);
    }
};
TaDropdown.style = taErrorCss;

export { TaDropdown as ta_error };