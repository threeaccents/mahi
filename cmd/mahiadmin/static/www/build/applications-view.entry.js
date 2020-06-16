import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import './validation-9a44dfe6.js';
import { m as me } from './auth-d1cdc736.js';
import './index-fb199afa.js';
import { t as toastr } from './index-61f3bdea.js';
import { A as ApplicationService } from './index-71a5ab2d.js';

const applicationsViewCss = ":host{display:block}.applications-wrapper{display:grid;grid-template-columns:auto auto auto auto;grid-gap:20px}.applications-wrapper.full-width{grid-template-columns:auto}a{text-decoration:none;color:inherit}.page-actions{display:flex}ta-icon{opacity:.5;cursor:pointer}ta-icon.selected{opacity:1}ta-icon:nth-child(2){margin-left:17px}@media (max-width: 1400px){.applications-wrapper{grid-template-columns:auto auto auto}}@media (max-width: 1140px){.applications-wrapper{grid-template-columns:auto auto}}@media (max-width: 1080px){.applications-wrapper{grid-template-columns:auto auto auto}}@media (max-width: 866px){.applications-wrapper{grid-template-columns:auto auto}}@media (max-width: 600px){.applications-wrapper{grid-template-columns:auto}}";

const applicationViewTypeKey = 'applicationViewType';
const ApplicationsView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.me = me();
        this.applications = [];
        this.fetchingApi = false;
        this.applicationView = localStorage.getItem(applicationViewTypeKey) || 'card';
        this.loadApplications = () => {
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
        this.updateApplicationView = (type) => {
            this.applicationView = type;
            localStorage.setItem(applicationViewTypeKey, type);
        };
    }
    listenApplicationWasUpdated(e) {
        const newApplicationsValue = this.applications.map(a => {
            if (a.id !== e.detail.id)
                return a;
            return e.detail;
        });
        this.applications = newApplicationsValue;
    }
    listenApplicationWasDeleted(e) {
        this.applications = this.applications.filter(a => a.id !== e.detail);
    }
    componentWillLoad() {
        this.loadApplications();
    }
    render() {
        const pathname = this.history.location.pathname;
        return (h(Host, null, h("ta-app-page", null, h("ta-page-header", { pageTitle: "My Applications" }, h("div", { slot: "right" }, h("div", { class: "page-actions" }, h("ta-icon", { onClick: () => this.updateApplicationView('card'), class: { 'selected': this.applicationView === 'card' }, icon: 'card' }), h("ta-icon", { icon: 'list', onClick: () => this.updateApplicationView('list'), class: { 'selected': this.applicationView === 'list' } })))), this.fetchingApi ? h("ta-loader", null) :
            h("div", { class: {
                    'applications-wrapper': true,
                    'full-width': this.applicationView === 'list'
                } }, this.me.isAdmin ?
                h("stencil-route-link", { url: `${pathname}#createApplication` }, this.applicationView === 'card' ? h("ta-application-card", { create: true }) : h("ta-application-list-card", { create: true }))
                : null, this.applications.map((p) => (this.applicationView === 'card' ? h("ta-application-card", { application: p }) :
                h("ta-application-list-card", { application: p })))))));
    }
};
ApplicationsView.style = applicationsViewCss;

export { ApplicationsView as applications_view };
