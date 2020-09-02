import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taDraggerPreviewFileCss = ":host{display:block;height:60px;border-bottom:solid 1px #e5e5e5}:host(.failed){background:red}.preview-file-wrapper{padding:0 20px;height:100%;display:flex;justify-content:space-between;align-items:center}.preview-img{width:30px;height:30px;border:solid 1px #a6b7c7;border-radius:6px;display:flex;justify-content:center;align-items:center}img{width:100%}.preview-info{display:flex;align-items:center}.preview-file-name{margin-left:7px;font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#a6b7c7}";

const TaDraggerPreviewFile = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const { src, name, progress, failed, isImage } = this.file;
        return (h(Host, { class: {
                'preview-file': true,
                'failed': failed
            } }, h("div", { class: "preview-file-wrapper" }, h("div", { class: "preview-info" }, h("div", { class: "preview-img" }, isImage ? h("img", { src: src }) : h("ta-icon", { icon: "files" })), h("div", { class: "preview-file-name" }, name)), h("ta-progress", { size: 30, value: progress }))));
    }
};
TaDraggerPreviewFile.style = taDraggerPreviewFileCss;

export { TaDraggerPreviewFile as ta_dragger_preview_file };
