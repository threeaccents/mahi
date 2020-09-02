import { r as registerInstance, c as createEvent, h, g as getElement } from './index-d067c2a6.js';

const taTabsCss = "ta-tabs{}";

const TaTabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.headers = [];
        this.bodies = [];
        this.initialValue = '';
        this.bindHeaderClickHandlers = (headers) => {
            headers.forEach((header) => {
                header.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.activateHeader(header.tab);
                    this.activateBody(header.tab);
                    this.taChange.emit(header.tab);
                });
            });
        };
        this.taChange = createEvent(this, "taChange", 7);
    }
    componentDidLoad() {
        this.getHeaders();
        this.getBodies();
    }
    getHeaders() {
        const headerEls = this.$el.querySelectorAll('ta-tab-header');
        this.headers = Array.from(headerEls);
        if (this.headers.length === 0) {
            throw new Error('[ta-tabs] Must have at least one ta-tab-header');
        }
        if (this.initialValue === '') {
            this.headers[0].activate();
        }
        else {
            this.activateHeader(this.initialValue);
        }
        this.bindHeaderClickHandlers(this.headers);
    }
    activateHeader(tab) {
        const header = this.headers.find(b => b.tab === tab);
        this.deactivateHeaders();
        header.activate();
    }
    deactivateHeaders() {
        this.headers.forEach(header => header.deactivate());
    }
    getBodies() {
        const bodyEls = this.$el.querySelectorAll('ta-tab-body');
        this.bodies = Array.from(bodyEls);
        if (this.bodies.length === 0) {
            throw new Error('[ta-tabs] Must have at least one ta-tab-header');
        }
        if (this.initialValue === '') {
            this.bodies[0].activate();
        }
        else {
            this.activateBody(this.initialValue);
        }
    }
    activateBody(tab) {
        const body = this.bodies.find(b => b.tab === tab);
        this.deactivateBodies();
        body.activate();
    }
    deactivateBodies() {
        this.bodies.forEach(header => header.deactivate());
    }
    render() {
        return (h("div", { class: "ta-tabs-component" }, h("slot", null)));
    }
    get $el() { return getElement(this); }
};
TaTabs.style = taTabsCss;

export { TaTabs as ta_tabs };
