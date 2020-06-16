import { r as registerInstance, h } from './index-d067c2a6.js';

const authViewCss = ".auth-view{display:flex;height:100vh;background:white}.auth-form-wrapper{position:relative;padding-top:4em;padding-bottom:120px;flex:0 0 450px;padding-left:50px;box-sizing:border-box;background:white}.auth-form{margin:0 auto;max-width:270px}.logo{margin-bottom:4em}.auth-image-wrapper{background:url('../../static/auth-bg.svg');background-position:center center;background-repeat:no-repeat;background-size:cover;position:relative;width:100%;height:100%}.auth-image-wrapper:before{background:url('../../static/cloud.svg');content:'';position:absolute;top:60px;left:-25px;z-index:99;width:186px;height:42px}.auth-image-wrapper:after{background:url('../../static/leaf.svg');content:'';position:absolute;bottom:0;left:-25px;z-index:99;width:217px;height:137px}.wave-overlap{height:100%;position:absolute;left:0;top:0;z-index:90}.copyright-text{position:absolute;bottom:84px;left:110px}.copyright-text p{color:var(--primary-text-color);margin:0 auto;font-size:14px}@media (max-width: 600px){.auth-view{overflow-x:hidden;height:86vh}.auth-form-wrapper{position:relative;padding-top:4em;padding-bottom:120px;flex:1;padding-left:50px;padding-right:50px;box-sizing:border-box;background:white}.auth-image-wrapper{display:none}.copyright-text{position:absolute;bottom:84px;left:50px}}";

const AuthView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { class: 'auth-view' }, h("div", { class: 'auth-form-wrapper' }, h("div", { class: 'auth-form' }, h("img", { class: 'logo', src: '../../static/logo.svg', alt: '' }), h("ta-tabs", null, h("ta-tab-header-bar", null, h("ta-tab-header", { tab: "login" }, "Login"), h("ta-tab-header", { tab: "register" }, "Sign Up")), h("ta-tab-body", { tab: "login" }, h("login-tab", { history: this.history })), h("ta-tab-body", { tab: "register" }, h("register-tab", { history: this.history }))))), h("div", { class: 'auth-image-wrapper' }, h("img", { class: 'wave-overlap', src: '../../static/right-wave-overlap.svg', alt: '' })), h("div", { class: "copyright-text" }, h("p", null, "Copyright \u00A9 ", new Date().getFullYear(), " Oriio. All rights reserved."))));
    }
};
AuthView.style = authViewCss;

export { AuthView as auth_view };
