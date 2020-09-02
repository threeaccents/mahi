System.register(["./p-05ba43f8.system.js"],(function(t){"use strict";var o,a,e,i;return{setters:[function(t){o=t.r;a=t.d;e=t.h;i=t.H}],execute:function(){const l=".modal-wrapper{position:fixed;z-index:99999;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#1c293680}.modal-content{background:var(--ta-modal-background, #fff);margin:auto;margin-top:var(--ta-modal-margin-top, auto);padding:var(--ta-modal-padding, 20px);width:var(--ta-modal-width, 420px);max-width:100vw;border-radius:6px;height:var(--ta-modal-height, 220px);max-height:100vh;overflow-y:var(--ta-modal-overflow, visible);-webkit-box-shadow:var(--ta-modal-box-shadow, 0 2px 6px 0 rgba(7, 135, 235, 0.16));box-shadow:var(--ta-modal-box-shadow, 0 2px 6px 0 rgba(7, 135, 235, 0.16));position:relative}.modal-header{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center;height:15% x}.modal-body{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.modal-title-text{font-size:14px;font-weight:bold}.modal-title-text{font-size:16px;font-weight:bold;color:var(--primary-text-color);margin-bottom:8px}.body-text{font-size:15px;font-weight:500;color:var(--dark-text-color);margin-bottom:8px}.modal-footer{height:15%;display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center}.buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}.close-icon{font-size:24px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;text-align:center;color:var(--light-text-color);cursor:pointer}ta-icon{--ta-icon-fill:#c3cbd3}ta-button{--ta-button-width:100px;--ta-button-hover-box-shadow:inherit;--ta-button-hover-translate:none}ta-button:nth-child(1){--ta-button-hover-box-shadow:none;margin-right:20px}@media (max-width: 400px){.modal-content{background:var(--ta-modal-background, #fff);margin:auto;margin-top:var(--ta-modal-margin-top, auto);padding:var(--ta-modal-padding, 20px);width:var(--ta-modal-mobile-width, 320px);max-width:100vw;border-radius:6px;height:var(--ta-modal-height, 220px);max-height:100vh;overflow-y:var(--ta-modal-overflow, visible);-webkit-box-shadow:var(--ta-modal-box-shadow, 0 2px 6px 0 rgba(7, 135, 235, 0.16));box-shadow:var(--ta-modal-box-shadow, 0 2px 6px 0 rgba(7, 135, 235, 0.16));position:relative}}";const n=t("ta_modal",class{constructor(t){o(this,t);this.loading=false;this.titleText="";this.bodyText="";this.confirmBtnText="Confirm";this.cancelBtnText="Cancel";this.display=false;this.useDefaultFooter=true;this.taClose=a(this,"taClose",7);this.taSubmit=a(this,"taSubmit",7)}render(){if(!this.display)return null;return e(i,null,e("div",{class:"modal-wrapper"},e("div",{class:"modal-content"},e("div",{class:"modal-header"},e("div",{class:"close-icon",onClick:()=>this.taClose.emit()},e("ta-icon",{icon:"close"}))),e("div",{class:"modal-body"},e("div",{class:"modal-title-text"},this.titleText),e("div",{class:"body-text"},this.bodyText),e("slot",null)),this.useDefaultFooter?e("div",{class:"modal-footer"},e("div",{class:"buttons"},e("ta-button",{color:"white",onClick:()=>this.taClose.emit()},"Cancel"),e("ta-button",{loading:this.loading,onClick:()=>this.taSubmit.emit()},"Delete"))):null)))}});n.style=l}}}));