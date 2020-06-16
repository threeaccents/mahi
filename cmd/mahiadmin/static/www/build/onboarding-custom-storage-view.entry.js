import { r as registerInstance, h } from './index-d067c2a6.js';
import { B as BASE_URL } from './index-37baca77.js';
import { p as post } from './base-fd95655b.js';
import { t as toastr } from './index-61f3bdea.js';
import { W as WasabiRegions, A as AWSRegions, D as DoRegions } from './index-3b6bebc6.js';
import { S as SpaceService } from './index-1631ca46.js';

function StorageService() {
    return Object.freeze({
        testStorage(req) {
            return post(`${BASE_URL()}/storages/check`, req);
        }
    });
}

const onboardingCustomStorageViewCss = ".custom-storage-item{width:128px;height:63px;border-radius:6px;box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.14);background-color:#ffffff;margin:10px;display:flex;justify-content:center;align-items:center;cursor:pointer;border:solid 2px #fff}.custom-storage-item.selected{border:solid 2px #fe6e71}.custom-storage-options{display:flex;flex-wrap:wrap}.onboarding-custom-storage-form{overflow-y:auto}ta-input{--ta-input-bg-color:white}ta-select{--ta-select-bg-color:white}";

const initialFormErr = {
    storageSecretKeyErr: '',
    storageBucketErr: '',
    storageAccessKeyErr: '',
    storageRegionErr: '',
    error: '',
};
const initialTestStorageReq = {
    storageEngine: null,
    storageSecretKey: '',
    storageBucket: '',
    storageRegion: '',
    storageAccessKey: '',
};
const OnboardingCustomStorageView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.testStorageReq = initialTestStorageReq;
        this.storageConnectionSuccess = false;
        this.formErr = initialFormErr;
        this.testingConnection = false;
        this.settingStorage = false;
        this.hasVerifiedConnection = false;
        this.updateTestStorageReq = (key, value) => {
            this.formErr = initialFormErr;
            this.testStorageReq = Object.assign(Object.assign({}, this.testStorageReq), { [key]: value });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            const apiAction = this.hasVerifiedConnection ?
                this.setStorage : this.testConnection;
            this.validate()
                .then(apiAction)
                .catch(this.handleValidationErrors);
        };
        this.handleValidationErrors = (errs) => {
            this.formErr = errs;
        };
        this.setStorage = () => {
            this.settingStorage = true;
            const payload = this.testStorageReq;
            SpaceService()
                .setStorage(payload)
                .then(this.onSetStorageSuccess)
                .catch(this.handleError)
                .finally(() => this.settingStorage = false);
        };
        this.onSetStorageSuccess = () => {
            this.history.push(`/dashboard`);
            toastr().success('Welcome to Oriio!');
        };
        this.testConnection = () => {
            this.testingConnection = true;
            StorageService()
                .testStorage(this.testStorageReq)
                .then(this.onTestStorageSuccess)
                .catch(this.handleError)
                .finally(() => this.testingConnection = false);
        };
        this.handleError = (err) => {
            if (!err.error) {
                this.formErr.error = 'Oops! Something went wrong. Please refresh and try again';
                return console.log(err);
            }
            const msg = err.error;
            if (msg.includes('could not upload file')) {
                this.formErr.error = 'Error with connection. Please double check your credentials are correct';
                return console.log(err);
            }
            this.formErr.error = msg;
        };
        this.onTestStorageSuccess = () => {
            this.history.push(`/onboarding/congratulations`);
            toastr().success('Connection is verified!');
        };
        this.validate = () => {
            const { testStorageReq } = this;
            const isNotDefaultEngine = testStorageReq.storageEngine !== 'oriio';
            let errors = {};
            if (isNotDefaultEngine) {
                if (testStorageReq.storageAccessKey === '') {
                    errors = Object.assign(Object.assign({}, errors), { storageAccessKeyErr: 'Access key is required' });
                }
                if (testStorageReq.storageSecretKey === '') {
                    errors = Object.assign(Object.assign({}, errors), { storageSecretKeyErr: 'Secret key is required' });
                }
                if (testStorageReq.storageBucket === '') {
                    errors = Object.assign(Object.assign({}, errors), { storageBucketErr: 'Bucket name is required' });
                }
                if (testStorageReq.storageEngine !== 'b2' && testStorageReq.storageRegion === '') {
                    errors = Object.assign(Object.assign({}, errors), { storageRegionErr: 'Bucket region is required' });
                }
            }
            return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
        };
    }
    getStorageRegions() {
        switch (this.testStorageReq.storageEngine) {
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
    getStorageDetailsForm() {
        const { testStorageReq, formErr } = this;
        const { storageAccessKeyErr, storageSecretKeyErr, storageBucketErr, storageRegionErr } = formErr;
        if (!testStorageReq.storageEngine)
            return;
        return (h("span", null, h("ta-input", { value: testStorageReq.storageAccessKey, label: "API Access Key", onTaInput: (e) => this.updateTestStorageReq('storageAccessKey', e.detail), error: storageAccessKeyErr }), h("ta-input", { type: "password", value: testStorageReq.storageSecretKey, label: "API Secret Key", onTaInput: (e) => this.updateTestStorageReq('storageSecretKey', e.detail), error: storageSecretKeyErr }), h("ta-input", { value: testStorageReq.storageBucket, label: "Bucket Name", onTaInput: (e) => this.updateTestStorageReq('storageBucket', e.detail), error: storageBucketErr }), testStorageReq.storageEngine !== 'b2' ?
            h("ta-select", { value: testStorageReq.storageRegion, onTaSelect: (e) => this.updateTestStorageReq('storageRegion', e.detail), placeholder: "Select Bucket Region", error: storageRegionErr }, this.getStorageRegions().map((item) => (h("ta-select-option", { value: item, label: item.toUpperCase() }))))
            : null));
    }
    render() {
        return (h("onboarding-container", null, h("onboarding-left-side", { mainTitle: "Thank you for joining!", subTitle: "Please complete the onboarding process to get started." }), h("onboarding-right-side", { mainTitle: "Storage Settings", description: "If you need help please check the documentation of your chosen storage, to get details on how to fill out the required field." }, h("div", { class: "onboarding-custom-storage-form" }, h("custom-storage-engine-input", { exceptions: ['oriio'], value: this.testStorageReq.storageEngine, onTaSelect: (e) => this.updateTestStorageReq('storageEngine', e.detail) }), this.getStorageDetailsForm(), !!this.testStorageReq.storageEngine ?
            h("div", null, h("ta-error", { error: this.formErr.error }), h("ta-button", { loading: this.testingConnection, onTaClick: (e) => this.onSubmit(e) }, this.hasVerifiedConnection ? 'Set Storage' : 'Test Connection'))
            : null))));
    }
};
OnboardingCustomStorageView.style = onboardingCustomStorageViewCss;

export { OnboardingCustomStorageView as onboarding_custom_storage_view };
