import { r as registerInstance, h, c as createEvent, H as Host } from './index-d067c2a6.js';

const taInputCss = ":host{display:block;margin-bottom:var(--ta-input-margin-bottom, 16px)}.ta-input{position:relative}label{display:block;position:absolute;padding-left:10px;padding-top:12px;color:var(--extra-light-text-color);transition:all 300ms;font-size:14px;font-weight:500}.input-error-message{font-size:14px;font-weight:500;color:var(--primary-error-color)}.ta-input.has-error input{border:solid 2px var(--primary-error-color)}.ta-input.has-error label{color:var(--primary-error-color)}input{border:solid 2px var(--light-border-color);border-radius:var(--border-radius);box-sizing:border-box;width:100%;font-size:14px;padding:10px 10px;padding-right:20px;color:var(--primary-text-color);background-color:var(--ta-input-bg-color, var(--primary-input-bg-color))}input:focus{outline:none}.is-active input{padding-bottom:5px;padding-top:15px}.is-active label{padding-top:5px;font-size:12px}.cleartext-toggle{position:absolute;right:18px;cursor:pointer;width:10px;display:flex;justify-content:center;align-items:center;top:10px}.cleartext-toggle svg{width:15px;height:15px}.spin-icon{position:absolute;margin:auto;width:15px;height:15px;top:12px;right:20px;border:solid 2px #fff;border-top-color:#ff3b3b;border-left-color:#ff3b3b;border-right-color:#ff3b3b;border-radius:20px;animation:loading-spinner 500ms linear infinite}@keyframes loading-spinner{0%{transform:rotate(0deg);transform:rotate(0deg)}100%{transform:rotate(360deg);transform:rotate(360deg)}}";

const TaInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isFocused = false;
        this.showCleartext = false;
        this.value = '';
        this.label = '';
        this.type = 'text';
        this.error = '';
        this.loading = false;
        this.disabled = false;
        this.handleFocus = (isFocused) => {
            this.isFocused = isFocused;
        };
        this.handleLabelClick = (e) => {
            e.preventDefault();
            this.textInput.focus();
        };
        this.displayError = () => {
            if (!this.error || this.error === '')
                return;
            return (h("div", { class: "input-error-message" }, this.error));
        };
        this.isActive = () => {
            return this.value !== '' || this.isFocused;
        };
        this.taInput = createEvent(this, "taInput", 7);
    }
    render() {
        return (h(Host, null, h("div", { class: {
                'is-active': this.isActive(),
                'has-error': !!this.error,
                'ta-input': true
            } }, h("label", { onClick: this.handleLabelClick }, this.label), h("input", { disabled: this.disabled, type: this.showCleartext ? 'text' : this.type, value: this.value, onInput: (e) => this.taInput.emit(e.target.value), onFocus: () => this.handleFocus(true), onBlur: () => this.handleFocus(false), ref: el => this.textInput = el }), this.loading ? h("div", { class: "spin-icon" }) : null, this.type === 'password' ?
            h("div", { onClick: () => this.showCleartext = !this.showCleartext, class: "cleartext-toggle" }, this.showCleartext ? h("ta-icon", { icon: "eye-closed" }) : h("ta-icon", { icon: "eye-open" }))
            : null, this.displayError())));
    }
};
TaInput.style = taInputCss;

export { TaInput as ta_input };
