import { r as registerInstance, h, c as createEvent, H as Host } from './index-d067c2a6.js';

const taTextareaCss = ":host{display:block;margin-bottom:var(--ta-textarea-margin-bottom, 16px)}.ta-textarea{position:relative}label{display:block;position:absolute;padding-left:10px;padding-top:10px;color:var(--extra-light-text-color);transition:all 300ms;font-size:14px;font-weight:500}.textarea-error-message{font-size:14px;font-weight:500;color:var(--primary-error-color)}.ta-textarea.has-error textarea{border:solid 2px var(--primary-error-color)}.ta-textarea.has-error label{color:var(--primary-error-color)}textarea{border:solid 2px var(--light-border-color);border-radius:var(--border-radius);box-sizing:border-box;width:100%;font-size:14px;padding:10px 10px;padding-right:20px;color:var(--primary-text-color);background-color:rgba(226, 230, 239, 0.4)}textarea:focus{outline:none}.is-active textarea{padding-bottom:5px;padding-top:15px}.is-active label{padding-top:5px;font-size:12px}";

const TextArea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isFocused = false;
        this.value = '';
        this.label = '';
        this.error = '';
        this.rows = 4;
        this.handleFocus = (isFocused) => {
            this.isFocused = isFocused;
        };
        this.handleLabelClick = (e) => {
            e.preventDefault();
            this.textArea.focus();
        };
        this.displayError = () => {
            if (!this.error || this.error === '')
                return;
            return (h("div", { class: "textarea-error-message" }, this.error));
        };
        this.isActive = () => {
            return this.value !== '' || this.isFocused;
        };
        this.taInput = createEvent(this, "taInput", 7);
    }
    render() {
        return (h(Host, null, h("div", { class: {
                'is-active': this.isActive(),
                'has-error': this.error !== '',
                'ta-textarea': true
            } }, h("label", { onClick: this.handleLabelClick }, this.label), h("textarea", { rows: this.rows, value: this.value, onInput: (e) => this.taInput.emit(e.target.value), onFocus: () => this.handleFocus(true), onBlur: () => this.handleFocus(false), ref: el => this.textArea = el }), this.displayError())));
    }
};
TextArea.style = taTextareaCss;

export { TextArea as ta_textarea };
