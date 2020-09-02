import { r as registerInstance, c as createEvent, h } from './index-d067c2a6.js';

const taButtonCss = "button{background:var(--primary-color);border-radius:var(--border-radius);border:none;box-shadow:0 4px 12px rgba(254, 110, 113, .4);box-sizing:border-box;color:white;cursor:pointer;font-size:14px;letter-spacing:.04em;margin-top:var(--ta-button-margin-top, 8px);outline:0;padding:0 12px;transition:all 300ms ease;width:var(--ta-button-width, 100%);height:var(--ta-button-height, 36px);font-weight:500;display:flex;align-items:center;justify-content:center}button.white{background:white;color:var(--primary-text-color);box-shadow:none}button.white:hover{transform:var(--ta-button-hover-translate, translateY(1px));box-shadow:var(--ta-button-hover-box-shadow, 0 3px 6px rgba(66, 90, 112, 0.25), 0 1px 3px rgba(66, 90, 112, 0.25))}button.grey{background:#f1f1f1;color:#425a70;box-shadow:0 4px 12px 0 rgba(66, 90, 112, 0.25)}button.dark-grey{background-color:#dbe0e5;color:#526981;box-shadow:none}button.dark-grey:hover{box-shadow:var(--ta-button-hover-box-shadow, 0 4px 12px 0 rgba(66, 90, 112, 0.25))}button.small{width:106px;height:28px;padding:6px 24px}button.grey:hover{transform:var(--ta-button-hover-translate, translateY(1px));box-shadow:var(--ta-button-hover-box-shadow, 0 3px 6px rgba(66, 90, 112, 0.25), 0 1px 3px rgba(66, 90, 112, 0.25))}button:hover{box-shadow:var(--ta-button-hover-box-shadow, 0 3px 6px rgba(254, 110, 113, .4), 0 1px 3px rgba(254, 110, 113, .4));transform:var(--ta-button-hover-translate, translateY(1px))}button:disabled{opacity:.6;cursor:auto}.spin-icon{margin:auto;width:20px;height:20px;border:solid 2px #fff;border-top-color:#ff3b3b;border-left-color:#ff3b3b;border-right-color:#ff3b3b;border-radius:20px;animation:loading-spinner 500ms linear infinite}@keyframes loading-spinner{0%{transform:rotate(0deg);transform:rotate(0deg)}100%{transform:rotate(360deg);transform:rotate(360deg)}}";

const TaButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.loading = false;
        this.type = 'button';
        this.small = false;
        this.color = null;
        this.disabled = false;
        this.handleOnClick = (e) => {
            this.taClick.emit(e);
        };
        this.taClick = createEvent(this, "taClick", 7);
    }
    render() {
        if (this.loading) {
            return (h("button", { class: {
                    [this.color]: true,
                    'small': this.small
                }, disabled: true }, h("div", { class: "spin-icon" })));
        }
        return (h("button", { disabled: this.disabled, type: this.type, class: {
                [this.color]: true,
                'small': this.small,
                'disabled': this.disabled,
            }, onClick: this.handleOnClick }, h("slot", null)));
    }
};
TaButton.style = taButtonCss;

export { TaButton as ta_button };
