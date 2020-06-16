import { r as registerInstance, h, c as createEvent, H as Host } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { t as toastr } from './index-61f3bdea.js';
import { A as ApplicationService } from './index-71a5ab2d.js';
import { U as UserService } from './index-8346a309.js';

const editApplicationViewCss = ":host{display:block}.form-title{font-size:24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;color:var(--primary-text-color)}label{font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:var(--dark-text-color);margin-bottom:24px;display:block}.header{display:flex;justify-content:flex-end}.close-icon{font-size:24px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;text-align:center;color:var(--light-text-color);cursor:pointer}ta-icon{--ta-icon-fill:#c3cbd3}";

const initialFormErr = {
    name: '',
    error: '',
};
const EditApplicationView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fetchingApplication = false;
        this.application = null;
        this.fetchingUsers = true;
        this.spaceUsersOptions = [];
        this.formErr = initialFormErr;
        this.updatingApplication = false;
        this.applicationId = this.history.location.query.applicationId;
        this.getApplicationState = () => {
            const { state } = this.history.location;
            if (!state || !state.application)
                return this.fetchApplication();
            const { name, description, users } = state.application;
            this.application = {
                name,
                description,
                userIds: users.map(u => u.id),
            };
            this.initialApplication = this.application;
        };
        this.fetchApplication = () => {
            this.fetchingApplication = true;
            ApplicationService()
                .get(this.applicationId)
                .then(this.onFetchApplicationSuccess)
                .catch(this.handleError)
                .finally(() => this.fetchingApplication = false);
        };
        this.onFetchApplicationSuccess = (resp) => {
            const app = resp.data;
            const { name, description, users } = app;
            this.application = {
                name,
                description,
                userIds: users.map(u => u.id),
            };
            this.initialApplication = this.application;
        };
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
            this.spaceUsersOptions = options;
        };
        this.handleError = (err) => {
            if (!err.error) {
                toastr().danger('Oops! Something went wrong. Please refresh and try again');
                return console.log(err);
            }
            this.formErr = Object.assign(Object.assign({}, this.formErr), { error: err.error });
        };
        this.validate = () => {
            const { application } = this;
            let errors = {};
            if (application.name === '') {
                errors = Object.assign(Object.assign({}, errors), { name: 'Name is required' });
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validate()
                .then(this.updateApplication)
                .catch(this.handleValidationErrors);
        };
        this.handleValidationErrors = (errs) => {
            this.formErr = errs;
        };
        this.updateApplication = () => {
            this.updatingApplication = true;
            const payload = this.application;
            ApplicationService()
                .update(this.applicationId, payload)
                .then(this.onUpdateApplicationSuccess)
                .catch(this.handleError)
                .finally(() => this.updatingApplication = false);
        };
        this.onUpdateApplicationSuccess = (resp) => {
            toastr().success('Application was updated!');
            this.taApplicationWasUpdated.emit(resp.data);
            this.handleClose();
        };
        this.handleClose = () => {
            const pathname = this.history.location.pathname;
            this.history.push(pathname);
        };
        this.updateApplicationField = (key, value) => {
            this.formErr = initialFormErr;
            this.application = Object.assign(Object.assign({}, this.application), { [key]: value });
        };
        this.getUsersField = () => {
            const { fetchingUsers, spaceUsersOptions, application } = this;
            if (spaceUsersOptions.length === 0)
                return;
            return (h("ta-multi-select", { loading: fetchingUsers, label: "Add Users", value: application.userIds, options: spaceUsersOptions, onTaSelect: (e) => this.updateApplicationField('userIds', e.detail) }));
        };
        this.taApplicationWasUpdated = createEvent(this, "taApplicationWasUpdated", 7);
    }
    componentWillLoad() {
        this.loadUsers();
        this.getApplicationState();
    }
    get hasNoFieldUpdates() {
        return JSON.stringify(this.initialApplication) === JSON.stringify(this.application);
    }
    render() {
        const { application, formErr } = this;
        const { name, error } = formErr;
        if (this.fetchingApplication)
            return h("ta-loader", null);
        return (h(Host, null, h("div", { class: "header" }, h("div", { class: "close-icon", onClick: this.handleClose }, h("ta-icon", { icon: "close" }))), h("ta-form", { onTaSubmit: (e) => this.onSubmit(e) }, h("label", null, "Edit Application"), h("ta-input", { value: application.name, label: "Application Name", onTaInput: (e) => this.updateApplicationField('name', e.detail), error: name }), h("ta-textarea", { value: application.description, label: "Description", onTaInput: (e) => this.updateApplicationField('description', e.detail) }), this.getUsersField(), h("ta-error", { error: error }), h("ta-button", { disabled: this.hasNoFieldUpdates, loading: this.updatingApplication, onTaClick: (e) => this.onSubmit(e) }, "Save"), h("ta-button", { color: "white", onTaClick: this.handleClose }, "Cancel"))));
    }
};
EditApplicationView.style = editApplicationViewCss;

export { EditApplicationView as edit_application_view };
