import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taProgressCss = ":host{display:block}*,*:before,*:after{box-sizing:border-box}.charts-container:after{clear:both;content:'';display:table}.pie-wrapper{height:1em;width:1em;position:relative}.pie-wrapper .pie{height:100%;width:100%;clip:rect(0, 1em, 1em, .5em);left:0;position:absolute;top:0}.pie-wrapper .pie .half-circle{height:100%;width:100%;border:.05em solid #3498db;border-radius:50%;clip:rect(0, .5em, 1em, 0);left:0;position:absolute;top:0}.pie-wrapper .label{background:none;border-radius:50%;bottom:0.4em;color:#425a70;cursor:default;display:block;font-size:0.25em;left:0.4em;line-height:2.8em;position:absolute;right:0.4em;text-align:center;top:0.4em}.pie-wrapper .label .smaller{color:#425a70;font-size:.45em;padding-bottom:.4em;vertical-align:super}.pie-wrapper.style-2 .label{background:none;color:#7f8c8d}.pie-wrapper.style-2 .label .smaller{color:#bdc3c7}.pie-wrapper .pie .half-circle{border-color:var(--primary-color)}.pie-wrapper .pie .left-side{transform:rotate(179deg)}";

const TaProgress = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 75;
    }
    get leftTransform() {
        const value = (this.value / 100) * 360;
        return `rotate(${value}deg)`;
    }
    render() {
        const { value } = this;
        return (h(Host, { style: {
                fontSize: `${this.size}px`
            } }, h("div", { class: "pie-wrapper" }, h("span", { class: "label" }, Math.round(value), h("span", { class: "smaller" }, "%")), h("div", { style: {
                clip: `${value > 50 ? 'rect(auto, auto, auto, auto)' : ''}`
            }, class: "pie" }, h("div", { style: {
                transform: this.leftTransform
            }, class: "left-side half-circle" }), h("div", { style: {
                display: `${value <= 50 ? 'none' : ''}`,
                transform: `${value > 50 ? 'rotate(180deg)' : ''}`
            }, class: "right-side half-circle" })))));
    }
};
TaProgress.style = taProgressCss;

export { TaProgress as ta_progress };
