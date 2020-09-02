import { r as registerInstance, h } from './index-d067c2a6.js';
import { r as randInt } from './index-d97fcc51.js';

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
    render() {
        return (h("div", null, h("main", null, h("stencil-router", null, h("stencil-route-switch", { scrollTopOffset: 0 }, h(AppRoute, { url: ['', '/applications'], component: 'applications-view', exact: true }), h(AppRoute, { url: '/applications/:slug', component: 'application-details-view', exact: true }), h(AppRoute, { url: '/dashboard', component: 'dashboard-view', exact: true }))))));
    }
};
const AppRoute = (_a) => {
    var { component } = _a, props = __rest(_a, ["component"]);
    const Component = component;
    return (h("stencil-route", Object.assign({}, props, { routeRender: (props) => {
            return (h("ta-app-layout", null, h("ta-drawers", { routeId: randInt(1000) }), h(Component, Object.assign({}, props, props.componentProps))));
        } })));
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
