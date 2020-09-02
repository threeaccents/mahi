import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const settingsViewCss = ":host{display:block}.settings-tab-wrapper{width:560px;max-width:calc(100vw - 2.5rem)}";

const SettingsView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.selectedTab = 'personal';
        this.checkRoute = () => {
            const location = this.history.location;
            switch (location.hash) {
                case '#personal':
                    this.selectedTab = 'personal';
                    break;
                case '#space':
                    this.selectedTab = 'space';
                    break;
                case '#billing':
                    this.selectedTab = 'billing';
                    break;
                default:
                    this.selectedTab = 'personal';
            }
        };
        this.handleTabChange = (e) => {
            const tab = e.detail;
            this.history.push(`/settings#${tab}`);
        };
    }
    componentWillLoad() {
        this.checkRoute();
    }
    render() {
        return (h(Host, null, h("ta-app-page", null, h("ta-page-header", { pageTitle: "Settings" }), h("ta-tabs", { onTaChange: this.handleTabChange, initialValue: this.selectedTab }, h("ta-tab-header-bar", null, h("ta-tab-header", { tab: "personal" }, "Personal"), h("ta-tab-header", { tab: "space" }, "Space"), h("ta-tab-header", { tab: "billing" }, "Billing")), h("div", { class: "settings-tab-wrapper" }, h("ta-tab-body", { tab: "personal" }, h("personal-setting-view", null)), h("ta-tab-body", { tab: "space" }, h("space-setting-view", null)), h("ta-tab-body", { tab: "billing" }, h("billing-setting-view", null)))))));
    }
};
SettingsView.style = settingsViewCss;

export { SettingsView as settings_view };
