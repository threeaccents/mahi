import { r as registerInstance, h } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { A as AuthService } from './index-2cb0454e.js';
import './validation-9a44dfe6.js';
import { m as me } from './auth-d1cdc736.js';
import { r as randInt, d as debounce } from './index-fb199afa.js';
import { t as toastr } from './index-61f3bdea.js';
import { B as BillingService } from './index-8aa11b8a.js';

const appRootCss = "header{background:#5851ff;color:white;height:56px;display:flex;align-items:center;box-shadow:0 2px 5px 0 rgba(0, 0, 0, 0.26)}h1{font-size:1.4rem;font-weight:500;color:#fff;padding:0 12px}";

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const AppRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentDidLoad() {
        if (!me())
            return;
        this.refreshAuthData();
        if (!me().isAdmin)
            return;
        this.refreshInvoiceData();
    }
    refreshAuthData() {
        AuthService()
            .updateLocalStorage();
    }
    refreshInvoiceData() {
        BillingService()
            .setBilling();
    }
    render() {
        return (h("div", null, h("main", null, h("stencil-router", null, h("stencil-route-switch", { scrollTopOffset: 0 }, h(GuestRoute, { url: ['/', '/auth'], component: 'auth-view', exact: true }), h(GuestRoute, { url: "/forgot-password", component: 'forgot-password-view', exact: true }), h(GuestRoute, { url: "/reset-password", component: 'reset-password-view', exact: true }), h(AdminRoute, { url: '/users', component: 'users-view', exact: true }), h(AppRoute, { url: '/applications/:slug', component: 'application-details-view', exact: true }), h(AppRoute, { url: '/applications', component: 'applications-view', exact: true }), h(AdminRoute, { url: '/dashboard', component: 'dashboard-view', exact: true }), h(AppRoute, { url: "/settings", component: "settings-view", exact: true }))))));
    }
};
const AppRoute = (_a) => {
    var { component } = _a, props = __rest(_a, ["component"]);
    const Component = component;
    return (h("stencil-route", Object.assign({}, props, { routeRender: (props) => {
            if (AuthService().isAuthenticated()) {
                return (h("ta-app-layout", null, h("ta-drawers", { routeId: randInt(1000) }), h(Component, Object.assign({}, props, props.componentProps))));
            }
            return h("stencil-router-redirect", { url: "/auth" });
        } })));
};
const AdminRoute = (_a) => {
    var { component } = _a, props = __rest(_a, ["component"]);
    const Component = component;
    const warningMessage = debounce(() => {
        toastr().warning(`You do not have permission to view "${props.url}" page.`);
    }, 300);
    return (h("stencil-route", Object.assign({}, props, { routeRender: (props) => {
            if (AuthService().isAuthenticated() && me().isAdmin) {
                return (h("ta-app-layout", null, h("ta-drawers", { routeId: randInt(1000) }), h(Component, Object.assign({}, props, props.componentProps))));
            }
            warningMessage();
            return h("stencil-router-redirect", { url: "/applications" });
        } })));
};
const GuestRoute = (_a) => {
    var { component } = _a, props = __rest(_a, ["component"]);
    const Component = component;
    return (h("stencil-route", Object.assign({}, props, { routeRender: (props) => {
            if (!AuthService().isAuthenticated()) {
                return h(Component, Object.assign({}, props, props.componentProps));
            }
            return h("stencil-router-redirect", { url: me().isAdmin ? '/dashboard' : '/applications' });
        } })));
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
