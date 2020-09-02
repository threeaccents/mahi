import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import './active-router-6e666068.js';
import { i as injectHistory } from './index-2f23714f.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

const taDrawersCss = ":host{display:block}";

const TaDrawers = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showDrawer = false;
        this.component = '';
    }
    handleRouteIdChanged() {
        const hash = window.location.hash;
        this.displayDrawer(hash);
    }
    displayDrawer(hash) {
        this.showDrawer = false;
        switch (hash) {
            case '#createApplication':
                this.component = 'create-application-view';
                break;
            case '#createUser':
                this.component = 'create-user-view';
                break;
            case '#editUser':
                this.component = 'edit-user-view';
                break;
            case '#editApplication':
                this.component = 'edit-application-view';
                break;
            default:
                this.component = '';
        }
        if (this.component !== '')
            this.showDrawer = true;
    }
    render() {
        const Component = this.component;
        return (h(Host, null, h("ta-drawer", { open: this.showDrawer }, Component !== '' ? h(Component, { history: this.history }) : null)));
    }
    static get watchers() { return {
        "routeId": ["handleRouteIdChanged"]
    }; }
};
injectHistory(TaDrawers);
TaDrawers.style = taDrawersCss;

export { TaDrawers as ta_drawers };
