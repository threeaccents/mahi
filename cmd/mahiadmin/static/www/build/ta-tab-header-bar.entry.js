import { r as registerInstance, h } from './index-d067c2a6.js';

const taTabHeaderBarCss = ".ta-tab-header-bar-component{display:flex;margin-bottom:24px;border-bottom:2px solid rgb(221, 221, 221);border-radius:2px;padding:0px}";

const TaTabHeaderBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { class: "ta-tab-header-bar-component" }, h("slot", null)));
    }
};
TaTabHeaderBar.style = taTabHeaderBarCss;

export { TaTabHeaderBar as ta_tab_header_bar };
