import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';

const taFormCss = ":host{display:block}";

const TaForm = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.taSubmit = createEvent(this, "taSubmit", 7);
    }
    handleKeyUpEvent(event) {
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            this.taSubmit.emit();
        }
    }
    render() {
        return (h(Host, { class: "ta-form" }, h("slot", null)));
    }
};
TaForm.style = taFormCss;

export { TaForm as ta_form };
