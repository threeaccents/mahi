import{r as t,d as i,h as s,H as e}from"./p-cd2828d1.js";const r=class{constructor(s){t(this,s),this.initialChecked=!1,this.noLabel="No",this.yesLabel="Yes",this.handleOnChange=t=>{this.taChange.emit(t)},this.taChange=i(this,"taChange",7)}render(){return s(e,null,s("div",{class:"switch-button-wrapper"},s("span",{class:"label"},this.label),s("div",{class:"switch-button"},s("div",{class:{slider:!0,active:this.initialChecked}}),s("div",{onClick:()=>this.handleOnChange(!0),class:{"switch-side":!0,active:this.initialChecked}},this.yesLabel),s("div",{onClick:()=>this.handleOnChange(!1),class:{"switch-side":!0,active:!this.initialChecked}},this.noLabel))))}};r.style=":host{display:block;margin-bottom:var(--ta-switch-button-margin-bottom, 16px)}.switch-button-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.label{color:var(--primary-text-color);font-size:14px;margin-bottom:8px}.slider{position:absolute;right:2px;cursor:pointer;background-color:var(--primary-color);-webkit-box-shadow:0 0 1px var(--primary-color);box-shadow:0 0 1px var(--primary-color);-webkit-transition:.4s;transition:.4s;border-radius:34px;display:-ms-flexbox;display:flex;width:124px;-ms-flex-pack:center;justify-content:center;height:30px;cursor:pointer;-ms-flex-align:center;align-items:center;border-radius:4px}.slider.active{-webkit-transform:translateX(-100%);-ms-transform:translateX(-100%);transform:translateX(-100%)}.switch-button{padding:1px;position:relative;background:#fff;border:1px solid #e3e5eb;border-radius:4px;height:32px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:250px;max-width:250px}.switch-side{display:-ms-flexbox;display:flex;width:124px;-ms-flex-pack:center;justify-content:center;height:30px;cursor:pointer;-ms-flex-align:center;align-items:center}.switch-side.active{z-index:9;color:#fff;border-radius:4px}";export{r as ta_switch_button}