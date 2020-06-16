import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taStatCardCss = ":host{display:block;border-radius:12px;box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);background-color:#ffffff}.wrapper{padding:20px 23px;display:flex}.icon-wrapper{width:38px;height:38px;border-radius:6px;border:solid 2px #e2e6ef;display:flex;justify-content:center;align-items:center}.info-section{margin-left:20px}.label{font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#a6b7c7}.value{font-size:18px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:var(--primary-text-color);margin-top:2px}";

const TaStatCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("div", { class: "wrapper" }, h("div", { class: "icon-section" }, h("div", { class: "icon-wrapper" }, h("ta-icon", { icon: this.icon }))), h("div", { class: "info-section" }, h("div", { class: "label" }, this.label), h("div", { class: "value" }, this.value)))));
    }
};
TaStatCard.style = taStatCardCss;

export { TaStatCard as ta_stat_card };
