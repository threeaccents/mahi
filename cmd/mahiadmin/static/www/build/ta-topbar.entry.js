import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';
import { m as me } from './index-d97fcc51.js';

const taTopbarCss = ":host{display:flex;justify-content:space-between;align-items:center;height:60px;position:fixed;top:0;left:0;right:0;padding:0 1.25rem;box-shadow:0 4px 18px 0 rgba(0, 0, 0, 0.09);background:#fff;z-index:99}.logo img{height:30px}.toggle-menu{height:20px;width:20px;cursor:pointer;margin-left:15px}.right-side{display:flex;align-items:center}.usage{text-align:center}.usage-title{font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:var(--primary-text-color)}.usage-amount{font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#a6b7c7}";

const barIcon = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>';
const TaTopbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.me = me();
        this.taHamburgerClicked = createEvent(this, "taHamburgerClicked", 7);
    }
    render() {
        return (h(Host, null, h("div", { class: "logo" }, h("img", { src: '../../assets/logo.svg', alt: '' })), h("div", { class: "right-side" }, h("div", { class: "toggle-menu" }, h("div", { onClick: () => this.taHamburgerClicked.emit(), innerHTML: barIcon })))));
    }
};
TaTopbar.style = taTopbarCss;

export { TaTopbar as ta_topbar };
