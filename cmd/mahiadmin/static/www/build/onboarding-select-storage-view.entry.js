import { r as registerInstance, h } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import { t as toastr } from './index-61f3bdea.js';
import { S as SpaceService } from './index-1631ca46.js';

const onboardingSelectStorageViewCss = ".storage-option-item{height:74px;border-radius:6px;box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.14);background-color:#ffffff;display:flex;margin-top:15px;cursor:pointer;padding-right:30px}.storage-option-item:hover{box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.34)}.storage-option-item-icon{display:flex;justify-content:center;align-items:center;width:85px}.storage-option-item-title{height:100%;display:flex;flex-direction:column;justify-content:center}.storage-option-item-title h3{margin:0;font-size:16px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:#526981}.storage-option-item-title p{margin:0;margin-top:5px;font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#526981}.storage-option-item-select-icon{display:flex;align-items:center;flex:1;justify-content:flex-end}";

const OnboardingSelectStorageView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    selectStorage(storage) {
        if (storage === 'custom') {
            return this.history.push('/onboarding/custom-storage');
        }
        this.setOriioStorage();
    }
    setOriioStorage() {
        SpaceService()
            .setStorage({ storageEngine: 'oriio' })
            .then(() => {
            toastr().success('Storage was set!');
            this.history.push('/onboarding/congratulations');
        }).catch((err) => {
            if (!err.error) {
                toastr().danger('Oops something went wrong. Pleasre refresh and try again.');
                return console.log(err);
            }
            toastr().danger(err.error);
        });
    }
    render() {
        return (h("onboarding-container", null, h("onboarding-left-side", { mainTitle: "Thank you for joining!", subTitle: "Please complete the onboarding process to get started." }), h("onboarding-right-side", { mainTitle: "Choose your type of storage", description: "In order for you to start storing files we must setup your storage. You have the option to use your own personal storage or let us handle your storage for you." }, h("div", { class: "storage-options" }, h("div", { onClick: () => this.selectStorage('oriio'), class: "storage-option-item" }, h("div", { class: "storage-option-item-icon" }, h("ta-icon", { icon: "storage-disks" })), h("div", { class: "storage-option-item-title" }, h("h3", null, "Use Oriio Storage"), h("p", null, "We provide the best rates around.")), h("div", { class: "storage-option-item-select-icon" }, h("ta-icon", { icon: "long-arrow-right" }))), h("div", { onClick: () => this.selectStorage('custom'), class: "storage-option-item" }, h("div", { class: "storage-option-item-icon" }, h("ta-icon", { icon: "personal-storage-disks" })), h("div", { class: "storage-option-item-title" }, h("h3", null, "Use Custom Storage"), h("p", null, "AWS s3, DigitalOcean, backblaze, Wasabi.")), h("div", { class: "storage-option-item-select-icon" }))))));
    }
};
OnboardingSelectStorageView.style = onboardingSelectStorageViewCss;

export { OnboardingSelectStorageView as onboarding_select_storage_view };
