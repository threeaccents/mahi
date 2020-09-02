System.register(["./p-05ba43f8.system.js","./p-66394cbe.system.js","./p-a4031362.system.js","./p-f2ebe6a2.system.js","./p-16d83290.system.js","./p-4919965f.system.js"],(function(e){"use strict";var t,s,i,r,a,o,n;return{setters:[function(e){t=e.r;s=e.h;i=e.d;r=e.H},function(){},function(e){a=e.i},function(){},function(e){o=e.t},function(e){n=e.U}],execute:function(){const l=":host{display:block;height:58px;background:white;border-radius:12px;-webkit-box-shadow:0 4px 12px 0 #00000024;box-shadow:0 4px 12px 0 #00000024;position:relative}:host(.create){opacity:.5;cursor:pointer}:host(.create:hover){-webkit-box-shadow:0 6px 12px 0 rgba(0, 0, 0, 0.44);box-shadow:0 6px 12px 0 rgba(0, 0, 0, 0.44)}.wrapper{padding:0 16px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;height:100%}.left-side{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:100%}.icon{width:22px;opacity:.5}.name{margin-left:18px;font-size:16px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:#526981}.action-icon{margin-left:18px}.action-icon.plus{font-size:19px;font-weight:100;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;text-align:center;color:#526981}.admin{margin-left:24px;font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#a6b7c7}.subtitle-block{margin-top:4px;width:95px;height:11px;background-color:#c3cbd3}.right-side{display:-ms-flexbox;display:flex;height:100%;-ms-flex-align:center;align-items:center;position:relative}a{text-decoration:none}ta-dropdown{--ta-dropdown-background-color:var(--primary-text-color);--ta-dropdown-box-shadow:0 2px 12px 0 rgba(82, 105, 129, 0.25);--ta-dropdown-width:fit-content;--ta-dropdown-padding:10px 8px;--ta-dropdown-transform:translate3d(-115px, 5px, 0);--ta-dropdown-initial-transform:translate3d(-115px, 0, 0px);--ta-dropdown-arrow-color:transparent}.edit-menu-item{font-size:14px;color:white;padding:0 12px;height:32px;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-radius:3px;white-space:nowrap}.edit-menu-item:hover{background-color:var(--dark-text-color)}ta-modal{--ta-modal-height:120px}.vertical-dots-icon{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;text-align:center;-ms-flex-align:center;align-items:center;border-radius:50%;height:28px;width:28px;cursor:pointer}.vertical-dots-icon:hover{background-color:rgba(0, 0, 0, 0.04)}.vertical-dots-icon.active{background-color:rgba(0, 0, 0, 0.04)}";const d=e("ta_user_list_card",class{constructor(e){t(this,e);this.displayConfirmModal=false;this.deletingUser=false;this.isMenuShown=false;this.create=false;this.toggleConfirmModal=()=>{this.displayConfirmModal=!this.displayConfirmModal};this.deleteUser=()=>{n().deleteUser(this.user.id).then(this.onSuccess).catch(this.onError).finally(()=>this.deletingUser=false)};this.onSuccess=()=>{o().success("User was deleted");this.toggleConfirmModal();this.taUserWasDeleted.emit(this.user.id)};this.onError=e=>{if(e.error){return o().danger(e.error)}o().danger("User failed to delete")};this.handleEditUser=()=>{this.dropdownEl.close();this.history.push(`?userId=${this.user.id}#editUser`,{user:this.user})};this.handleDeleteUser=()=>{this.toggleConfirmModal()};this.getEditMenu=()=>s("div",{class:"edit-menu"},s("div",{class:"edit-menu-item",onClick:this.handleEditUser},"Edit user"),s("div",{class:"edit-menu-item",onClick:this.handleDeleteUser},"Remove user"));this.handleOverlayRendered=e=>{this.isMenuShown=e.detail};this.taUserWasDeleted=i(this,"taUserWasDeleted",7)}get fullName(){const{firstName:e,lastName:t}=this.user;const s=`${e} ${t}`;return s.length<=25?s:`${s.substr(0,22)}...`}get confirmDeleteModal(){return s("ta-modal",{titleText:`Delete ${this.fullName}`,bodyText:"Are you sure you want to delete this user?",confirmBtnText:"Delete",display:this.displayConfirmModal,onTaClose:this.toggleConfirmModal,onTaSubmit:this.deleteUser,loading:this.deletingUser})}render(){if(this.create){return s(r,{class:{create:true}},s("div",{class:"wrapper"},s("div",{class:"left-side"},s("div",{class:"icon"},s("ta-icon",{icon:"add-person"})),s("div",{class:"name"},"Create User")),s("div",{class:"right-side"},s("div",{class:"avatars"}),s("div",{class:"action-icon plus"},s("ta-icon",{icon:"add"})))))}return s(r,null,s("div",{class:"wrapper"},s("div",{class:"left-side"},s("div",{class:"avatar"},s("ta-avatar",{text:this.fullName})),s("div",{class:"name"},this.fullName),s("div",{class:"admin"},this.user.isAdmin?"Administrator":"")),s("div",{class:"right-side"},s("ta-dropdown",{onTaOverlayRendered:this.handleOverlayRendered,ref:e=>this.dropdownEl=e,overlay:this.getEditMenu()},s("div",{class:{"vertical-dots-icon":true,active:this.isMenuShown}},s("ta-icon",{icon:"vertical-dots"}))))),this.confirmDeleteModal)}});a(d);d.style=l}}}));