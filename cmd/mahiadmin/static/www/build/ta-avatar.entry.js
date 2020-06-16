import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';

const taAvatarCss = ":host{width:40px;height:40px;border-radius:50%;display:flex;justify-content:center;align-items:center;background:#38bdd3;color:white;font-size:16px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.13;letter-spacing:normal;text-align:center;color:#ffffff;border:solid 2px white}:host(.small){height:25px;width:25px}:host(.medium){height:36px;width:36px}:host(.blue){background:#38bdd3}:host(.red){background:#fe6e71}:host(.green){background:#53c78e}:host(.yellow){background:#fce170;color:#234361}:host(.grey){background:#66788a}";

const TaAvatar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = 'medium';
        this.color = 'blue';
    }
    render() {
        return (h(Host, { class: {
                [this.size]: true,
                [this.color]: true
            } }, this.text[0].toUpperCase(), this.text[1] ? this.text[1].toUpperCase() : null));
    }
};
TaAvatar.style = taAvatarCss;

export { TaAvatar as ta_avatar };
