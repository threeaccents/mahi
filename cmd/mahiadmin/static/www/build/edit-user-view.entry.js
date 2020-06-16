import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { i as isFullName, a as isEmail } from './validation-9a44dfe6.js';
import './auth-d1cdc736.js';
import './index-fb199afa.js';
import { t as toastr } from './index-61f3bdea.js';
import { U as UserService } from './index-8346a309.js';

const editUserViewCss = ":host{display:block}.form-title{font-size:24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;color:var(--primary-text-color)}label{font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:var(--dark-text-color);margin-bottom:24px;display:block}.header{display:flex;justify-content:flex-end}.close-icon{font-size:24px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;text-align:center;color:var(--light-text-color);cursor:pointer}ta-icon{--ta-icon-fill:#c3cbd3}";

const initialFormErr = {
    fullName: '',
    email: '',
    error: '',
};
const EditUserView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.user = {};
        this.formErr = initialFormErr;
        this.fetchingApi = false;
        this.updatingUser = false;
        this.fullName = '';
        this.initialUser = {};
        this.getUserState = () => {
            const { state } = this.history.location;
            if (!state || !state.user)
                return this.fetchUser();
            const { user } = state;
            this.initialUser = user;
            this.user = user;
            this.fullName = `${user.firstName} ${user.lastName}`;
        };
        this.fetchUser = () => {
            this.fetchingApi = true;
            const userId = this.history.location.query.userId;
            UserService()
                .getUser(userId)
                .then(this.onFetchUserSuccess)
                .catch(this.handleError)
                .finally(() => this.fetchingApi = false);
        };
        this.onFetchUserSuccess = (resp) => {
            const user = resp.data;
            this.initialUser = user;
            this.user = user;
            this.fullName = `${user.firstName} ${user.lastName}`;
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validate()
                .then(this.updateUser)
                .catch(this.handleValidationErrors);
        };
        this.handleValidationErrors = (errs) => {
            this.formErr = errs;
        };
        this.getLastName = () => {
            const fullNameArr = this.fullName.split(" ");
            fullNameArr.shift();
            return fullNameArr.join(" ");
        };
        this.updateUser = () => {
            this.updatingUser = true;
            const payload = this.getPayload();
            UserService()
                .updateUser(this.user.id, payload)
                .then(this.onSuccess)
                .catch(this.handleError)
                .finally(() => this.updatingUser = false);
        };
        this.getPayload = () => {
            return Object.assign(Object.assign({}, this.user), { firstName: this.fullName.split(' ')[0], lastName: this.getLastName() });
        };
        this.onSuccess = (resp) => {
            toastr().success(`${resp.data.firstName} ${resp.data.lastName} was updated!`);
            this.taUserWasUpdated.emit(resp.data);
            this.history.push(`/users`);
        };
        this.handleError = (err) => {
            if (!err.error) {
                this.formErr.error = 'Oops! Something went wrong. Please refresh and try again';
                return console.log(err);
            }
            const msg = err.error;
            if (msg.includes('email is taken')) {
                this.formErr = Object.assign(Object.assign({}, this.formErr), { email: 'Email is taken' });
                return;
            }
            toastr().danger(msg);
        };
        this.validate = () => {
            const { user } = this;
            let errors = {};
            if (!this.fullName || this.fullName === '') {
                errors = Object.assign(Object.assign({}, errors), { fullName: 'Full name is required' });
            }
            if (!isFullName(this.fullName)) {
                errors = Object.assign(Object.assign({}, errors), { fullName: 'Please enter your full name (first & last name).' });
            }
            if (user.email === '') {
                errors = Object.assign(Object.assign({}, errors), { email: 'Email is required' });
            }
            if (!isEmail(user.email)) {
                errors = Object.assign(Object.assign({}, errors), { email: 'Please enter a valid email address' });
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
        this.updateUserField = (key, value) => {
            this.formErr = initialFormErr;
            this.user = Object.assign(Object.assign({}, this.user), { [key]: value });
        };
        this.updateFullName = (value) => {
            this.formErr = initialFormErr;
            this.fullName = value;
        };
        this.handleClose = () => {
            const pathname = this.history.location.pathname;
            this.history.push(pathname);
        };
        this.taUserWasUpdated = createEvent(this, "taUserWasUpdated", 7);
    }
    componentWillLoad() {
        this.getUserState();
    }
    get hasNoFieldUpdates() {
        const request = this.getPayload();
        return JSON.stringify(this.initialUser) === JSON.stringify(request);
    }
    render() {
        const { user, formErr } = this;
        if (this.fetchingApi)
            return h("ta-loader", null);
        return (h(Host, null, h("div", { class: "header" }, h("div", { class: "close-icon", onClick: this.handleClose }, h("ta-icon", { icon: "close" }))), h("ta-form", { onTaSubmit: (e) => this.onSubmit(e) }, h("label", null, "Edit User"), h("ta-input", { value: this.fullName, label: "Full Name", onTaInput: (e) => this.updateFullName(e.detail), error: formErr.fullName }), h("ta-input", { value: user.email, label: "Email", onTaInput: (e) => this.updateUserField('email', e.detail), error: formErr.email }), h("ta-switch-button", { initialChecked: user.isAdmin, label: "Administrator", onTaChange: (e) => this.updateUserField('isAdmin', e.detail) }), h("ta-error", { error: formErr.error }), h("ta-button", { disabled: this.hasNoFieldUpdates, loading: this.updatingUser, onTaClick: (e) => this.onSubmit(e) }, "Save"), h("ta-button", { color: "white", onTaClick: this.handleClose }, "Cancel"))));
    }
};
EditUserView.style = editUserViewCss;

export { EditUserView as edit_user_view };
