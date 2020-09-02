System.register(["./p-05ba43f8.system.js","./p-66394cbe.system.js","./p-a4031362.system.js","./p-f2ebe6a2.system.js","./p-08914b53.system.js","./p-16d83290.system.js"],(function(t){"use strict";var e,i,a,o,n,l,s;return{setters:[function(t){e=t.r;i=t.h;a=t.d;o=t.H},function(){},function(t){n=t.i},function(){},function(t){l=t.A},function(t){s=t.t}],execute:function(){const r=":host{display:block;height:162px;border-radius:12px;-webkit-box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);background-color:#ffffff;cursor:pointer}:host(.create){opacity:.5}:host(:hover){-webkit-box-shadow:0 6px 12px 0 rgba(0, 0, 0, 0.44);box-shadow:0 6px 12px 0 rgba(0, 0, 0, 0.44)}.card-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;padding:20px;height:calc(100% - 40px)}a{text-decoration:none}.card-title{font-size:16px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:var(--primary-text-color);width:200px}.card-subtitle{margin-top:3px;font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:var(--extra-light-text-color)}.subtitle-block{margin-top:4px;width:95px;height:11px;background-color:#c3cbd3}.avatars{margin-top:6px}.icons{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}ta-dropdown{--ta-dropdown-background-color:var(--primary-text-color);--ta-dropdown-box-shadow:0 2px 12px 0 rgba(82, 105, 129, 0.25);--ta-dropdown-width:fit-content;--ta-dropdown-padding:10px 8px;--ta-dropdown-transform:translate3d(-165px, 5px, 0);--ta-dropdown-initial-transform:translate3d(-165px, 0, 0px);--ta-dropdown-arrow-color:transparent}.edit-menu-item{font-size:14px;color:white;padding:0 12px;height:32px;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-radius:3px;white-space:nowrap}.edit-menu-item:hover{background-color:var(--dark-text-color)}ta-modal{--ta-modal-height:300px}.vertical-dots-icon{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;text-align:center;-ms-flex-align:center;align-items:center;border-radius:50%;height:28px;width:28px;cursor:pointer}.vertical-dots-icon:hover{background-color:rgba(0, 0, 0, 0.04)}.vertical-dots-icon.active{background-color:rgba(0, 0, 0, 0.04)}.confirm-description{font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.44;letter-spacing:normal;color:#5e738e;margin-top:0px}";const c=t("ta_application_card",class{constructor(t){e(this,t);this.deletingApplication=false;this.displayConfirmModal=false;this.verifyDeleteText="";this.isMenuShown=false;this.create=false;this.name=()=>{const{name:t}=this.application;return t.length<=25?t:`${t.substr(0,22)}...`};this.getEditMenu=()=>i("div",{class:"edit-menu"},i("div",{class:"edit-menu-item",onClick:this.handleEditApplication},"Edit application"),i("div",{class:"edit-menu-item",onClick:this.handleDeleteApplication},"Remove application"));this.handleEditApplication=()=>{this.dropdownEl.close();this.history.push(`?applicationId=${this.application.id}#editApplication`,{application:this.application})};this.handleDeleteApplication=()=>{this.toggleConfirmModal()};this.toggleConfirmModal=()=>{this.verifyDeleteText="";this.displayConfirmModal=!this.displayConfirmModal};this.deleteApplication=()=>{this.deletingApplication=true;l().delete(this.application.id).then(this.onSuccess).catch(this.onError).finally(()=>this.deletingApplication=false)};this.onSuccess=()=>{s().success("Application was deleted");this.toggleConfirmModal();this.taApplicationWasDeleted.emit(this.application.id)};this.onError=t=>{if(t.error){return s().danger(t.error)}s().danger("Application failed to delete")};this.handleInputChange=t=>{this.verifyDeleteText=t.detail};this.handleOverlayRendered=t=>{this.isMenuShown=t.detail};this.taApplicationWasDeleted=a(this,"taApplicationWasDeleted",7)}get confirmDeleteModal(){const t=this.verifyDeleteText!==this.application.name||this.deletingApplication;return i("ta-modal",{useDefaultFooter:false,titleText:"Are you absolutely sure?",display:this.displayConfirmModal,onTaClose:this.toggleConfirmModal},i("div",{class:"confirm-delete-content-wrapper"},i("p",{class:"confirm-description"},"This action cannot be undone. This will permanently delete the ",i("strong",null,this.application.name)," application, and remove all files associated with it.",i("br",null),i("br",null),"Please type ",i("strong",null,this.application.name)," to confirm."),i("ta-input",{label:"Application Name",onTaInput:this.handleInputChange,type:"text",value:this.verifyDeleteText}),i("ta-button",{disabled:t,onTaClick:this.deleteApplication,loading:this.deletingApplication},"I understand the consequences, delete this application")))}render(){if(this.create){return i(o,{class:{create:true}},i("div",{class:"card-wrapper"},i("div",{class:"card-top"},i("ta-icon",{icon:"add-folder"})),i("div",{class:"card-bottom"},i("div",{class:"card-title"},"Create New Application"),i("div",{class:"card-subtitle"},i("div",{class:"subtitle-block"})))))}return i(o,null,i("stencil-route-link",{url:`/applications/${this.application.id}`},i("div",{class:"card-wrapper"},i("div",{class:"card-top"},i("div",{class:"icons"},i("ta-icon",{icon:"folder"}),i("ta-dropdown",{onTaOverlayRendered:this.handleOverlayRendered,ref:t=>this.dropdownEl=t,overlay:this.getEditMenu()},i("div",{class:{"vertical-dots-icon":true,active:this.isMenuShown}},i("ta-icon",{icon:"vertical-dots"}))))),i("div",{class:"card-bottom"},i("div",{class:"card-title"},this.name()),i("div",{class:"card-subtitle"},this.application.storageEngine," - ",this.application.deliveryUrl)))),this.confirmDeleteModal)}});n(c);c.style=r}}}));