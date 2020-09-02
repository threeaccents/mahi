import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';
import { i as isFullName, a as isEmail } from './index-d97fcc51.js';
import './base-1320a4aa.js';
import './index-16096693.js';
import { t as toastr } from './index-61f3bdea.js';
import { U as UserService } from './index-25b222b6.js';

const initialNewUserModel = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false,
};
const initialNewSuperUserModel = {
    space: '',
    fullName: '',
    email: '',
    password: '',
};

const createUserViewCss = ":host{display:block}.form-title{font-size:24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;color:var(--primary-text-color)}label{font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:var(--dark-text-color);margin-bottom:24px;display:block}.header{display:flex;justify-content:flex-end}.close-icon{font-size:24px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;text-align:center;color:var(--light-text-color);cursor:pointer}ta-icon{--ta-icon-fill:#c3cbd3}";

const initialFormErr = {
    fullName: '',
    password: '',
    email: '',
    error: '',
};
const CreateUserView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.newUser = initialNewUserModel;
        this.formErr = initialFormErr;
        this.creatingUser = false;
        this.fullName = '';
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validate()
                .then(this.createUser)
                .catch(this.handleValidationErrors);
        };
        this.handleValidationErrors = (errs) => {
            this.formErr = errs;
        };
        this.createUser = () => {
            this.creatingUser = true;
            const payload = this.getPayload();
            UserService()
                .createUser(payload)
                .then(this.onSuccess)
                .catch(this.handleError)
                .finally(() => this.creatingUser = false);
        };
        this.getLastName = () => {
            const fullNameArr = this.fullName.split(" ");
            fullNameArr.shift();
            return fullNameArr.join(" ");
        };
        this.getPayload = () => {
            return Object.assign(Object.assign({}, this.newUser), { firstName: this.fullName.split(' ')[0], lastName: this.getLastName() });
        };
        this.onSuccess = (resp) => {
            toastr().success(`${resp.data.firstName} ${resp.data.lastName} was created!`);
            this.resetForm();
            this.taUserWasCreated.emit(resp.data);
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
            const { newUser } = this;
            let errors = {};
            if (this.fullName === '') {
                errors = Object.assign(Object.assign({}, errors), { fullName: 'Full name is required' });
            }
            if (!!this.fullName && !isFullName(this.fullName)) {
                errors = Object.assign(Object.assign({}, errors), { fullName: 'Please enter a valid full name' });
            }
            if (newUser.email === '') {
                errors = Object.assign(Object.assign({}, errors), { email: 'Email is required' });
            }
            if (!!newUser.email && !isEmail(newUser.email)) {
                errors = Object.assign(Object.assign({}, errors), { email: 'Please enter a valid email address' });
            }
            if (newUser.password === '') {
                errors = Object.assign(Object.assign({}, errors), { password: 'Password is required' });
            }
            if (!!newUser.password && newUser.password.length < 7) {
                errors = Object.assign(Object.assign({}, errors), { password: 'Password must be at least 7 characters long' });
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
        this.updateNewUser = (key, value) => {
            this.formErr = initialFormErr;
            this.newUser = Object.assign(Object.assign({}, this.newUser), { [key]: value });
        };
        this.updateFullName = (value) => {
            this.formErr = initialFormErr;
            this.fullName = value;
        };
        this.resetForm = () => {
            this.newUser = initialNewUserModel;
            this.formErr = initialFormErr;
        };
        this.handleClose = () => {
            const pathname = this.history.location.pathname;
            this.resetForm();
            this.history.push(pathname);
        };
        this.taUserWasCreated = createEvent(this, "taUserWasCreated", 7);
    }
    render() {
        const { newUser, formErr } = this;
        return (h(Host, null, h("div", { class: "header" }, h("div", { class: "close-icon", onClick: this.handleClose }, h("ta-icon", { icon: "close" }))), h("ta-form", { onTaSubmit: (e) => this.onSubmit(e) }, h("label", null, "Create User"), h("ta-input", { value: this.fullName, label: "Full Name", onTaInput: (e) => this.updateFullName(e.detail), error: formErr.fullName }), h("ta-input", { value: newUser.email, label: "Email", onTaInput: (e) => this.updateNewUser('email', e.detail), error: formErr.email }), h("ta-input", { type: "password", value: newUser.password, label: "Password", onTaInput: (e) => this.updateNewUser('password', e.detail), error: formErr.password }), h("ta-switch-button", { initialChecked: newUser.isAdmin, label: "Administrator", onTaChange: (e) => this.updateNewUser('isAdmin', e.detail) }), h("ta-error", { error: formErr.error }), h("ta-button", { type: 'submit', loading: this.creatingUser, onTaClick: (e) => this.onSubmit(e) }, "Create User"), h("ta-button", { color: "white", onTaClick: this.handleClose }, "Cancel"))));
    }
};
CreateUserView.style = createUserViewCss;

export { CreateUserView as create_user_view };
