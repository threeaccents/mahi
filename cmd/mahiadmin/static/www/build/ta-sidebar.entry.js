import { r as registerInstance, h, g as getElement } from './index-d067c2a6.js';
import './active-router-6e666068.js';
import { i as injectHistory } from './index-2f23714f.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { A as AuthService } from './index-2cb0454e.js';
import './validation-9a44dfe6.js';
import { m as me } from './auth-d1cdc736.js';
import './index-fb199afa.js';

const taSidebarCss = ".ta-sidebar-container{width:283px;box-shadow:0 4px 18px 0 rgba(0, 0, 0, 0.09);background-color:#ffffff;position:fixed;top:0;left:0;bottom:0;overflow-y:auto}.ta-sidebar-wrapper{padding:35px 44px;display:flex;flex-direction:column;justify-content:space-between;height:calc(100% - 70px)}.logo{display:flex;justify-content:center}.add-btn{margin-top:25px}.links{margin-top:50px}ta-sidebar-item.first{--ta-sidebar-item-margin-top:0}.usage-title{font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:var(--primary-text-color);text-transform:uppercase}.usage-stat{text-align:center}.usage-amount{font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#a6b7c7}.add-btn-label{display:flex;flex-direction:row;justify-content:center;align-items:center;font-size:14px;font-weight:500;padding-right:12px}.add-icon{position:absolute;display:flex;justify-content:center;align-items:center;width:26px;height:26px;padding-top:2px;border-radius:6px;right:6px}.add-icon.active{background-color:rgba(255, 255, 255, 0.2)}ta-icon{--ta-icon-fill:#ffffff}.menu-content-wrapper{display:flex;flex-direction:column}.menu-item{font-size:14px;font-weight:500;color:var(--primary-text-color);display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-radius:6px;padding:6px 0;padding-left:8px;padding-right:4px;cursor:pointer}.menu-item:hover{background-color:#e7ebf3}.menu-item ta-icon{--ta-icon-fill:var(--primary-text-color);opacity:0.35;padding-top:2px}ta-dropdown{--ta-dropdown-padding:28px 20px}";

const TaSidebar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.me = me();
        this.amountDue = parseFloat(localStorage.getItem('amountDue')) || 0;
        this.isMenuShown = false;
        this.handleOverlayRendered = (e) => {
            this.isMenuShown = e.detail;
        };
        this.logout = () => {
            AuthService()
                .logout();
        };
    }
    get adminMenu() {
        const createNewMenu = (h("div", { class: "menu-content-wrapper" }, h("span", { class: "menu-item", onClick: () => this.history.push('#createApplication') }, "New Application", h("ta-icon", { icon: "add" })), h("span", { class: "menu-item", onClick: () => this.history.push('#createUser') }, "New User", h("ta-icon", { icon: "add" }))));
        return (h("span", null, h("div", { class: "add-btn" }, h("ta-dropdown", { overlay: createNewMenu, onTaOverlayRendered: this.handleOverlayRendered }, h("ta-button", null, h("div", { class: "add-btn-label" }, "Create New", h("div", { class: {
                'add-icon': true,
                'active': this.isMenuShown,
            } }, h("ta-icon", { icon: "add" })))))), h("div", { class: "links" }, h("ta-sidebar-item", { class: "first", icon: "home", to: "/dashboard" }, "Dashboard"), h("ta-sidebar-item", { icon: "applications", to: "/applications" }, "My Applications"), h("ta-sidebar-item", { icon: "users", to: "/users" }, "Users"), h("ta-sidebar-item", { icon: "settings", to: "/settings" }, "Settings"))));
    }
    get userMenu() {
        return (h("span", null, h("div", { class: "links" }, h("ta-sidebar-item", { icon: "applications", to: "/applications" }, "My Applications"), h("ta-sidebar-item", { icon: "settings", to: "/settings" }, "Settings"))));
    }
    render() {
        return (h("div", { class: "ta-sidebar-container" }, h("div", { class: "ta-sidebar-wrapper" }, h("div", { class: "sidebar-top" }, h("div", { class: "logo" }, h("ta-icon", { icon: 'logo' })), this.me.isAdmin ? this.adminMenu : this.userMenu), h("div", { class: "sidebar-bottom" }, this.me.isAdmin ?
            h("div", { class: "usage-stat" }, h("div", { class: "usage-amount" }, h("span", { class: "usage-title" }, "Usage:"), " $", this.amountDue.toFixed(2)))
            : null, h("ta-button", { color: "grey", onTaClick: this.logout }, "Logout")))));
    }
    get $el() { return getElement(this); }
};
injectHistory(TaSidebar);
TaSidebar.style = taSidebarCss;

export { TaSidebar as ta_sidebar };
