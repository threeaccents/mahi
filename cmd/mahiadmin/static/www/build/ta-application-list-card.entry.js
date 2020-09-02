import { r as registerInstance, h, c as createEvent, H as Host } from './index-d067c2a6.js';
import './active-router-6e666068.js';
import { i as injectHistory } from './index-2f23714f.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';
import './base-1320a4aa.js';
import './index-16096693.js';
import { A as ApplicationService } from './index-e79621f6.js';
import { t as toastr } from './index-61f3bdea.js';

const taApplicationListCardCss = ":host{display:block;height:58px;background:white;border-radius:12px;box-shadow:0 4px 12px 0 #00000024;background-color:#ffffff;position:relative;cursor:pointer}:host(.create){opacity:.5}:host(:hover){box-shadow:0 6px 12px 0 rgba(0, 0, 0, 0.44)}.wrapper{padding:0 16px;display:flex;justify-content:space-between;align-items:center;height:100%}.left-side{display:flex;align-items:center;height:100%}.icon{width:22px}.name{margin-left:18px;font-size:16px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:#526981}.action-icon{margin-left:18px}.action-icon.plus{font-size:19px;font-weight:100;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;text-align:center;color:#526981}.storage{margin-left:24px;font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#a6b7c7}.subtitle-block{margin-top:4px;width:95px;height:11px;background-color:#c3cbd3}.right-side{display:flex;height:100%;align-items:center;position:relative}a{text-decoration:none}ta-dropdown{--ta-dropdown-background-color:var(--primary-text-color);--ta-dropdown-box-shadow:0 2px 12px 0 rgba(82, 105, 129, 0.25);--ta-dropdown-width:fit-content;--ta-dropdown-padding:10px 8px;--ta-dropdown-transform:translate3d(-165px, 5px, 0);--ta-dropdown-initial-transform:translate3d(-165px, 0, 0px);--ta-dropdown-arrow-color:transparent}.edit-menu-item{font-size:14px;color:white;padding:0 12px;height:32px;cursor:pointer;display:flex;align-items:center;border-radius:3px;white-space:nowrap}.edit-menu-item:hover{background-color:var(--dark-text-color)}ta-modal{--ta-modal-height:300px}.vertical-dots-icon{display:flex;justify-content:center;text-align:center;align-items:center;border-radius:50%;height:28px;width:28px;cursor:pointer}.vertical-dots-icon:hover{background-color:rgba(0, 0, 0, 0.04)}.vertical-dots-icon.active{background-color:rgba(0, 0, 0, 0.04)}.confirm-description{font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.44;letter-spacing:normal;color:#5e738e;margin-top:0px}";

const TaApplicationListCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.deletingApplication = false;
        this.displayConfirmModal = false;
        this.verifyDeleteText = '';
        this.isMenuShown = false;
        this.create = false;
        this.name = () => {
            const { name } = this.application;
            return name.length <= 25 ? name : `${name.substr(0, 22)}...`;
        };
        this.getEditMenu = () => {
            return (h("div", { class: "edit-menu" }, h("div", { class: "edit-menu-item", onClick: this.handleEditApplication }, "Edit application"), h("div", { class: "edit-menu-item", onClick: this.handleDeleteApplication }, "Remove application")));
        };
        this.handleEditApplication = () => {
            this.dropdownEl.close();
            this.history.push(`?applicationId=${this.application.id}#editApplication`, { application: this.application });
        };
        this.handleDeleteApplication = () => {
            this.toggleConfirmModal();
        };
        this.toggleConfirmModal = () => {
            this.verifyDeleteText = '';
            this.displayConfirmModal = !this.displayConfirmModal;
        };
        this.deleteApplication = () => {
            this.deletingApplication = true;
            ApplicationService()
                .delete(this.application.id)
                .then(this.onSuccess)
                .catch(this.onError)
                .finally(() => this.deletingApplication = false);
        };
        this.onSuccess = () => {
            toastr().success('Application was deleted');
            this.toggleConfirmModal();
            this.taApplicationWasDeleted.emit(this.application.id);
        };
        this.onError = (err) => {
            if (err.error) {
                return toastr().danger(err.error);
            }
            toastr().danger('Application failed to delete');
        };
        this.handleInputChange = (e) => {
            this.verifyDeleteText = e.detail;
        };
        this.handleOverlayRendered = (e) => {
            this.isMenuShown = e.detail;
        };
        this.taApplicationWasDeleted = createEvent(this, "taApplicationWasDeleted", 7);
    }
    get confirmDeleteModal() {
        const isBtnDisabled = (this.verifyDeleteText !== this.application.name) || this.deletingApplication;
        return (h("ta-modal", { useDefaultFooter: false, titleText: "Are you absolutely sure?", display: this.displayConfirmModal, onTaClose: this.toggleConfirmModal }, h("div", { class: "confirm-delete-content-wrapper" }, h("p", { class: "confirm-description" }, "This action cannot be undone. This will permanently delete the ", h("strong", null, this.application.name), " application, and remove all files associated with it.", h("br", null), h("br", null), "Please type ", h("strong", null, this.application.name), " to confirm."), h("ta-input", { label: "Application Name", onTaInput: this.handleInputChange, type: "text", value: this.verifyDeleteText }), h("ta-button", { disabled: isBtnDisabled, onTaClick: this.deleteApplication, loading: this.deletingApplication }, "I understand the consequences, delete this application"))));
    }
    render() {
        if (this.create) {
            return (h(Host, { class: {
                    'create': true
                } }, h("div", { class: "wrapper" }, h("div", { class: "left-side" }, h("div", { class: "icon" }, h("ta-icon", { icon: "add-folder" })), h("div", { class: "name" }, "Create Application")), h("div", { class: "right-side" }, h("div", { class: "avatars" }), h("div", { class: "action-icon plus" }, h("ta-icon", { icon: "add" }))))));
        }
        return (h(Host, null, h("stencil-route-link", { url: `/applications/${this.application.id}` }, h("div", { class: "wrapper" }, h("div", { class: "left-side" }, h("div", { class: "icon" }, h("ta-icon", { icon: "folder" })), h("div", { class: "name" }, this.name()), h("div", { class: "storage" }, this.application.storageEngine, " - ", this.application.deliveryUrl)), h("div", { class: "right-side" }, h("ta-dropdown", { onTaOverlayRendered: this.handleOverlayRendered, ref: (el) => this.dropdownEl = el, overlay: this.getEditMenu() }, h("div", { class: {
                'vertical-dots-icon': true,
                'active': this.isMenuShown,
            } }, h("ta-icon", { icon: "vertical-dots" })))))), this.confirmDeleteModal));
    }
};
injectHistory(TaApplicationListCard);
TaApplicationListCard.style = taApplicationListCardCss;

export { TaApplicationListCard as ta_application_list_card };