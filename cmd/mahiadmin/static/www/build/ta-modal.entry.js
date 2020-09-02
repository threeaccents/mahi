import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';

const taModalCss = ".modal-wrapper{position:fixed;z-index:99999;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#1c293680}.modal-content{background:var(--ta-modal-background, #fff);margin:auto;margin-top:var(--ta-modal-margin-top, auto);padding:var(--ta-modal-padding, 20px);width:var(--ta-modal-width, 420px);max-width:100vw;border-radius:6px;height:var(--ta-modal-height, 220px);max-height:100vh;overflow-y:var(--ta-modal-overflow, visible);-webkit-box-shadow:var(--ta-modal-box-shadow, 0 2px 6px 0 rgba(7, 135, 235, 0.16));box-shadow:var(--ta-modal-box-shadow, 0 2px 6px 0 rgba(7, 135, 235, 0.16));position:relative}.modal-header{display:flex;justify-content:flex-end;align-items:center;height:15% x}.modal-body{display:flex;flex-direction:column;justify-content:center}.modal-title-text{font-size:14px;font-weight:bold}.modal-title-text{font-size:16px;font-weight:bold;color:var(--primary-text-color);margin-bottom:8px}.body-text{font-size:15px;font-weight:500;color:var(--dark-text-color);margin-bottom:8px}.modal-footer{height:15%;display:flex;justify-content:flex-end;align-items:center}.buttons{display:flex;flex-direction:row;align-items:center}.close-icon{font-size:24px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;text-align:center;color:var(--light-text-color);cursor:pointer}ta-icon{--ta-icon-fill:#c3cbd3}ta-button{--ta-button-width:100px;--ta-button-hover-box-shadow:inherit;--ta-button-hover-translate:none}ta-button:nth-child(1){--ta-button-hover-box-shadow:none;margin-right:20px}@media (max-width: 400px){.modal-content{background:var(--ta-modal-background, #fff);margin:auto;margin-top:var(--ta-modal-margin-top, auto);padding:var(--ta-modal-padding, 20px);width:var(--ta-modal-mobile-width, 320px);max-width:100vw;border-radius:6px;height:var(--ta-modal-height, 220px);max-height:100vh;overflow-y:var(--ta-modal-overflow, visible);-webkit-box-shadow:var(--ta-modal-box-shadow, 0 2px 6px 0 rgba(7, 135, 235, 0.16));box-shadow:var(--ta-modal-box-shadow, 0 2px 6px 0 rgba(7, 135, 235, 0.16));position:relative}}";

const TaModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.loading = false;
        this.titleText = '';
        this.bodyText = '';
        this.confirmBtnText = 'Confirm';
        this.cancelBtnText = 'Cancel';
        this.display = false;
        this.useDefaultFooter = true;
        this.taClose = createEvent(this, "taClose", 7);
        this.taSubmit = createEvent(this, "taSubmit", 7);
    }
    render() {
        if (!this.display)
            return null;
        return (h(Host, null, h("div", { class: "modal-wrapper" }, h("div", { class: "modal-content" }, h("div", { class: "modal-header" }, h("div", { class: "close-icon", onClick: () => this.taClose.emit() }, h("ta-icon", { icon: "close" }))), h("div", { class: "modal-body" }, h("div", { class: "modal-title-text" }, this.titleText), h("div", { class: "body-text" }, this.bodyText), h("slot", null)), this.useDefaultFooter ?
            h("div", { class: "modal-footer" }, h("div", { class: "buttons" }, h("ta-button", { color: "white", onClick: () => this.taClose.emit() }, "Cancel"), h("ta-button", { loading: this.loading, onClick: () => this.taSubmit.emit() }, "Delete"))) : null))));
    }
};
TaModal.style = taModalCss;

export { TaModal as ta_modal };
