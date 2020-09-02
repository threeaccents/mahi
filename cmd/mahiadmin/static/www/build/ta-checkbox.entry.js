import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';

const taCheckboxCss = ":host{display:block;margin-bottom:var(--ta-checkbox-margin-bottom, 16px)}input[type=\"checkbox\"]{opacity:0;outline:none}label{position:relative;display:inline-block;color:var(--primary-text-color);font-size:14px;padding-left:8px;outline:none}label::before,label::after{position:absolute;content:\"\";display:inline-block;outline:none}label::before{height:16px;width:16px;border:1px solid #e2e6ef;left:-16px;border-radius:6px;outline:none;top:-1px}label::after{height:3px;width:8px;border-left:2px solid #526981;border-bottom:2px solid #526981;transform:rotate(-45deg);left:-12px;top:5px;outline:none}input[type=\"checkbox\"]+label::after{content:none;outline:none}input[type=\"checkbox\"]:checked+label::after{content:\"\";outline:none}";

const TaCheckbox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.initialChecked = false;
        this.handleOnChange = (e) => {
            e.preventDefault();
            this.taChange.emit(e.target.checked);
        };
        this.taChange = createEvent(this, "taChange", 7);
    }
    render() {
        return (h(Host, { class: "checkbox" }, h("input", { type: "checkbox", id: "checkbox", checked: this.initialChecked, onChange: this.handleOnChange }), h("label", { htmlFor: "checkbox" }, this.label)));
    }
};
TaCheckbox.style = taCheckboxCss;

export { TaCheckbox as ta_checkbox };
