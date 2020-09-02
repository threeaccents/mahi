import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taCardCss = ":host{display:block;border-radius:12px;box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.15);background-color:#ffffff;padding:var(--ta-card-padding, 28px);--ta-card-margin:0;--ta-card-min-height:0;margin:var(--ta-card-margin);min-height:var(--ta-card-min-height);width:var(--ta-card-width, unset)}";

const TaCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
};
TaCard.style = taCardCss;

export { TaCard as ta_card };