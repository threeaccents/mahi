import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';

const customStorageEngineInputCss = ":host{display:block}.storage-options-wrapper{display:flex;flex-wrap:wrap}.storage-option-item{width:145px;height:60px;display:flex;justify-content:center;align-items:center;border-radius:6px;box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);background-color:#ffffff;margin-bottom:20px;margin-right:12px;cursor:pointer;border:solid 2px transparent}.storage-option-item ta-icon{height:var(--ta-icon-height, 20px)}.storage-option-item.selected{box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.14);border:solid 2px var(--primary-color)}@media only screen and (max-width: 768px){.storage-options-wrapper{display:flex;flex-wrap:wrap;justify-content:center}.storage-option-item{margin:0 6px;margin-bottom:20px}}";

const CustomStorageEngineInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.exceptions = [];
        this.handleSelectOption = (value) => {
            this.taSelect.emit(value);
        };
        this.isException = (value) => {
            return this.exceptions.some((e) => e && e === value);
        };
        this.taSelect = createEvent(this, "taSelect", 7);
    }
    render() {
        const { value } = this;
        return (h(Host, null, h("div", { class: "storage-options-wrapper" }, !this.isException('wasabi') ?
            h("div", { onClick: () => this.handleSelectOption('wasabi'), class: {
                    "storage-option-item": true,
                    "selected": value === 'wasabi'
                } }, h("img", { src: '../../assets/wasabi-logo.jpg', alt: 'Wasabi' }))
            : null, !this.isException('s3') ?
            h("div", { onClick: () => this.handleSelectOption('s3'), class: {
                    "storage-option-item": true,
                    "selected": value === 's3'
                } }, h("img", { src: '../../assets/aws-logo.jpg', alt: 'AWS s3' }))
            : null, !this.isException('digital_ocean') ?
            h("div", { onClick: () => this.handleSelectOption('digital_ocean'), class: {
                    "storage-option-item": true,
                    "selected": value === 'digital_ocean'
                } }, h("img", { src: '../../assets/digital-ocean-logo.jpg', alt: 'DigitalOcean' }))
            : null, !this.isException('b2') ?
            h("div", { onClick: () => this.handleSelectOption('b2'), class: {
                    "storage-option-item": true,
                    "selected": value === 'b2'
                } }, h("img", { src: '../../assets/backblaze-logo.jpg', alt: 'BackBlaze' }))
            : null)));
    }
};
CustomStorageEngineInput.style = customStorageEngineInputCss;

export { CustomStorageEngineInput as custom_storage_engine_input };
