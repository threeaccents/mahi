import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { i as isFullName, a as isEmail } from './validation-9a44dfe6.js';
import { m as me } from './auth-d1cdc736.js';
import './index-fb199afa.js';
import { t as toastr } from './index-61f3bdea.js';
import { U as UserService } from './index-8346a309.js';

const personalSettingViewCss = "hr{border:solid 1px #e2e6ef;margin:30px 0}ta-button{--ta-button-width:150px}ta-button.update-password-btn{--ta-button-width:200px}";

const initialFormErr = {
    fullName: '',
    email: '',
    oldPassword: '',
    password: '',
    serverError: '',
};
const initialUpdatePasswordState = {
    oldPassword: '',
    password: '',
    fetchingApi: false,
};
const PersonalSettingView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.initialMe = me();
        this.me = this.initialMe;
        this.formErr = initialFormErr;
        this.updatingUser = false;
        this.updatePasswordState = initialUpdatePasswordState;
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validate()
                .then(this.updateUser)
                .catch(this.handleValidationErrors);
        };
        this.updateUser = () => {
            this.updatingUser = true;
            const payload = Object.assign(Object.assign({}, this.me), { firstName: this.fullName.split(' ')[0], lastName: this.getLastName() });
            UserService()
                .updateUser(this.me.id, payload)
                .then(this.onSuccess)
                .catch(this.handleError)
                .finally(() => this.updatingUser = false);
        };
        this.onSuccess = (resp) => {
            toastr().success(`Your info was updated!`);
            localStorage.setItem('me', JSON.stringify(resp.data));
        };
        this.handleError = (err) => {
            if (!err.error) {
                this.formErr.serverError = 'Oops! Something went wrong. Please refresh and try again';
                return console.log(err);
            }
            const msg = err.error;
            if (msg.includes('email is taken')) {
                this.formErr = Object.assign(Object.assign({}, this.formErr), { email: 'Email is taken' });
                return;
            }
            if (msg.includes('invalid credentials')) {
                this.formErr = Object.assign(Object.assign({}, this.formErr), { oldPassword: 'password is incorrect' });
                return;
            }
            toastr().danger(msg);
        };
        this.handleValidationErrors = (errs) => {
            this.formErr = errs;
        };
        this.onUpdatePasswordSubmit = (e) => {
            e.preventDefault();
            this.validateUpdatePassword()
                .then(this.updatePassword)
                .catch(this.handleValidationErrors);
        };
        this.updatePassword = () => {
            this.updatePasswordState.fetchingApi = true;
            const { password, oldPassword } = this.updatePasswordState;
            const payload = {
                userId: this.me.id,
                oldPassword,
                password,
            };
            UserService()
                .updatePassword(payload)
                .then(this.handleUpdatePasswordSuccess)
                .catch(this.handleError)
                .finally(() => this.updatePasswordState.fetchingApi = false);
        };
        this.handleUpdatePasswordSuccess = () => {
            toastr().success('password was updated');
            this.updatePasswordState = initialUpdatePasswordState;
        };
        this.getLastName = () => {
            const fullNameArr = this.fullName.split(" ");
            fullNameArr.shift();
            return fullNameArr.join(" ");
        };
        this.updatePasswordField = (key, value) => {
            this.formErr = initialFormErr;
            this.updatePasswordState = Object.assign(Object.assign({}, this.updatePasswordState), { [key]: value });
        };
        this.updateMe = (key, value) => {
            this.formErr = initialFormErr;
            if (key === 'fullName') {
                const firstName = value.split(" ")[0];
                const nameArray = value.split(" ");
                nameArray.shift();
                const lastName = nameArray.join(" ");
                this.me = Object.assign(Object.assign({}, this.me), { firstName, lastName });
                return;
            }
            this.me = Object.assign(Object.assign({}, this.me), { [key]: value });
        };
        this.validate = () => {
            const { me } = this;
            let errors = {};
            if (!this.fullName || this.fullName === '') {
                errors = Object.assign(Object.assign({}, errors), { fullName: 'Full name is required' });
            }
            if (!isFullName(this.fullName)) {
                errors = Object.assign(Object.assign({}, errors), { fullName: 'Please enter your full name (first & last name).' });
            }
            if (me.email === '') {
                errors = Object.assign(Object.assign({}, errors), { email: 'Email is required' });
            }
            if (!isEmail(me.email)) {
                errors = Object.assign(Object.assign({}, errors), { email: 'Please enter a valid email address' });
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
        this.validateUpdatePassword = () => {
            const { password, oldPassword } = this.updatePasswordState;
            let errors = {};
            if (oldPassword === '') {
                errors = Object.assign(Object.assign({}, errors), { oldPassword: 'Old password is required' });
            }
            if (password === '') {
                errors = Object.assign(Object.assign({}, errors), { password: 'Password is required' });
            }
            if (password.length < 7) {
                errors = Object.assign(Object.assign({}, errors), { password: 'Password must be at least 7 characters long' });
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
    }
    get fullName() {
        return `${this.me.firstName} ${this.me.lastName}`.trimRight();
    }
    get hasNotFilledOutPasswordFields() {
        return !this.updatePasswordState.oldPassword || !this.updatePasswordState.password;
    }
    get hasNotChangedPersonalInfo() {
        return JSON.stringify(this.me) === JSON.stringify(this.initialMe);
    }
    render() {
        return (h(Host, null, h("ta-card", null, h("ta-form-label", null, "Personal Info"), h("form", { onSubmit: this.onSubmit }, h("ta-input", { onTaInput: (e) => this.updateMe('fullName', e.detail), value: this.fullName, error: this.formErr.fullName, label: "Full Name" }), h("ta-input", { onTaInput: (e) => this.updateMe('email', e.detail), value: this.me.email, error: this.formErr.email, label: "Email" }), h("ta-button", { disabled: this.hasNotChangedPersonalInfo, onTaClick: this.onSubmit, type: "submit", loading: this.updatingUser }, "Update")), h("hr", null), h("ta-form-label", null, "Update Password"), h("form", null, h("ta-input", { onTaInput: (e) => this.updatePasswordField('oldPassword', e.detail), value: this.updatePasswordState.oldPassword, label: "Current Password", error: this.formErr.oldPassword, type: "password" }), h("ta-input", { error: this.formErr.password, value: this.updatePasswordState.password, type: "password", onTaInput: (e) => this.updatePasswordField('password', e.detail), label: "Update Password" }), h("ta-button", { disabled: this.hasNotFilledOutPasswordFields, onTaClick: this.onUpdatePasswordSubmit, loading: this.updatePasswordState.fetchingApi, class: "update-password-btn" }, "Update Password")))));
    }
};
PersonalSettingView.style = personalSettingViewCss;

export { PersonalSettingView as personal_setting_view };
