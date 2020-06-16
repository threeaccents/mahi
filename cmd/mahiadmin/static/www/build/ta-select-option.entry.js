import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taSelectOptionCss = ":host{display:flex;align-items:center;cursor:pointer;padding:0 25px;color:var(--dark-text-color);height:16px;font-size:14px;color:var(--dark-text-color);padding:6px 8px;margin:0 15px;cursor:pointer}:host(.selected){background:#e6f7ff;border-radius:6px}:host(:hover:not(.selected)){border-radius:6px;font-weight:500;background-color:#e7ebf3}";

const TaSelectOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.selected = false;
    }
    async select() {
        this.selected = true;
    }
    async deselect() {
        this.selected = false;
    }
    render() {
        return (h(Host, { class: {
                'selected': this.selected
            } }, this.label));
    }
};
TaSelectOption.style = taSelectOptionCss;

export { TaSelectOption as ta_select_option };
