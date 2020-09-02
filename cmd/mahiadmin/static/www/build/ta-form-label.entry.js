import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taFormLabelCss = ":host{--ta-form-label-margin-bottom:20px;display:block;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#63778d;margin-bottom:var(--ta-form-label-margin-bottom)}";

const TaFormLabel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
};
TaFormLabel.style = taFormLabelCss;

export { TaFormLabel as ta_form_label };
