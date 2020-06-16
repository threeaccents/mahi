import { r as registerInstance, h } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { A as AuthService } from './index-2cb0454e.js';
import { t as toastr } from './index-61f3bdea.js';

const loginTabCss = ".forgot-password-text{width:100%;color:var(--extra-light-text-color);font-size:10px;font-weight:500;text-align:right;margin-top:5px;margin-bottom:24px}.forgot-password-text p{cursor:pointer}ta-input.last{--ta-input-margin-bottom:0}a{text-decoration:none;color:inherit}";

const initialLoginUserModel = {
    email: '',
    password: '',
};
const initialInputError = { emailError: '', passwordError: '' };
const TaLoginTab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fetchingApi = false;
        this.newLoginUser = initialLoginUserModel;
        this.inputError = initialInputError;
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validateLogin()
                .then(this.logInUser)
                .catch(this.handleValidationErrors);
        };
        this.handleValidationErrors = (errs) => {
            this.inputError = errs;
        };
        this.logInUser = () => {
            this.fetchingApi = true;
            const payload = {
                email: this.newLoginUser.email,
                password: this.newLoginUser.password,
            };
            AuthService()
                .authenticate(payload)
                .then(this.onAuthenticateSuccess)
                .catch(this.handleError)
                .finally(this.handleFinally);
        };
        this.onAuthenticateSuccess = (user) => {
            toastr().success('Succesfully logged in!');
            if (user.isAdmin) {
                return this.history.push('/dashboard');
            }
            this.history.push('/applications');
        };
        this.handleError = (err) => {
            if (!err.error) {
                toastr().danger('Oops! Something went wrong. Please refresh and try again');
                return console.log(err);
            }
            toastr().danger(err.error);
        };
        this.handleFinally = () => {
            this.fetchingApi = false;
        };
        this.handleInputChange = (label, e) => {
            this.inputError = initialInputError;
            this.newLoginUser = Object.assign(Object.assign({}, this.newLoginUser), { [label]: e.detail });
        };
        this.validateLogin = () => {
            let errors = {};
            if (this.newLoginUser.email === '') {
                errors = Object.assign(Object.assign({}, errors), { emailError: 'Email is required' });
            }
            if (this.newLoginUser.password == '') {
                errors = Object.assign(Object.assign({}, errors), { passwordError: 'Password is required' });
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
    }
    render() {
        return (h("div", { class: 'login-tab' }, h("ta-form", { onTaSubmit: (e) => this.onSubmit(e) }, h("ta-input", { label: 'Email Address', type: 'text', value: this.newLoginUser.email, error: this.inputError.emailError, onTaInput: (event) => this.handleInputChange('email', event) }), h("ta-input", { class: "last", label: 'Enter Your Password', type: 'password', value: this.newLoginUser.password, error: this.inputError.passwordError, onTaInput: (event) => this.handleInputChange('password', event) }), h("div", { class: 'forgot-password-text' }, h("stencil-route-link", { url: "/forgot-password" }, h("p", null, "Forgot Password?"))), h("ta-button", { loading: this.fetchingApi, onTaClick: this.onSubmit }, "Log In"))));
    }
};
TaLoginTab.style = loginTabCss;

export { TaLoginTab as login_tab };
