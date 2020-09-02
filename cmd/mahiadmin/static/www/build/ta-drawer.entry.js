import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taDrawerCss = ":host{position:fixed;right:0;top:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:999}:host:before{content:\"\";display:block;position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(28, 41, 54, 0.8);opacity:0;will-change:opacity;transition:opacity 0.33s cubic-bezier(0, 0, 0.3, 1)}:host(.open){pointer-events:auto}:host(.open):before{opacity:1}.drawer-container{overflow-y:auto;width:560px;max-width:calc(100vw - 2.5rem);background:#fff;height:100%;box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);transform:translateX(102%);display:flex;flex-direction:column;transition:transform 0.3s cubic-bezier(0, 0, 0.3, 1);position:fixed;right:0;border-radius:12px}:host(.open) .drawer-container{transform:none}.drawer-wrapper{padding:30px}@media (max-width: 600px){.drawer-container{overflow-y:auto;width:100%;max-width:unset;background:#fff;height:100%;box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);transform:translateX(102%);display:flex;flex-direction:column;transition:transform 0.3s cubic-bezier(0, 0, 0.3, 1);position:fixed;right:0;border-radius:0}}";

const TaDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.open = false;
    }
    render() {
        return (h(Host, { class: {
                'open': this.open
            } }, h("div", { class: "drawer-container" }, h("div", { class: "drawer-wrapper" }, h("slot", null)))));
    }
};
TaDrawer.style = taDrawerCss;

export { TaDrawer as ta_drawer };