import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import './validation-9a44dfe6.js';
import { a as meUserId } from './auth-d1cdc736.js';
import './index-fb199afa.js';
import { t as toastr } from './index-61f3bdea.js';
import { A as ApplicationService } from './index-71a5ab2d.js';
import { U as UserService } from './index-8346a309.js';
import { W as WasabiRegions, A as AWSRegions, D as DoRegions } from './index-3b6bebc6.js';

const initialNewApplicationModel = {
    name: '',
    description: '',
    userIds: [],
    storageEngine: 'oriio',
    storageSecretKey: '',
    storageEndpoint: '',
    storageRegion: '',
    storageAccessKey: '',
};

const createApplicationViewCss = ":host{display:block}.form-title{font-size:24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;color:var(--primary-text-color)}label{font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:var(--dark-text-color);margin-bottom:24px;display:block}.header{display:flex;justify-content:flex-end}.close-icon{font-size:24px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;text-align:center;color:var(--light-text-color);cursor:pointer}ta-icon{--ta-icon-fill:#c3cbd3}";

const initialFormErr = {
    nameErr: '',
    storageSecretKeyErr: '',
    storageAccessKeyErr: '',
    storageRegionErr: '',
    error: '',
};
const CreateApplicationView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.newApplication = initialNewApplicationModel;
        this.formErr = initialFormErr;
        this.creatingApplication = false;
        this.fetchingUsers = true;
        this.spaceUsersOptions = [];
        this.loadUsers = () => {
            UserService().listSpaceUsers()
                .then(this.onListSpaceUserSuccess)
                .catch(this.handleError)
                .finally(() => this.fetchingUsers = false);
        };
        this.onListSpaceUserSuccess = (resp) => {
            const options = resp.data.map((u) => {
                return { text: `${u.firstName} ${u.lastName}`, value: u.id };
            });
            const filteredOptions = options.filter((o) => o.value !== meUserId());
            this.spaceUsersOptions = filteredOptions;
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validate()
                .then(this.createApplication)
                .catch(this.handleValidationErrors);
        };
        this.handleValidationErrors = (errs) => {
            this.formErr = errs;
        };
        this.createApplication = () => {
            this.creatingApplication = true;
            const payload = this.newApplication;
            ApplicationService()
                .create(payload)
                .then(this.onCreateApplicationSuccess)
                .catch(this.handleError)
                .finally(() => this.creatingApplication = false);
        };
        this.onCreateApplicationSuccess = (resp) => {
            toastr().success('Application was created!');
            this.resetForm();
            this.history.push(`/applications/${resp.data.slug}`);
        };
        // add better error handling per use case
        this.handleError = (err) => {
            if (!err.error) {
                this.formErr.error = 'Oops! Something went wrong. Please refresh and try again';
                return console.log(err);
            }
            const msg = err.error;
            if (msg.includes('application name is taken')) {
                this.formErr = Object.assign(Object.assign({}, this.formErr), { nameErr: 'Application name is taken' });
                return;
            }
            if (msg.includes('connection')) {
                this.formErr.error = 'Error with connection. Please double check your credentials are correct';
                return console.log(err);
            }
            toastr().danger(msg);
        };
        this.validate = () => {
            const { newApplication } = this;
            const isNotOriioEngine = newApplication.storageEngine !== 'oriio';
            let errors = {};
            if (newApplication.name === '') {
                errors = Object.assign(Object.assign({}, errors), { nameErr: 'Name is required' });
            }
            if (isNotOriioEngine) {
                if (newApplication.storageAccessKey === '') {
                    errors = Object.assign(Object.assign({}, errors), { storageAccessKeyErr: 'Access key is required' });
                }
                if (newApplication.storageSecretKey === '') {
                    errors = Object.assign(Object.assign({}, errors), { storageSecretKeyErr: 'Secret key is required' });
                }
                if (newApplication.storageEngine !== 'b2' && newApplication.storageRegion === '') {
                    errors = Object.assign(Object.assign({}, errors), { storageRegionErr: 'Bucket region is required' });
                }
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
        this.updateNewApplication = (key, value) => {
            this.formErr = initialFormErr;
            this.newApplication = Object.assign(Object.assign({}, this.newApplication), { [key]: value });
        };
        this.handleClose = () => {
            const pathname = this.history.location.pathname;
            this.resetForm();
            this.history.push(pathname);
        };
        this.resetForm = () => {
            this.newApplication = initialNewApplicationModel;
            this.formErr = initialFormErr;
        };
        this.getCustomFormFields = () => {
            const { newApplication, formErr } = this;
            const { storageRegionErr, storageSecretKeyErr, storageAccessKeyErr } = formErr;
            return (h("span", null, h("custom-storage-engine-input", { value: newApplication.storageEngine, onTaSelect: (e) => this.updateNewApplication('storageEngine', e.detail) }), newApplication.storageEngine !== 'oriio' ?
                h("span", null, h("ta-input", { value: newApplication.storageAccessKey, label: "API Access Key", onTaInput: (e) => this.updateNewApplication('storageAccessKey', e.detail), error: storageAccessKeyErr }), h("ta-input", { type: "password", value: newApplication.storageSecretKey, label: "API Secret Key", onTaInput: (e) => this.updateNewApplication('storageSecretKey', e.detail), error: storageSecretKeyErr }), newApplication.storageEngine !== 'b2' ?
                    h("ta-select", { value: newApplication.storageRegion, onTaSelect: (e) => this.updateNewApplication('storageRegion', e.detail), placeholder: "Select Bucket Region", error: storageRegionErr }, this.getStorageRegions().map((item) => (h("ta-select-option", { value: item, label: item.toUpperCase() }))))
                    : null)
                : null));
        };
        this.getUsersField = () => {
            const { newApplication, fetchingUsers, spaceUsersOptions } = this;
            if (spaceUsersOptions.length === 0)
                return;
            return (h("ta-multi-select", { loading: fetchingUsers, label: "Add Users", value: newApplication.userIds, options: spaceUsersOptions, onTaSelect: (e) => this.updateNewApplication('userIds', e.detail) }));
        };
    }
    componentWillLoad() {
        this.loadUsers();
    }
    getStorageRegions() {
        switch (this.newApplication.storageEngine) {
            case 'digital_ocean':
                return DoRegions;
            case 's3':
                return AWSRegions;
            case 'wasabi':
                return WasabiRegions;
            default:
                return [];
        }
    }
    render() {
        const { newApplication, formErr } = this;
        const { nameErr, error } = formErr;
        return (h(Host, null, h("div", { class: "header" }, h("div", { class: "close-icon", onClick: this.handleClose }, h("ta-icon", { icon: "close" }))), h("ta-form", { onTaSubmit: (e) => this.onSubmit(e) }, h("label", null, "Create Application"), h("ta-input", { value: newApplication.name, label: "Application Name", onTaInput: (e) => this.updateNewApplication('name', e.detail), error: nameErr }), h("ta-textarea", { value: newApplication.description, label: "Description", onTaInput: (e) => this.updateNewApplication('description', e.detail) }), this.getUsersField(), h("label", null, "Storage Details"), this.getCustomFormFields(), h("ta-error", { error: error }), h("ta-button", { loading: this.creatingApplication, onTaClick: (e) => this.onSubmit(e) }, "Create Application"), h("ta-button", { color: "white", onTaClick: this.handleClose }, "Cancel"))));
    }
};
CreateApplicationView.style = createApplicationViewCss;

export { CreateApplicationView as create_application_view };
