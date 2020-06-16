import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taPageHeaderCss = ":host{display:flex;justify-content:space-between;align-items:center;margin-bottom:35px;flex-wrap:wrap}.page-header-title{font-size:24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;color:var(--primary-text-color)}";

const TaPageHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("div", { class: "left-side" }, h("div", { class: "page-header-title" }, this.pageTitle)), h("div", { class: "right-side" }, h("slot", { name: "right" }))));
    }
};
TaPageHeader.style = taPageHeaderCss;

export { TaPageHeader as ta_page_header };
