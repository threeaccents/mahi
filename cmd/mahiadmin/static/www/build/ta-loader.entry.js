import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taLoaderCss = ".loading{height:100%;display:flex;justify-content:center;align-items:center}.loading-bar{display:inline-block;width:4px;height:18px;border-radius:4px;animation:loading 1s ease-in-out infinite;margin:0 2px}.loading-bar:nth-child(1){background-color:#fe6e71;animation-delay:0}.loading-bar:nth-child(2){background-color:#fe6e71;animation-delay:0.09s}.loading-bar:nth-child(3){background-color:#fe6e71;animation-delay:.18s}.loading-bar:nth-child(4){background-color:#fe6e71;animation-delay:.27s}@keyframes loading{0%{transform:scale(1)}20%{transform:scale(1, 2.2)}40%{transform:scale(1)}}";

const TaLoader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("div", { class: "loading" }, h("div", { class: "loading-bar" }), h("div", { class: "loading-bar" }), h("div", { class: "loading-bar" }), h("div", { class: "loading-bar" }))));
    }
};
TaLoader.style = taLoaderCss;

export { TaLoader as ta_loader };
