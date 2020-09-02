import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taSidebarItemCss = ":host{display:block;margin-top:var(--ta-sidebar-item-margin-top, 28px)}.ta-sidebar-item{font-size:16px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:#526981;display:flex;align-items:center}.icon{width:10px;margin-right:20px}a{outline:none;text-decoration:none}.link-active .ta-sidebar-item{color:var(--dark-text-color);font-weight:bold}";

const TaSidebarItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.handleClickLink = () => {
            window.document.body.removeAttribute('style');
        };
    }
    render() {
        return (h(Host, null, h("stencil-route-link", { url: this.to, exact: true, activeClass: "link-active", onClick: this.handleClickLink }, h("div", { class: "ta-sidebar-item" }, h("div", { class: "icon" }, h("ta-icon", { icon: this.icon })), h("slot", null)))));
    }
};
TaSidebarItem.style = taSidebarItemCss;

export { TaSidebarItem as ta_sidebar_item };
