import { r as registerInstance, h, c as createEvent, H as Host } from './index-d067c2a6.js';

const taBillingCardCss = ":host{--ta-billing-card-margin:10px 0;display:flex;justify-content:space-between;align-items:center;height:58px;background:white;border-radius:12px;box-shadow:0 4px 4px 0 #00000024;padding:0 28px;margin:var(--ta-billing-card-margin);border:solid 2px transparent}:host(.default){border:solid 2px var(--primary-color);}.cards{margin-bottom:30px}ta-dropdown{--ta-dropdown-background-color:var(--primary-text-color);--ta-dropdown-box-shadow:0 2px 12px 0 rgba(82, 105, 129, 0.25);--ta-dropdown-width:fit-content;--ta-dropdown-padding:10px 8px;--ta-dropdown-transform:translate3d(-115px, 5px, 0);--ta-dropdown-initial-transform:translate3d(-115px, 0, 0px);--ta-dropdown-arrow-color:transparent}.edit-menu-item{font-size:14px;color:white;padding:0 12px;height:32px;cursor:pointer;display:flex;align-items:center;border-radius:3px;white-space:nowrap}.edit-menu-item:hover{background-color:var(--dark-text-color)}.number{font-size:16px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:var(--primary-text-color);display:flex;align-items:center}.exp{font-size:12px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#a6b7c7;margin-top:3px}ta-icon{cursor:pointer}.vertical-dots-icon{display:flex;justify-content:center;text-align:center;align-items:center;border-radius:50%;height:28px;width:28px;cursor:pointer}.vertical-dots-icon:hover{background-color:rgba(0, 0, 0, 0.04)}.vertical-dots-icon.active{background-color:rgba(0, 0, 0, 0.04)}";

const TaBillingCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isMenuShown = false;
        this.getEditMenu = () => {
            return (h("div", { class: "edit-menu" }, this.card.isDefault ? null
                : h("div", { class: "edit-menu-item", onClick: this.handleSetDefault }, "Make Default"), h("div", { class: "edit-menu-item", onClick: this.handleDelete }, "Delete Card")));
        };
        this.handleDelete = () => {
            this.dropdownEl.close();
            this.taDeleteClick.emit(this.card.id);
        };
        this.handleSetDefault = () => {
            this.dropdownEl.close();
            this.taSetDefaultClick.emit(this.card.id);
        };
        this.handleOverlayRendered = (e) => {
            this.isMenuShown = e.detail;
        };
        this.taDeleteClick = createEvent(this, "taDeleteClick", 7);
        this.taSetDefaultClick = createEvent(this, "taSetDefaultClick", 7);
    }
    render() {
        return (h(Host, { class: {
                'default': this.card.isDefault
            } }, h("div", { class: "left" }, this.card.brand), h("div", { class: "middle" }, h("div", { class: "number" }, "XXXX-", this.card.lastFour), h("div", { class: "exp" }, this.card.exp)), h("div", { class: "right" }, h("ta-dropdown", { ref: (el) => this.dropdownEl = el, onTaOverlayRendered: this.handleOverlayRendered, overlay: this.getEditMenu() }, h("div", { class: {
                "vertical-dots-icon": true,
                "active": this.isMenuShown,
            } }, h("ta-icon", { icon: "vertical-dots" }))))));
    }
};
TaBillingCard.style = taBillingCardCss;

export { TaBillingCard as ta_billing_card };
