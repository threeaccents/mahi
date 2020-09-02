import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import './base-1320a4aa.js';
import './index-16096693.js';
import { A as ApplicationService } from './index-e79621f6.js';
import { t as toastr } from './index-61f3bdea.js';

const taRecentApplicationsListCss = ":host{display:block;--ta-recent-application-list-margin:30px 0 0 0;margin:var(--ta-recent-application-list-margin)}.title-action{margin-left:35px}.title{display:flex;align-items:center}.title-text{font-size:24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;color:var(--primary-text-color)}.applications-list{margin-top:33px;min-height:120px;position:relative}.application-list-wrapper{display:grid;grid-template-columns:auto auto auto auto;grid-gap:20px}a{text-decoration:none}@media (max-width: 1400px){.application-list-wrapper{grid-template-columns:auto auto}}@media (max-width: 768px){.application-list-wrapper{grid-template-columns:auto}}@media (max-width: 364px){.title-action{display:none}}";

const TaRecentApplicationsList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fetchingApi = false;
        this.applications = [];
        this.getApplications = () => {
            this.fetchingApi = true;
            ApplicationService()
                .list()
                .then(this.handleSuccess)
                .catch(this.handleError)
                .finally(() => this.fetchingApi = false);
        };
        this.handleSuccess = (resp) => {
            this.applications = resp.data;
        };
        this.handleError = (err) => {
            if (!err.error) {
                toastr().danger('Oops! Something went wrong. Please refresh and try again');
                return console.log(err);
            }
            toastr().danger(err.error);
        };
    }
    componentWillLoad() {
        this.getApplications();
    }
    showApplications() {
        if (this.fetchingApi)
            return h("ta-loader", null);
        return (h("div", { class: "application-list-wrapper" }, this.applications.slice(0, 4).map((p) => (h("ta-application-card", { application: p })))));
    }
    render() {
        return (h(Host, null, h("div", { class: "title" }, h("div", { class: "title-text" }, "Recent Applications"), h("div", { class: "title-action" }, h("stencil-route-link", { url: "/applications" }, h("ta-button", { small: true, color: "dark-grey" }, "View All")))), h("div", { class: "applications-list" }, this.showApplications())));
    }
};
TaRecentApplicationsList.style = taRecentApplicationsListCss;

export { TaRecentApplicationsList as ta_recent_applications_list };
