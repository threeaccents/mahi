import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { A as AuthService } from './index-2cb0454e.js';
import { a as isEmail } from './validation-9a44dfe6.js';
import './auth-d1cdc736.js';
import './index-fb199afa.js';
import { t as toastr } from './index-61f3bdea.js';

const forgotPasswordCss = ":host{display:block}.auth-view{display:flex;height:100vh;background:white;flex-direction:row-reverse}.auth-form-wrapper{position:relative;padding-top:4em;padding-bottom:120px;flex:0 0 450px;padding-left:50px;box-sizing:border-box;background:white}.auth-form{margin:0 auto;max-width:270px}.logo{margin-bottom:4em}.auth-image-wrapper{background:url('../../static/auth-bg.svg');background-position:center center;background-repeat:no-repeat;background-size:cover;position:relative;width:100%;height:100%}.auth-image-wrapper:before{background:url('../../static/cloud.svg');content:'';position:absolute;top:60px;left:-25px;z-index:99;width:186px;height:42px}.auth-image-wrapper:after{background:url('../../static/leaf.svg');content:'';position:absolute;bottom:0;left:-25px;z-index:99;width:217px;height:137px}.wave-overlap{height:100%;position:absolute;left:0;top:0;z-index:90}.copyright-text{position:absolute;bottom:84px;right:60px}.copyright-text p{color:var(--primary-text-color);margin:0 auto;font-size:14px}@media (max-width: 600px){.auth-view{overflow-x:hidden;height:86vh}.auth-form-wrapper{position:relative;padding-top:4em;padding-bottom:120px;flex:1;padding-left:50px;padding-right:50px;box-sizing:border-box;background:white}.auth-image-wrapper{display:none}.copyright-text{position:absolute;bottom:84px;left:50px}}.forgot-password-text{width:100%;color:var(--extra-light-text-color);font-size:10px;font-weight:500;text-align:right;margin-top:5px;margin-bottom:24px}.forgot-password-text p{cursor:pointer}ta-input{--ta-input-margin-bottom:0}a{text-decoration:none;color:inherit}";

const ForgotPassword = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.email = '';
        this.fetchingApi = false;
        this.onSubmit = (e) => {
            e.preventDefault();
            this.fetchingApi = true;
            AuthService()
                .passwordResetRequest(this.email)
                .then(() => {
                this.email = '';
                toastr().success('Password reset successfully requested! Please check your email.');
            })
                .catch(() => {
                toastr().danger('Oops it seems something went wrong. Please try again later.');
            })
                .finally(() => this.fetchingApi = false);
        };
    }
    get canSubmit() {
        return this.email
            && this.email != ''
            && isEmail(this.email);
    }
    render() {
        return (h(Host, null, h("div", { class: 'auth-view' }, h("div", { class: 'auth-form-wrapper' }, h("div", { class: 'auth-form' }, h("img", { class: 'logo', src: '../../static/logo.svg', alt: '' }), h("ta-form", { onTaSubmit: this.onSubmit }, h("ta-input", { label: 'Email Address', type: 'text', value: this.email, onTaInput: (e) => this.email = e.detail }), h("div", { class: 'forgot-password-text' }, h("stencil-route-link", { url: "/auth" }, h("p", null, "Back to login?"))), h("ta-button", { disabled: !this.canSubmit, loading: this.fetchingApi, onTaClick: this.onSubmit }, "Submit")))), h("div", { class: 'auth-image-wrapper' }), h("div", { class: "copyright-text" }, h("p", null, "Copyright \u00A9 ", new Date().getFullYear(), " Oriio. All rights reserved.")))));
    }
};
ForgotPassword.style = forgotPasswordCss;

export { ForgotPassword as forgot_password_view };
