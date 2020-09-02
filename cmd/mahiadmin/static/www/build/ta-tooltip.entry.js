import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taTooltipCss = ":host{display:block}.tooltip{position:relative;display:inline-block}.tooltip .tooltiptext{font-size:12px;visibility:hidden;width:120px;background-color:#555;color:#fff;text-align:center;border-radius:6px;padding:4px 0;position:absolute;z-index:1;bottom:125%;left:50%;margin-left:-60px;opacity:0;transition:opacity 0.3s}.tooltip .tooltiptext::after{content:\"\";position:absolute;top:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:#555 transparent transparent transparent}.tooltip:hover .tooltiptext{visibility:visible;opacity:1}";

const TaTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.text = "";
    }
    render() {
        return (h(Host, null, h("div", { class: "tooltip" }, h("slot", null), h("span", { class: "tooltiptext " }, this.text))));
    }
};
TaTooltip.style = taTooltipCss;

export { TaTooltip as ta_tooltip };