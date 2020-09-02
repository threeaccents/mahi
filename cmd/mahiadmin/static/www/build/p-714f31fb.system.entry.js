System.register(["./p-05ba43f8.system.js"],(function(e){"use strict";var t,r,o,s,i;return{setters:[function(e){t=e.r;r=e.d;o=e.h;s=e.H;i=e.g}],execute:function(){const a=":host{display:block}.storage-options-wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.storage-option-item{width:145px;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;border-radius:6px;-webkit-box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);background-color:#ffffff;margin-bottom:20px;margin-right:12px;cursor:pointer;border:solid 2px transparent}.storage-option-item ta-icon{height:var(--ta-icon-height, 20px)}.storage-option-item.selected{-webkit-box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.14);box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.14);border:solid 2px var(--primary-color)}@media only screen and (max-width: 768px){.storage-options-wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:center;justify-content:center}.storage-option-item{margin:0 6px;margin-bottom:20px}}";const n=e("custom_storage_engine_input",class{constructor(e){t(this,e);this.exceptions=[];this.handleSelectOption=e=>{this.taSelect.emit(e)};this.isException=e=>this.exceptions.some(t=>t&&t===e);this.taSelect=r(this,"taSelect",7)}render(){const{value:e}=this;return o(s,null,o("div",{class:"storage-options-wrapper"},!this.isException("wasabi")?o("div",{onClick:()=>this.handleSelectOption("wasabi"),class:{"storage-option-item":true,selected:e==="wasabi"}},o("img",{src:"../../assets/wasabi-logo.jpg",alt:"Wasabi"})):null,!this.isException("s3")?o("div",{onClick:()=>this.handleSelectOption("s3"),class:{"storage-option-item":true,selected:e==="s3"}},o("img",{src:"../../assets/aws-logo.jpg",alt:"AWS s3"})):null,!this.isException("digital_ocean")?o("div",{onClick:()=>this.handleSelectOption("digital_ocean"),class:{"storage-option-item":true,selected:e==="digital_ocean"}},o("img",{src:"../../assets/digital-ocean-logo.jpg",alt:"DigitalOcean"})):null,!this.isException("b2")?o("div",{onClick:()=>this.handleSelectOption("b2"),class:{"storage-option-item":true,selected:e==="b2"}},o("img",{src:"../../assets/backblaze-logo.jpg",alt:"BackBlaze"})):null))}});n.style=a;const l=":host{display:block;position:relative;margin-bottom:var(--ta-select-margin-bottom, 16px)}.input-error-message{font-size:14px;font-weight:500;color:var(--primary-error-color)}.ta-select.has-error input{border:solid 2px var(--primary-error-color)}.ta-select.has-error .input::-webkit-input-placeholder{color:var(--primary-error-color)}.ta-select.has-error .input::-moz-placeholder{color:var(--primary-error-color)}.ta-select.has-error .input:-ms-input-placeholder{color:var(--primary-error-color)}.ta-select.has-error .input::-ms-input-placeholder{color:var(--primary-error-color)}.ta-select.has-error .input::placeholder{color:var(--primary-error-color)}.input{border:solid 2px var(--light-border-color);border-radius:var(--border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;font-size:14px;padding:10px 10px;padding-right:20px;color:var(--primary-text-color);outline:none;background-color:var(--ta-select-bg-color, #f4f5f9)}.input::-webkit-input-placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.input::-moz-placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.input:-ms-input-placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.input::-ms-input-placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.input::placeholder{color:#a6b7c7;font-size:14px;font-weight:500;text-align:center}.expand-arrow-icon{position:absolute;width:40px;height:26px;right:1px;top:4px;padding:4px 8px;text-align:center;-webkit-transition:-webkit-transform 0.2s ease;transition:-webkit-transform 0.2s ease;transition:transform 0.2s ease;transition:transform 0.2s ease, -webkit-transform 0.2s ease;cursor:pointer}.expand-arrow-icon ta-icon{fill:var(--primary-text-color)}.expand-arrow-icon.expanded{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.input:focus{border-radius:6px 6px 0 0;border-bottom:none}.dropdown{border-radius:0 0 6px 6px;position:absolute;width:calc(100% - 4px);max-height:200px;overflow-y:auto;-webkit-transform:translate3d(0px, 0, 0px);transform:translate3d(0px, 0, 0px);opacity:0;-webkit-transition:all 0.5s ease 0s;transition:all 0.5s ease 0s;pointer-events:none;z-index:99;border:solid 2px var(--light-border-color);border-top:none;background-color:var(--ta-select-bg-color, #f4f5f9)}.dropdown.open{-webkit-transform:translate3d(0, 0px, 0);transform:translate3d(0, 0px, 0);opacity:1;pointer-events:auto}.dropdown-wrapper{padding:20px 0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}";const p=e("ta_select",class{constructor(e){t(this,e);this.options=[];this.dropdownOpen=false;this.label="";this.error="";this.checkForChildChanges=()=>{const e=new MutationObserver(this.getOptions);const t={childList:true,subtree:true,characterData:true};e.observe(this.$el,t)};this.getOptions=()=>{const e=this.$el.querySelectorAll("ta-select-option");this.options=Array.from(e);this.bindClickListeners(this.options)};this.handleOnFocus=e=>{this.stopPropagation(e);e.preventDefault();this.dropdownOpen=true};this.stopPropagation=e=>{e.stopPropagation();e.stopImmediatePropagation()};this.displayError=()=>{if(!this.error||this.error==="")return;return o("div",{class:"input-error-message"},this.error)};this.taSelect=r(this,"taSelect",7)}componentDidLoad(){this.getOptions();this.checkSelected();this.checkForChildChanges()}handleWindowClick(){this.dropdownOpen=false}checkSelected(){this.options.forEach(e=>{if(e.value!==this.value)return;e.select();this.label=e.label})}bindClickListeners(e){e.forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();t.preventDefault();this.deselectAll();e.select();this.taSelect.emit(e.value);this.label=e.label;this.dropdownOpen=false})})}deselectAll(){this.options.forEach(e=>e.deselect())}render(){return o(s,null,o("div",{class:{"has-error":this.error!=="","ta-select":true}},o("input",{onClick:this.stopPropagation,class:"input",placeholder:this.placeholder,value:this.label,readOnly:true,onFocus:this.handleOnFocus}),o("div",{class:{"expand-arrow-icon":true,expanded:this.dropdownOpen}},o("ta-icon",{icon:"expand-arrow"})),o("div",{class:{dropdown:true,open:this.dropdownOpen}},o("div",{class:"dropdown-wrapper"},o("slot",null))),this.displayError()))}get $el(){return i(this)}});p.style=l;const c=":host{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;cursor:pointer;padding:0 25px;color:var(--dark-text-color);height:16px;font-size:14px;color:var(--dark-text-color);padding:6px 8px;margin:0 15px;cursor:pointer}:host(.selected){background:#e6f7ff;border-radius:6px}:host(:hover:not(.selected)){border-radius:6px;font-weight:500;background-color:#e7ebf3}";const d=e("ta_select_option",class{constructor(e){t(this,e);this.selected=false}async select(){this.selected=true}async deselect(){this.selected=false}render(){return o(s,{class:{selected:this.selected}},this.label)}});d.style=c}}}));