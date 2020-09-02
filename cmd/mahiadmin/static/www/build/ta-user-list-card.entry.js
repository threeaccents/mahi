import { r as registerInstance, h, c as createEvent, H as Host } from './index-d067c2a6.js';
import './active-router-6e666068.js';
import { i as injectHistory } from './index-2f23714f.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';
import './base-1320a4aa.js';
import './index-16096693.js';
import { t as toastr } from './index-61f3bdea.js';
import { U as UserService } from './index-25b222b6.js';

const taUserListCardCss = ":host{display:block;height:58px;background:white;border-radius:12px;box-shadow:0 4px 12px 0 #00000024;position:relative}:host(.create){opacity:.5;cursor:pointer}:host(.create:hover){box-shadow:0 6px 12px 0 rgba(0, 0, 0, 0.44)}.wrapper{padding:0 16px;display:flex;justify-content:space-between;align-items:center;height:100%}.left-side{display:flex;align-items:center;height:100%}.icon{width:22px;opacity:.5}.name{margin-left:18px;font-size:16px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:#526981}.action-icon{margin-left:18px}.action-icon.plus{font-size:19px;font-weight:100;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;text-align:center;color:#526981}.admin{margin-left:24px;font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#a6b7c7}.subtitle-block{margin-top:4px;width:95px;height:11px;background-color:#c3cbd3}.right-side{display:flex;height:100%;align-items:center;position:relative}a{text-decoration:none}ta-dropdown{--ta-dropdown-background-color:var(--primary-text-color);--ta-dropdown-box-shadow:0 2px 12px 0 rgba(82, 105, 129, 0.25);--ta-dropdown-width:fit-content;--ta-dropdown-padding:10px 8px;--ta-dropdown-transform:translate3d(-115px, 5px, 0);--ta-dropdown-initial-transform:translate3d(-115px, 0, 0px);--ta-dropdown-arrow-color:transparent}.edit-menu-item{font-size:14px;color:white;padding:0 12px;height:32px;cursor:pointer;display:flex;align-items:center;border-radius:3px;white-space:nowrap}.edit-menu-item:hover{background-color:var(--dark-text-color)}ta-modal{--ta-modal-height:120px}.vertical-dots-icon{display:flex;justify-content:center;text-align:center;align-items:center;border-radius:50%;height:28px;width:28px;cursor:pointer}.vertical-dots-icon:hover{background-color:rgba(0, 0, 0, 0.04)}.vertical-dots-icon.active{background-color:rgba(0, 0, 0, 0.04)}";

const TaUserListCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.displayConfirmModal = false;
        this.deletingUser = false;
        this.isMenuShown = false;
        this.create = false;
        this.toggleConfirmModal = () => {
            this.displayConfirmModal = !this.displayConfirmModal;
        };
        this.deleteUser = () => {
            UserService()
                .deleteUser(this.user.id)
                .then(this.onSuccess)
                .catch(this.onError)
                .finally(() => this.deletingUser = false);
        };
        this.onSuccess = () => {
            toastr().success('User was deleted');
            this.toggleConfirmModal();
            this.taUserWasDeleted.emit(this.user.id);
        };
        this.onError = (err) => {
            if (err.error) {
                return toastr().danger(err.error);
            }
            toastr().danger('User failed to delete');
        };
        this.handleEditUser = () => {
            this.dropdownEl.close();
            this.history.push(`?userId=${this.user.id}#editUser`, { user: this.user });
        };
        this.handleDeleteUser = () => {
            this.toggleConfirmModal();
        };
        this.getEditMenu = () => {
            return (h("div", { class: "edit-menu" }, h("div", { class: "edit-menu-item", onClick: this.handleEditUser }, "Edit user"), h("div", { class: "edit-menu-item", onClick: this.handleDeleteUser }, "Remove user")));
        };
        this.handleOverlayRendered = (e) => {
            this.isMenuShown = e.detail;
        };
        this.taUserWasDeleted = createEvent(this, "taUserWasDeleted", 7);
    }
    get fullName() {
        const { firstName, lastName } = this.user;
        const fullName = `${firstName} ${lastName}`;
        return fullName.length <= 25 ? fullName : `${fullName.substr(0, 22)}...`;
    }
    get confirmDeleteModal() {
        return (h("ta-modal", { titleText: `Delete ${this.fullName}`, bodyText: "Are you sure you want to delete this user?", confirmBtnText: "Delete", display: this.displayConfirmModal, onTaClose: this.toggleConfirmModal, onTaSubmit: this.deleteUser, loading: this.deletingUser }));
    }
    render() {
        if (this.create) {
            return (h(Host, { class: {
                    'create': true
                } }, h("div", { class: "wrapper" }, h("div", { class: "left-side" }, h("div", { class: "icon" }, h("ta-icon", { icon: "add-person" })), h("div", { class: "name" }, "Create User")), h("div", { class: "right-side" }, h("div", { class: "avatars" }), h("div", { class: "action-icon plus" }, h("ta-icon", { icon: "add" }))))));
        }
        return (h(Host, null, h("div", { class: "wrapper" }, h("div", { class: "left-side" }, h("div", { class: "avatar" }, h("ta-avatar", { text: this.fullName })), h("div", { class: "name" }, this.fullName), h("div", { class: "admin" }, this.user.isAdmin ? 'Administrator' : '')), h("div", { class: "right-side" }, h("ta-dropdown", { onTaOverlayRendered: this.handleOverlayRendered, ref: (el) => this.dropdownEl = el, overlay: this.getEditMenu() }, h("div", { class: {
                "vertical-dots-icon": true,
                "active": this.isMenuShown,
            } }, h("ta-icon", { icon: "vertical-dots" }))))), this.confirmDeleteModal));
    }
};
injectHistory(TaUserListCard);
TaUserListCard.style = taUserListCardCss;

export { TaUserListCard as ta_user_list_card };
