import { r as registerInstance, c as createEvent, h, g as getElement } from './index-d067c2a6.js';

const taDropdownCss = ":host{--ta-dropdown-background-color:#fff;--ta-dropdown-box-shadow:0 2px 12px 0 rgba(82, 105, 129, 0.25);--ta-dropdown-width:100%;--ta-dropdown-padding:30px;--ta-dropdown-initial-transform:translate3d(0px, 0, 0px);--ta-dropdown-transform:translate3d(0, 10px, 0);--ta-dropdown-arrow-color:#fff}.ta-dropdown-component{position:relative}.ta-dropdown{position:absolute;transform:var(--ta-dropdown-initial-transform);opacity:0;transition:all 0.5s ease 0s;pointer-events:none;box-shadow:var(--ta-dropdown-box-shadow);background-color:var(--ta-dropdown-background-color);width:var(--ta-dropdown-width);border-radius:6px;z-index:99}.ta-dropdown:after{position:absolute;content:\"\";top:-5px;right:10px;width:0;height:0;border-left:8px solid transparent;border-bottom:8px solid var(--ta-dropdown-arrow-color);border-right:8px solid transparent}.ta-dropdown.show{transform:var(--ta-dropdown-transform);opacity:1;pointer-events:auto}.ta-dropdown-wrapper{padding:var(--ta-dropdown-padding)}";

const TaDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showOverlay = false;
        this.handleChildClick = (e) => {
            this.stopDefaults(e);
            this.taOverlayRendered.emit(!this.showOverlay);
            this.showOverlay = !this.showOverlay;
        };
        this.stopDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        this.taOverlayRendered = createEvent(this, "taOverlayRendered", 7);
    }
    componentDidLoad() {
        this.bindChildClickListener();
    }
    handleWindowClick() {
        this.taOverlayRendered.emit(false);
        this.showOverlay = false;
    }
    bindChildClickListener() {
        const el = this.$el.querySelector('.ta-dropdown-component').children[0];
        el.addEventListener('click', this.handleChildClick);
    }
    async close() {
        this.showOverlay = false;
    }
    render() {
        return (h("div", { class: "ta-dropdown-component", style: {
                width: this.width
            } }, h("slot", null), h("div", { class: {
                'ta-dropdown': true,
                'show': this.showOverlay
            } }, h("div", { class: "ta-dropdown-wrapper", onClick: this.stopDefaults }, this.overlay))));
    }
    get $el() { return getElement(this); }
};
TaDropdown.style = taDropdownCss;

export { TaDropdown as ta_dropdown };
