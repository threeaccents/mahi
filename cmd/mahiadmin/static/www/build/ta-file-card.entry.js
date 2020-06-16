import { r as registerInstance, h, c as createEvent, H as Host } from './index-d067c2a6.js';
import './index-37baca77.js';
import './base-fd95655b.js';
import './validation-9a44dfe6.js';
import './auth-d1cdc736.js';
import { c as copyToClipboard, l as limitLen, f as formatBytes } from './index-fb199afa.js';
import { t as toastr } from './index-61f3bdea.js';
import { F as FileService } from './index-a87448f4.js';

const taFileCardCss = ":host{position:relative;display:flex;flex-direction:column;justify-content:space-between;border-radius:6px;height:210px;box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14)}.names{display:flex;flex-direction:row;justify-content:space-between}.no-image{height:100%;position:relative;border-radius:6px 6px 0 0;display:flex;justify-content:center;align-items:center}.file-card-image{height:100%;border-radius:6px 6px 0 0;background-size:cover;background-position:center;position:relative;display:flex;justify-content:center;align-items:center;background-repeat:no-repeat}.file-card-image.default-img{background-size:initial;background-repeat:no-repeat}.image-details{display:flex;flex-direction:column;background-color:white;border-top:solid 1px var(--light-border-color);border-bottom:solid 1px var(--light-border-color);border-radius:0 0 6px 6px;padding:0 4px;justify-content:space-around;min-height:50px}.details{display:flex;flex-direction:column;background-color:white;border-top:solid 1px var(--light-border-color);border-bottom:solid 1px var(--light-border-color);height:auto;border-radius:0 0 6px 6px;padding:0 4px;justify-content:space-around;min-height:50px}.tags{display:flex;flex-wrap:nowrap;justify-content:flex-start;width:100px;overflow-x:scroll;-ms-overflow-style:none}.tags::-webkit-scrollbar{display:none}.tag{padding:2px;font-size:12px;color:white;background-color:var(--primary-text-color);border-radius:3px;margin-left:2px;white-space:nowrap}.file-name{font-size:14px;color:var(--primary-text-color)}.other-details{height:15px;display:flex;flex-direction:row;justify-content:space-between;font-size:12px;color:var(--light-text-color)}.overlay{position:absolute;top:0;right:0;left:0;bottom:0;background-color:rgba(0, 0, 0, 0.4);opacity:0;border-radius:6px 6px 0 0}.control-icon{display:flex;justify-content:center;text-align:center;align-items:center;border-radius:50%;height:28px;width:28px}.control-icon:hover{background-color:white}.control-icon ta-icon{cursor:pointer}:host(:hover) .overlay{opacity:1;transition:opacity 0.3s}.controls{position:absolute;bottom:4px;right:10px;opacity:0;display:flex;flex-direction:row;justify-content:space-between;align-items:center}:host(:hover) .controls{opacity:1;transition:opacity 0.4s}ta-icon{--ta-icon-fill:#fff;--ta-icon-width:14px;--ta-icon-height:14px}ta-icon:hover{--ta-icon-fill:var(--primary-color)}ta-modal{--ta-modal-height:120px}";

const DEFAULT_BK_IMG = `url('../../../assets/file.svg')`;
const TaFileCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.displayConfirmModal = false;
        this.deletingFile = false;
        this.onCopyClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            copyToClipboard(this.file.url);
            toastr().success('File link copied to clipboard');
        };
        this.onDeleteClick = () => {
            this.toggleConfirmModal();
        };
        this.onSuccess = () => {
            toastr().success('File was deleted');
            this.toggleConfirmModal();
            this.taFileWasDeleted.emit(this.file);
        };
        this.onError = (err) => {
            if (err.error) {
                toastr().danger(err.error);
                return;
            }
            toastr().danger('Error deleting file');
        };
        this.getTags = (tags) => {
            return tags.map((t) => {
                return (h("span", { class: "tag" }, t));
            });
        };
        this.toggleConfirmModal = () => {
            this.displayConfirmModal = !this.displayConfirmModal;
        };
        this.deleteFile = () => {
            this.deletingFile = true;
            FileService()
                .delete(this.file.id)
                .then(this.onSuccess)
                .catch(this.onError)
                .finally(() => this.deletingFile = false);
        };
        this.taFileWasDeleted = createEvent(this, "taFileWasDeleted", 7);
    }
    get backgroundImg() {
        const { file } = this;
        return file.dataUrl ? `url(${file.dataUrl})` : `url(${this.file.url}?width=450)`;
    }
    get fileImg() {
        const { file } = this;
        return file.dataUrl ? file.dataUrl : `${this.file.url}?width=240`;
    }
    get shouldPreview() {
        return this.file.mimeType === "image";
    }
    get tags() {
        return this.file.tags.join(", ");
    }
    get confirmDeleteModal() {
        return (h("ta-modal", { titleText: `Delete ${this.file.fileName}`, bodyText: "Are you sure you want to delete this file?", confirmBtnText: "Delete", display: this.displayConfirmModal, onTaClose: this.toggleConfirmModal, onTaSubmit: this.deleteFile, loading: this.deletingFile }));
    }
    render() {
        return (h(Host, null, h("div", { class: {
                'file-card-image': true,
                'default-img': !this.shouldPreview
            }, style: {
                backgroundImage: this.shouldPreview ? this.backgroundImg : DEFAULT_BK_IMG
            } }, h("div", { class: "overlay" }), h("div", { class: "controls" }, h("div", { class: "control-icon" }, h("ta-icon", { onTaClick: this.onCopyClick, icon: "copy" })), h("div", { class: "control-icon" }, h("ta-icon", { onTaClick: this.onDeleteClick, icon: "trash" })))), h("div", { class: "image-details" }, h("div", { class: "names" }, h("ta-tooltip", { text: this.file.fileName }, h("div", { class: "file-name" }, limitLen(this.file.fileName, 12))), h("ta-tooltip", { text: this.tags }, h("div", { class: "" }), h("div", { class: "tags" }, this.getTags(this.file.tags)))), h("div", { class: "other-details" }, h("div", { class: "type" }, this.file.extension.toUpperCase()), h("div", { class: "file-size" }, `${formatBytes(this.file.size, 1)}`))), this.confirmDeleteModal));
    }
};
TaFileCard.style = taFileCardCss;

export { TaFileCard as ta_file_card };
