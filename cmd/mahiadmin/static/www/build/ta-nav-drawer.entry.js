import { r as registerInstance, h } from './index-d067c2a6.js';
import { p as post, g as get } from './base-1320a4aa.js';
import { B as BASE_URL } from './index-16096693.js';

const onAuthenticateSuccess = (resp) => {
    AuthService().setToken(resp.data.token);
    return AuthService().me();
};
const onMeSuccess = (resp) => {
    AuthService().setMe(resp.data);
    return Promise.resolve(resp.data);
};
function AuthService() {
    return Object.freeze({
        authenticate(req) {
            return post(`${BASE_URL()}/authenticate`, req)
                .then(onAuthenticateSuccess)
                .then(onMeSuccess);
        },
        me() {
            return get(`${BASE_URL()}/me`);
        },
        passwordResetRequest(email) {
            return post(`${BASE_URL()}/accounts/request_reset`, { email });
        },
        resetPassword(token, password) {
            return post(`${BASE_URL()}/accounts/reset`, { token, password });
        },
        setToken(token) {
            localStorage.setItem('token', token);
        },
        setMe(me) {
            localStorage.setItem('me', JSON.stringify(me));
            localStorage.setItem('userId', me.id);
        },
        logout() {
            localStorage.clear();
            window.location.href = "/auth";
        },
        isAuthenticated() {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const me = localStorage.getItem('me');
            if (!token || token === '')
                return false;
            if (!userId || userId === '')
                return false;
            if (!me || me === '')
                return false;
            return true;
        },
        updateLocalStorage() {
            this.me()
                .then(onMeSuccess);
        }
    });
}

const taNavDrawerCss = ".ta-nav-drawer-component{width:100vw;position:fixed;top:60px;left:0;bottom:0;overflow-y:auto;z-index:999;transform:translate3d(-102%, 0, 0);transition:all ease .5s;background-color:rgba(0, 0, 0, 0.07);box-shadow:0 4px 18px 0 rgba(0, 0, 0, 0.09);background-color:#ffffff}.ta-nav-drawer-component.open{transform:translate3d(0, 1px, 0)}.drawer-container{padding:30px;height:80%;display:flex;flex-direction:column;justify-content:space-between}";

const TaNavDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.logout = () => {
            AuthService()
                .logout();
        };
    }
    get userMenu() {
        return (h("span", null, h("ta-sidebar-item", { class: "first", icon: "home", to: "/dashboard" }, "Dashboard"), h("ta-sidebar-item", { icon: "applications", to: "/applications" }, "My Applications"), h("ta-sidebar-item", { icon: "settings", to: "/settings" }, "Settings")));
    }
    render() {
        return (h("div", { class: {
                'ta-nav-drawer-component': true,
                'open': this.open
            } }, h("div", { class: "drawer-container" }, this.userMenu, h("ta-button", { color: "grey", onTaClick: this.logout }, "Logout"))));
    }
};
TaNavDrawer.style = taNavDrawerCss;

export { TaNavDrawer as ta_nav_drawer };
