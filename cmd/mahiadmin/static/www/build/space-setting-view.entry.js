import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import { m as me, a as isEmail } from './index-d97fcc51.js';
import { a as patch } from './base-1320a4aa.js';
import { B as BASE_URL } from './index-16096693.js';
import { t as toastr } from './index-61f3bdea.js';

function SpaceService() {
    return Object.freeze({
        setStorage(req) {
            return patch(`${BASE_URL()}/spaces`, req);
        },
        update(email) {
            return patch(`${BASE_URL()}/spaces`, { email });
        }
    });
}

const spaceSettingViewCss = ":host{display:block}ta-button{--ta-button-width:150px}";

const initialFormErr = {
    email: '',
    serverError: '',
};
const SpaceSettingView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.initialSpace = me().space;
        this.space = this.initialSpace;
        this.updatingSpace = false;
        this.formErr = initialFormErr;
        this.onSubmit = (e) => {
            e.preventDefault();
            this.validate()
                .then(this.updateSpace)
                .catch((err) => this.formErr = err)
                .finally(() => this.updatingSpace = false);
        };
        this.updateSpace = () => {
            this.updatingSpace = true;
            return SpaceService()
                .update(this.space.email)
                .then(this.handleSuccess)
                .catch(this.handleError);
        };
        this.handleSuccess = (resp) => {
            const authUser = me();
            authUser.space = resp.data;
            localStorage.setItem('me', JSON.stringify(authUser));
            toastr().success('space was updated');
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
            toastr().danger(msg);
        };
        this.validate = () => {
            const { space } = this;
            let errors = {};
            if (space.email === '') {
                errors = Object.assign(Object.assign({}, errors), { email: 'Email is required' });
            }
            if (!isEmail(space.email)) {
                errors = Object.assign(Object.assign({}, errors), { email: 'Please enter a valid email address' });
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
        this.handleUpdateSpace = (key, value) => {
            this.formErr = initialFormErr;
            this.space = Object.assign(Object.assign({}, this.space), { [key]: value });
        };
    }
    get hasNotUpdatedSpace() {
        return JSON.stringify(this.initialSpace) === JSON.stringify(this.space);
    }
    render() {
        return (h(Host, null, h("ta-card", null, h("ta-form-label", null, "Space"), h("form", null, h("ta-input", { type: "email", label: "Email", value: this.space.email, onTaInput: (e) => this.handleUpdateSpace('email', e.detail) }), h("ta-button", { disabled: this.hasNotUpdatedSpace, loading: this.updatingSpace, onTaClick: this.onSubmit }, "Update")))));
    }
};
SpaceSettingView.style = spaceSettingViewCss;

export { SpaceSettingView as space_setting_view };
