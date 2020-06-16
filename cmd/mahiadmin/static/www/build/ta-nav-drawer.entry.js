import { r as registerInstance, h } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { A as AuthService } from './index-2cb0454e.js';
import { m as me } from './auth-d1cdc736.js';

const taNavDrawerCss = ".ta-nav-drawer-component{width:100vw;position:fixed;top:60px;left:0;bottom:0;overflow-y:auto;z-index:999;transform:translate3d(-102%, 0, 0);transition:all ease .5s;background-color:rgba(0, 0, 0, 0.07);box-shadow:0 4px 18px 0 rgba(0, 0, 0, 0.09);background-color:#ffffff}.ta-nav-drawer-component.open{transform:translate3d(0, 1px, 0)}.drawer-container{padding:30px;height:80%;display:flex;flex-direction:column;justify-content:space-between}";

const TaNavDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.me = me();
        this.logout = () => {
            AuthService()
                .logout();
        };
    }
    get adminMenu() {
        return (h("span", null, h("ta-sidebar-item", { class: "first", icon: "home", to: "/dashboard" }, "Dashboard"), h("ta-sidebar-item", { icon: "applications", to: "/applications" }, "My Applications"), h("ta-sidebar-item", { icon: "users", to: "/users" }, "Users"), h("ta-sidebar-item", { icon: "settings", to: "/settings" }, "Settings")));
    }
    get userMenu() {
        return (h("span", null, h("ta-sidebar-item", { icon: "applications", to: "/applications" }, "My Applications"), h("ta-sidebar-item", { icon: "settings", to: "/settings" }, "Settings")));
    }
    render() {
        return (h("div", { class: {
                'ta-nav-drawer-component': true,
                'open': this.open
            } }, h("div", { class: "drawer-container" }, this.me.isAdmin ? this.adminMenu : this.userMenu, h("ta-button", { color: "grey", onTaClick: this.logout }, "Logout"))));
    }
};
TaNavDrawer.style = taNavDrawerCss;

export { TaNavDrawer as ta_nav_drawer };
