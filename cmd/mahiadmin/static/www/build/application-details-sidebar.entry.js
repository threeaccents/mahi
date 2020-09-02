import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const applicationDetailsSidebarCss = ":host{display:block;border-left:solid 3px #e5e5e5}.header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:solid 2px #c3cbd3;padding-bottom:12px}.title{font-size:14px;font-weight:500;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#425a70}.metrics{margin-top:43px}.metric-item{margin-top:12px}.metric-item:first-child{margin-top:0}.label{font-size:12px;font-weight:900;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#425a70}.value{margin-top:4px;font-size:12px;font-weight:100;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#6886a2}";

const ApplicationDetailsSidebar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("ta-app-page", null, h("div", { class: "header" }, h("div", { class: "title" }, "Details"), h("ta-icon", { icon: "settings" })))));
    }
};
ApplicationDetailsSidebar.style = applicationDetailsSidebarCss;

export { ApplicationDetailsSidebar as application_details_sidebar };
