import { r as registerInstance, h } from './index-d067c2a6.js';

const taTabBodyCss = ".ta-tab-body-component{display:none}.ta-tab-body-component.active{display:block}";

const TaTabBody = class {
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
                'ta-tab-body-component': true,
                'active': this.isActive
            } }, h("slot", null)));
    }
};
TaTabBody.style = taTabBodyCss;

export { TaTabBody as ta_tab_body };
