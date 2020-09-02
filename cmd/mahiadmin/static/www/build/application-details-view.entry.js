import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import { d as debounce } from './index-d97fcc51.js';
import './base-1320a4aa.js';
import './index-16096693.js';
import { A as ApplicationService } from './index-e79621f6.js';
import { F as FileService } from './index-f612ac63.js';
import { t as toastr } from './index-61f3bdea.js';

const applicationDetailsViewCss = "application-details-view{}ta-error{--ta-error-bg-color:#fffbe6;--ta-error-color:rgba(0, 0, 0, 0.65);--ta-error-border:1px solid #ffe58f;--ta-error-margin-bottom:6px;--ta-error-padding:8px 15px}.files-wrapper{display:grid;grid-template-columns:auto auto auto auto;grid-gap:18px}.page-actions{display:flex;align-items:center}.icon{margin-left:10px}.wrapper{display:grid;grid-template-columns:auto minmax(auto, 280px)}@media (max-width: 1500px){.files-wrapper{grid-template-columns:auto auto auto}}@media (max-width: 1200px){.wrapper{grid-template-columns:auto 200px}.files-wrapper{grid-template-columns:auto auto auto}}@media (max-width: 768px){.wrapper{grid-template-columns:auto 150px}}@media (max-width: 768px){.wrapper{grid-template-columns:auto 0px}}@media (max-width: 600px){.files-wrapper{grid-template-columns:auto auto}}@media (max-width: 400px){.files-wrapper{grid-template-columns:auto}}";

const ApplicationDetailsView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.initialFiles = [];
        this.isMobile = window.innerWidth < 768;
        this.files = [];
        this.fetchingApi = false;
        this.searchQuery = '';
        this.fetchApplication = () => {
            this.fetchingApi = true;
            ApplicationService()
                .get(this.match.params.slug)
                .then(this.handleApplicationSuccess)
                .then(this.handleFileSuccess)
                .catch(this.handleError)
                .finally(() => this.fetchingApi = false);
        };
        this.handleApplicationSuccess = (resp) => {
            this.application = resp.data;
            return this.fetchFiles(this.application.id);
        };
        this.handleFileSuccess = (resp) => {
            this.files = resp.data;
            this.initialFiles = resp.data;
        };
        this.fetchFiles = (id) => {
            return FileService()
                .listApplicationFiles(id);
        };
        this.handleError = (err) => {
            if (!err.error) {
                return console.log(err);
            }
            toastr().danger(err.error);
        };
        this.handleFileUploaded = (e) => {
            const { application, files } = this;
            const file = e.detail;
            this.initialFiles = [file, ...files];
            if (!this.searchQuery && this.searchQuery === '') {
                this.files = [file, ...files];
            }
            this.application = Object.assign({}, application);
        };
        this.onSearch = debounce((e) => {
            this.searchQuery = e.detail;
            if (!e.detail || e.detail === '') {
                this.files = this.initialFiles;
                return;
            }
            FileService()
                .search({
                applicationId: this.application.id,
                query: e.detail
            }).then(resp => {
                this.files = resp.data;
            })
                .catch(this.handleError);
        }, 300);
    }
    listenFileWasDeleted(e) {
        const deletedFile = e.detail;
        this.files = this.files.filter(f => f.id !== deletedFile.id);
    }
    componentWillLoad() {
        this.fetchApplication();
    }
    render() {
        if (this.fetchingApi)
            return h("ta-loader", null);
        const { application } = this;
        return (h(Host, null, h("div", { class: "wrapper" }, h("div", { class: "left-side" }, h("ta-dragger", { onTaFileUpload: this.handleFileUploaded, applicationId: this.application.id }, h("ta-app-page", null, h("ta-page-header", { pageTitle: application.name }), h("div", { class: "file-search" }, h("ta-input", { value: this.searchQuery, onTaInput: this.onSearch, label: `Search ${!this.isMobile ? '(Hint: you can search an image by its content)' : ''}`, type: "search" })), h("div", { class: "files-wrapper" }, this.files.map((file) => (h("ta-file-card", { file: file }))))))), h("application-details-sidebar", { application: this.application }))));
    }
};
ApplicationDetailsView.style = applicationDetailsViewCss;

export { ApplicationDetailsView as application_details_view };
