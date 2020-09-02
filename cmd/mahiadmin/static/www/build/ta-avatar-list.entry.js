import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taAvatarListCss = ":host{display:block;position:relative;width:100%}.avatar-items{display:flex;position:relative}.avatar-item{margin-left:-8px}";

const colors = ['blue', 'yellow', 'green', 'red', 'grey'];
const indexes = ['9', '8', '7', '6', '5'];
const TaAvatarList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 'medium';
        this.styles = (index) => {
            return {
                // marginLeft: `${index * 20}px`,
                zIndex: indexes[index],
            };
        };
        this.totals = () => {
            if (this.items.length <= 4)
                return;
            const remainder = this.items.length - 4;
            return (h("div", { style: this.styles(4), class: "avatar-item" }, h("ta-avatar", { color: "grey", text: remainder.toString(), size: this.size })));
        };
    }
    render() {
        return (h(Host, null, h("div", { class: "avatar-items" }, this.items.slice(0, 4).map((item, index) => (h("div", { style: this.styles(index), class: "avatar-item" }, h("ta-avatar", { color: colors[index], text: item, size: this.size })))), this.totals())));
    }
};
TaAvatarList.style = taAvatarListCss;

export { TaAvatarList as ta_avatar_list };
