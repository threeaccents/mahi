import{r as t,h as e,d as i,H as s}from"./p-cd2828d1.js";import"./p-961bf148.js";import{i as r}from"./p-eb3867fb.js";import{l as o}from"./p-bb39c509.js";import"./p-4c11f27f.js";import{t as a}from"./p-df5b8a0d.js";import{U as d}from"./p-1f4f58ae.js";const l=class{constructor(s){t(this,s),this.displayConfirmModal=!1,this.deletingUser=!1,this.isMenuShown=!1,this.create=!1,this.handleEditUser=()=>{this.dropdownEl.close(),this.history.push(`?userId=${this.user.id}#editUser`,{user:this.user})},this.getEditMenu=()=>e("div",{class:"edit-menu"},e("div",{class:"edit-menu-item",onClick:this.handleEditUser},"Edit user"),e("div",{class:"edit-menu-item",onClick:this.handleDeleteUser},"Remove user")),this.handleDeleteUser=()=>{this.toggleConfirmModal()},this.toggleConfirmModal=()=>{this.displayConfirmModal=!this.displayConfirmModal},this.deleteUser=()=>{d().deleteUser(this.user.id).then(this.onSuccess).catch(this.onError).finally(()=>this.deletingUser=!1)},this.onSuccess=()=>{a().success("User was deleted"),this.toggleConfirmModal(),this.taUserWasDeleted.emit(this.user.id)},this.onError=t=>{if(t.error)return a().danger(t.error);a().danger("User failed to delete")},this.handleOverlayRendered=t=>{this.isMenuShown=t.detail},this.taUserWasDeleted=i(this,"taUserWasDeleted",7)}get fullName(){const{firstName:t,lastName:e}=this.user;return o(`${t} ${e}`,25)}get initials(){const{firstName:t,lastName:e}=this.user;return`${t[0]}${e[0]}`}get confirmDeleteModal(){return e("ta-modal",{titleText:`Delete ${this.fullName}`,bodyText:"Are you sure you want to delete this user?",confirmBtnText:"Delete",display:this.displayConfirmModal,onTaClose:this.toggleConfirmModal,onTaSubmit:this.deleteUser,loading:this.deletingUser})}render(){return this.create?e(s,{class:{create:!0}},e("div",{class:"card-wrapper"},e("div",{class:"card-top"},e("ta-icon",{class:"add-person-icon",icon:"add-person"})),e("div",{class:"card-bottom"},e("div",{class:"card-title"},"Create New User"),e("div",{class:"card-subtitle"},e("div",{class:"subtitle-block"}))))):e(s,null,e("div",{class:"card-wrapper"},e("div",{class:"card-top"},e("ta-avatar",{text:this.initials}),e("ta-dropdown",{onTaOverlayRendered:this.handleOverlayRendered,ref:t=>this.dropdownEl=t,overlay:this.getEditMenu()},e("div",{class:{"vertical-dots-icon":!0,active:this.isMenuShown}},e("ta-icon",{icon:"vertical-dots"})))),e("div",{class:"card-bottom"},e("div",{class:"card-title"},this.fullName),e("div",{class:"card-subtitle"},this.user.isAdmin?"Administrator":"User"))),this.confirmDeleteModal)}};r(l),l.style=":host{display:block;height:162px;border-radius:12px;-webkit-box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);background-color:#ffffff}:host(.create){opacity:.5;cursor:pointer}:host(.create:hover){-webkit-box-shadow:0 6px 12px 0 rgba(0, 0, 0, 0.44);box-shadow:0 6px 12px 0 rgba(0, 0, 0, 0.44)}.card-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;padding:20px;height:calc(100% - 40px)}a{text-decoration:none}.add-person-icon{opacity:.5}.card-title{font-size:16px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.06px;color:var(--primary-text-color);width:200px}.card-subtitle{margin-top:3px;font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:var(--extra-light-text-color)}.subtitle-block{margin-top:4px;width:95px;height:11px;background-color:#c3cbd3}.card-top{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between}.vertical-dots-icon{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;text-align:center;-ms-flex-align:center;align-items:center;border-radius:50%;height:28px;width:28px;cursor:pointer}.vertical-dots-icon:hover{background-color:rgba(0, 0, 0, 0.04)}.vertical-dots-icon.active{background-color:rgba(0, 0, 0, 0.04)}ta-dropdown{--ta-dropdown-background-color:var(--primary-text-color);--ta-dropdown-box-shadow:0 2px 12px 0 rgba(82, 105, 129, 0.25);--ta-dropdown-width:fit-content;--ta-dropdown-padding:10px 8px;--ta-dropdown-transform:translate3d(-115px, 5px, 0);--ta-dropdown-initial-transform:translate3d(-115px, 0, 0px);--ta-dropdown-arrow-color:transparent}.edit-menu-item{font-size:14px;color:white;padding:0 12px;height:32px;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border-radius:3px;white-space:nowrap}.edit-menu-item:hover{background-color:var(--dark-text-color)}ta-modal{--ta-modal-height:120px}";export{l as ta_user_card}