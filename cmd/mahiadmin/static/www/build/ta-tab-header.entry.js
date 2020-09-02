import { r as registerInstance, h } from './index-d067c2a6.js';

const taTabHeaderCss = ".ta-tab-header-component{position:relative;background-color:transparent;font-size:14px;cursor:pointer;color:var(--primary-text-color);border-width:0px;border-style:initial;border-color:initial;border-image:initial;padding-bottom:12px;outline:none;bottom:-2px;margin-right:22px;font-weight:500}.ta-tab-header-component.active{border-bottom:2px solid var(--primary-color)}.ta-tab-header-component:hover:not(:disabled):not(.active){border-bottom:2px solid var(--light-border-color)}";

const TaTabHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isActive = false;
    }
    async activate() {
        this.isActive = true;
    }
    async deactivate() {
        this.isActive = false;
    }
    render() {
        return (h("div", { class: {
                'ta-tab-header-component': true,
                'active': this.isActive,
            } }, h("slot", null)));
    }
};
TaTabHeader.style = taTabHeaderCss;

export { TaTabHeader as ta_tab_header };
