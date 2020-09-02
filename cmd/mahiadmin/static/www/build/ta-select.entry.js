import { r as registerInstance, h, c as createEvent, H as Host, g as getElement } from './index-d067c2a6.js';

const taSelectCss = ":host{display:block;position:relative;margin-bottom:var(--ta-select-margin-bottom, 16px)}.input-error-message{font-size:14px;font-weight:500;color:var(--primary-error-color)}.ta-select.has-error input{border:solid 2px var(--primary-error-color)}.ta-select.has-error .input::placeholder{color:var(--primary-error-color)}.input{border:solid 2px var(--light-border-color);border-radius:var(--border-radius);box-sizing:border-box;width:100%;font-size:14px;padding:10px 10px;padding-right:20px;color:var(--primary-text-color);outline:none;background-color:var(--ta-select-bg-color, #f4f5f9)}.input::placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.expand-arrow-icon{position:absolute;width:40px;height:26px;right:1px;top:4px;padding:4px 8px;text-align:center;transition:transform 0.2s ease;cursor:pointer}.expand-arrow-icon ta-icon{fill:var(--primary-text-color)}.expand-arrow-icon.expanded{transform:rotate(180deg)}.input:focus{border-radius:6px 6px 0 0;border-bottom:none}.dropdown{border-radius:0 0 6px 6px;position:absolute;width:calc(100% - 4px);max-height:200px;overflow-y:auto;transform:translate3d(0px, 0, 0px);opacity:0;transition:all 0.5s ease 0s;pointer-events:none;z-index:99;border:solid 2px var(--light-border-color);border-top:none;background-color:var(--ta-select-bg-color, #f4f5f9)}.dropdown.open{transform:translate3d(0, 0px, 0);opacity:1;pointer-events:auto}.dropdown-wrapper{padding:20px 0;display:flex;flex-direction:column}";

const TaSelect = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.options = [];
        this.dropdownOpen = false;
        this.label = '';
        this.error = '';
        this.checkForChildChanges = () => {
            const observer = new MutationObserver(this.getOptions);
            const config = {
                childList: true,
                subtree: true,
                characterData: true
            };
            observer.observe(this.$el, config);
        };
        this.getOptions = () => {
            const options = this.$el.querySelectorAll('ta-select-option');
            this.options = Array.from(options);
            this.bindClickListeners(this.options);
        };
        this.handleOnFocus = (e) => {
            this.stopPropagation(e);
            e.preventDefault();
            this.dropdownOpen = true;
        };
        this.stopPropagation = (e) => {
            e.stopPropagation();
            e.stopImmediatePropagation();
        };
        this.displayError = () => {
            if (!this.error || this.error === '')
                return;
            return (h("div", { class: "input-error-message" }, this.error));
        };
        this.taSelect = createEvent(this, "taSelect", 7);
    }
    componentDidLoad() {
        this.getOptions();
        this.checkSelected();
        this.checkForChildChanges();
    }
    handleWindowClick() {
        this.dropdownOpen = false;
    }
    checkSelected() {
        this.options.forEach(opt => {
            if (opt.value !== this.value)
                return;
            opt.select();
            this.label = opt.label;
        });
    }
    bindClickListeners(options) {
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.deselectAll();
                opt.select();
                this.taSelect.emit(opt.value);
                this.label = opt.label;
                this.dropdownOpen = false;
            });
        });
    }
    deselectAll() {
        this.options.forEach(opt => opt.deselect());
    }
    render() {
        return (h(Host, null, h("div", { class: {
                'has-error': this.error !== '',
                'ta-select': true
            } }, h("input", { onClick: this.stopPropagation, class: "input", placeholder: this.placeholder, value: this.label, readOnly: true, onFocus: this.handleOnFocus }), h("div", { class: {
                'expand-arrow-icon': true,
                'expanded': this.dropdownOpen,
            } }, h("ta-icon", { icon: 'expand-arrow' })), h("div", { class: {
                'dropdown': true,
                'open': this.dropdownOpen
            } }, h("div", { class: "dropdown-wrapper" }, h("slot", null))), this.displayError())));
    }
    get $el() { return getElement(this); }
};
TaSelect.style = taSelectCss;

export { TaSelect as ta_select };
