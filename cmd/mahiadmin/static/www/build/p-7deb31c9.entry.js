import{r as t,d as e,h as r,H as o,g as s}from"./p-cd2828d1.js";const i=class{constructor(r){t(this,r),this.exceptions=[],this.handleSelectOption=t=>{this.taSelect.emit(t)},this.isException=t=>this.exceptions.some(e=>e&&e===t),this.taSelect=e(this,"taSelect",7)}render(){const{value:t}=this;return r(o,null,r("div",{class:"storage-options-wrapper"},this.isException("wasabi")?null:r("div",{onClick:()=>this.handleSelectOption("wasabi"),class:{"storage-option-item":!0,selected:"wasabi"===t}},r("img",{src:"../../assets/wasabi-logo.jpg",alt:"Wasabi"})),this.isException("s3")?null:r("div",{onClick:()=>this.handleSelectOption("s3"),class:{"storage-option-item":!0,selected:"s3"===t}},r("img",{src:"../../assets/aws-logo.jpg",alt:"AWS s3"})),this.isException("digital_ocean")?null:r("div",{onClick:()=>this.handleSelectOption("digital_ocean"),class:{"storage-option-item":!0,selected:"digital_ocean"===t}},r("img",{src:"../../assets/digital-ocean-logo.jpg",alt:"DigitalOcean"})),this.isException("b2")?null:r("div",{onClick:()=>this.handleSelectOption("b2"),class:{"storage-option-item":!0,selected:"b2"===t}},r("img",{src:"../../assets/backblaze-logo.jpg",alt:"BackBlaze"}))))}};i.style=":host{display:block}.storage-options-wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.storage-option-item{width:145px;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;border-radius:6px;-webkit-box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);background-color:#ffffff;margin-bottom:20px;margin-right:12px;cursor:pointer;border:solid 2px transparent}.storage-option-item ta-icon{height:var(--ta-icon-height, 20px)}.storage-option-item.selected{-webkit-box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.14);box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.14);border:solid 2px var(--primary-color)}@media only screen and (max-width: 768px){.storage-options-wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:center;justify-content:center}.storage-option-item{margin:0 6px;margin-bottom:20px}}";const a=class{constructor(o){t(this,o),this.options=[],this.dropdownOpen=!1,this.label="",this.error="",this.checkForChildChanges=()=>{new MutationObserver(this.getOptions).observe(this.$el,{childList:!0,subtree:!0,characterData:!0})},this.getOptions=()=>{const t=this.$el.querySelectorAll("ta-select-option");this.options=Array.from(t),this.bindClickListeners(this.options)},this.handleOnFocus=t=>{this.stopPropagation(t),t.preventDefault(),this.dropdownOpen=!0},this.stopPropagation=t=>{t.stopPropagation(),t.stopImmediatePropagation()},this.displayError=()=>{if(this.error&&""!==this.error)return r("div",{class:"input-error-message"},this.error)},this.taSelect=e(this,"taSelect",7)}componentDidLoad(){this.getOptions(),this.checkSelected(),this.checkForChildChanges()}handleWindowClick(){this.dropdownOpen=!1}checkSelected(){this.options.forEach(t=>{t.value===this.value&&(t.select(),this.label=t.label)})}bindClickListeners(t){t.forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation(),e.preventDefault(),this.deselectAll(),t.select(),this.taSelect.emit(t.value),this.label=t.label,this.dropdownOpen=!1})})}deselectAll(){this.options.forEach(t=>t.deselect())}render(){return r(o,null,r("div",{class:{"has-error":""!==this.error,"ta-select":!0}},r("input",{onClick:this.stopPropagation,class:"input",placeholder:this.placeholder,value:this.label,readOnly:!0,onFocus:this.handleOnFocus}),r("div",{class:{"expand-arrow-icon":!0,expanded:this.dropdownOpen}},r("ta-icon",{icon:"expand-arrow"})),r("div",{class:{dropdown:!0,open:this.dropdownOpen}},r("div",{class:"dropdown-wrapper"},r("slot",null))),this.displayError()))}get $el(){return s(this)}};a.style=":host{display:block;position:relative;margin-bottom:var(--ta-select-margin-bottom, 16px)}.input-error-message{font-size:14px;font-weight:500;color:var(--primary-error-color)}.ta-select.has-error input{border:solid 2px var(--primary-error-color)}.ta-select.has-error .input::-webkit-input-placeholder{color:var(--primary-error-color)}.ta-select.has-error .input::-moz-placeholder{color:var(--primary-error-color)}.ta-select.has-error .input:-ms-input-placeholder{color:var(--primary-error-color)}.ta-select.has-error .input::-ms-input-placeholder{color:var(--primary-error-color)}.ta-select.has-error .input::placeholder{color:var(--primary-error-color)}.input{border:solid 2px var(--light-border-color);border-radius:var(--border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;font-size:14px;padding:10px 10px;padding-right:20px;color:var(--primary-text-color);outline:none;background-color:var(--ta-select-bg-color, #f4f5f9)}.input::-webkit-input-placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.input::-moz-placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.input:-ms-input-placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.input::-ms-input-placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.input::placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.expand-arrow-icon{position:absolute;width:40px;height:26px;right:1px;top:4px;padding:4px 8px;text-align:center;-webkit-transition:-webkit-transform 0.2s ease;transition:-webkit-transform 0.2s ease;transition:transform 0.2s ease;transition:transform 0.2s ease, -webkit-transform 0.2s ease;cursor:pointer}.expand-arrow-icon ta-icon{fill:var(--primary-text-color)}.expand-arrow-icon.expanded{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.input:focus{border-radius:6px 6px 0 0;border-bottom:none}.dropdown{border-radius:0 0 6px 6px;position:absolute;width:calc(100% - 4px);max-height:200px;overflow-y:auto;-webkit-transform:translate3d(0px, 0, 0px);transform:translate3d(0px, 0, 0px);opacity:0;-webkit-transition:all 0.5s ease 0s;transition:all 0.5s ease 0s;pointer-events:none;z-index:99;border:solid 2px var(--light-border-color);border-top:none;background-color:var(--ta-select-bg-color, #f4f5f9)}.dropdown.open{-webkit-transform:translate3d(0, 0px, 0);transform:translate3d(0, 0px, 0);opacity:1;pointer-events:auto}.dropdown-wrapper{padding:20px 0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}";const n=class{constructor(e){t(this,e),this.selected=!1}async select(){this.selected=!0}async deselect(){this.selected=!1}render(){return r(o,{class:{selected:this.selected}},this.label)}};n.style=":host{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;cursor:pointer;padding:0 25px;color:var(--dark-text-color);height:16px;font-size:14px;color:var(--dark-text-color);padding:6px 8px;margin:0 15px;cursor:pointer}:host(.selected){background:#e6f7ff;border-radius:6px}:host(:hover:not(.selected)){border-radius:6px;font-weight:500;background-color:#e7ebf3}";export{i as custom_storage_engine_input,a as ta_select,n as ta_select_option}