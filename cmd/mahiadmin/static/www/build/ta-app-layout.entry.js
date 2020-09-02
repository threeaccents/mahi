import { r as registerInstance, h } from './index-d067c2a6.js';

const taAppLayoutCss = ".ta-app-layout-container{display:flex}.app-body{background:#f1f1f1;margin-left:283px;min-height:100vh;width:calc(100vw - 283px)}.app-topbar{display:none}@media (max-width: 1080px){.app-layout-container{flex-direction:column}.app-body{width:100vw;margin-left:0;margin-top:60px}.app-sidebar{display:none}.app-topbar{display:block}}";

const AppLayout = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.drawerOpen = false;
        this.toggleDrawer = () => {
            this.drawerOpen = !this.drawerOpen;
            window.document.body.removeAttribute('style');
            if (!this.drawerOpen)
                return;
            window.document.body.style.overflowY = 'hidden';
        };
    }
    render() {
        return (h("div", { class: "ta-app-layout-container" }, h("ta-nav-drawer", { open: this.drawerOpen }), h("div", { class: "app-sidebar" }, h("ta-sidebar", null)), h("div", { class: "app-topbar" }, h("ta-topbar", { onTaHamburgerClicked: this.toggleDrawer })), h("div", { class: "app-body" }, h("slot", null))));
    }
};
AppLayout.style = taAppLayoutCss;

export { AppLayout as ta_app_layout };
