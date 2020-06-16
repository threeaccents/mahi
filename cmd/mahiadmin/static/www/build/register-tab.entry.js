import { r as registerInstance, h } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { A as AuthService } from './index-2cb0454e.js';
import { a as isEmail } from './validation-9a44dfe6.js';
import { t as toastr } from './index-61f3bdea.js';
import { U as UserService } from './index-8346a309.js';
import { a as initialNewSuperUserModel } from './index-3732701a.js';

const initialFormError = { spaceError: '', fullNameError: '', emailError: '', passwordError: '' };
const RegisterTab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.newSuperUser = initialNewSuperUserModel;
        this.fetchingApi = false;
        this.formError = initialFormError;
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validateRegister()
                .then(this.registerUser)
                .catch(this.handleValidationErrors);
        };
        this.handleValidationErrors = (errs) => {
            this.formError = errs;
        };
        this.registerUser = () => {
            this.fetchingApi = true;
            const nameArray = this.newSuperUser.fullName.split(' ');
            const firstName = nameArray[0];
            const lastName = nameArray[1] ? nameArray[1] : '';
            const payload = {
                firstName,
                lastName,
                spaceName: this.newSuperUser.space,
                email: this.newSuperUser.email,
                password: this.newSuperUser.password,
            };
            UserService()
                .createSuperUser(payload)
                .then(this.logInUser)
                .catch(this.handleError)
                .finally(this.handleFinally);
        };
        this.logInUser = () => {
            this.fetchingApi = true;
            const payload = {
                email: this.newSuperUser.email,
                password: this.newSuperUser.password,
            };
            AuthService()
                .authenticate(payload)
                .then(this.onAuthenticateSuccess)
                .catch(this.handleError)
                .finally(this.handleFinally);
        };
        this.onAuthenticateSuccess = () => {
            toastr().success('Registration successful! Welcome to Oriio!');
            this.history.push('/dashboard');
        };
        this.handleError = (err) => {
            if (!err.error) {
                toastr().danger('Oops! Something went wrong. Please refresh and try again');
                return console.log(err);
            }
            const msg = err.error;
            if (msg.includes('space name is taken')) {
                this.formError = Object.assign(Object.assign({}, this.formError), { spaceError: 'Space name is taken' });
                return;
            }
            if (msg.includes('email is taken')) {
                this.formError = Object.assign(Object.assign({}, this.formError), { emailError: 'Email is taken' });
                return;
            }
            toastr().danger(msg);
        };
        this.handleFinally = () => {
            this.fetchingApi = false;
        };
        this.handleInputChange = (label, e) => {
            this.formError = initialFormError;
            this.newSuperUser = Object.assign(Object.assign({}, this.newSuperUser), { [label]: e.detail });
        };
        this.validateRegister = () => {
            let errors = {};
            if (this.newSuperUser.space === '') {
                errors = Object.assign(Object.assign({}, errors), { spaceError: 'Space is required' });
            }
            if (this.newSuperUser.fullName === '') {
                errors = Object.assign(Object.assign({}, errors), { fullNameError: 'Full name is required' });
            }
            if (this.newSuperUser.fullName.split(' ').length < 2) {
                errors = Object.assign(Object.assign({}, errors), { fullNameError: 'Please provide a first and last name' });
            }
            if (!isEmail(this.newSuperUser.email)) {
                errors = Object.assign(Object.assign({}, errors), { emailError: 'Email is invalid' });
            }
            if (this.newSuperUser.email === '') {
                errors = Object.assign(Object.assign({}, errors), { emailError: 'Email is required' });
            }
            if (this.newSuperUser.password.length < 7) {
                errors = Object.assign(Object.assign({}, errors), { passwordError: 'Password must be at least 7 characters long' });
            }
            if (this.newSuperUser.password == '') {
                errors = Object.assign(Object.assign({}, errors), { passwordError: 'Password is required' });
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
    }
    render() {
        return (h("div", { class: 'register-tab' }, h("ta-form", { onTaSubmit: (e) => this.onSubmit(e) }, h("ta-input", { label: 'Space Name', type: 'text', value: this.newSuperUser.space, error: this.formError.spaceError, onTaInput: (event) => this.handleInputChange('space', event) }), h("ta-input", { label: 'Full Name', type: 'text', value: this.newSuperUser.fullName, error: this.formError.fullNameError, onTaInput: (event) => this.handleInputChange('fullName', event) }), h("ta-input", { label: 'Email Address', type: 'email', value: this.newSuperUser.email, error: this.formError.emailError, onTaInput: (event) => this.handleInputChange('email', event) }), h("ta-input", { label: 'Enter Your Password', type: 'password', value: this.newSuperUser.password, onTaInput: (event) => this.handleInputChange('password', event), error: this.formError.passwordError }), h("ta-button", { loading: this.fetchingApi, onTaClick: this.onSubmit }, "Register"))));
    }
};

export { RegisterTab as register_tab };
