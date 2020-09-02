import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taAppPageCss = ":host{display:block;min-height:100vh}.wrapper{padding:50px;min-height:calc(100vh - 100px)}@media (max-width: 768px){.wrapper{padding:20px}}";

const TaAppPage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("div", { class: "wrapper" }, h("slot", null))));
    }
};
TaAppPage.style = taAppPageCss;

export { TaAppPage as ta_app_page };
