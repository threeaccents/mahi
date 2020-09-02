import{r as t,h as s,H as i,d as e,g as a}from"./p-cd2828d1.js";import{m as r,i as o,a as l}from"./p-bb39c509.js";import{g as n,B as h,p as d,b as c,d as b,D as p,s as u,a as m}from"./p-4c11f27f.js";import{t as f}from"./p-df5b8a0d.js";import{U as g}from"./p-1f4f58ae.js";function w(){function t(t){localStorage.setItem("amountDue",t.data.amountDue.toString())}return Object.freeze({getBilling:()=>n(`${h()}/invoices`),setBilling(){this.getBilling().then(t)},listCards:()=>n(`${h()}/cards`),createCard:t=>d(`${h()}/cards`,t),updateCard:(t,s)=>c(`${h()}/cards/${t}`,s),deleteCard:t=>b(`${h()}/cards/${t}`)})}const v=class{constructor(s){t(this,s),this.cards=[],this.fetchingCards=!1,this.creatingCard=!1,this.formError="",this.getCards=()=>{this.fetchingCards=!0,w().listCards().then(this.handleSuccess).catch(this.handleError).finally(()=>this.fetchingCards=!1)},this.handleSuccess=t=>{this.cards=t.data},this.handleError=t=>{if(!t.error)return f().danger(p),console.log(t);this.formError=t.error},this.onSubmit=t=>{t.preventDefault(),this.creatingCard=!0,this.stripeEl.createToken().then(this.createCard).then(this.handleCreateCardSuccess).catch(this.handleError).finally(()=>this.creatingCard=!1)},this.createCard=t=>{const s={token:t.token.id,brand:t.token.card.brand,lastFour:parseInt(t.token.card.last4),exp:`${t.token.card.exp_month}/${t.token.card.exp_year}`};return w().createCard(s)},this.handleCreateCardSuccess=t=>{f().success("Card was added!"),this.cards=[...this.cards,t.data],this.stripeEl.reset()},this.deleteCard=t=>{const s=t.detail;w().deleteCard(s).then(()=>this.handleDeleteCardSuccess(s)).catch(this.handleError)},this.handleDeleteCardSuccess=t=>{f().success("Card was deleted"),this.cards=this.cards.filter(s=>s.id!==t)},this.handleUpdateCardSuccess=t=>{f().success("Card set as default");const s=this.cards.map(s=>Object.assign(Object.assign({},s),{isDefault:s.id===t}));this.cards=[...s]},this.setDefaultCard=t=>{const s=t.detail;w().updateCard(s,{isDefault:!0}).then(()=>this.handleUpdateCardSuccess(s)).catch(this.handleError)}}componentWillLoad(){this.getCards()}render(){return s(i,null,s("ta-card",null,s("ta-form-label",null,"Cards"),this.fetchingCards?s("ta-loader",null):s("div",{class:"cards"},this.cards.map(t=>s("ta-billing-card",{key:t.id,card:t,onTaSetDefaultClick:this.setDefaultCard,onTaDeleteClick:this.deleteCard}))),s("ta-form-label",null,"Add Card"),s("ta-form",{onTaSubmit:t=>this.onSubmit(t)},s("div",{style:{position:"relative"}},s("stripe-elements",{onChange:()=>this.formError="","show-error":!0,ref:t=>this.stripeEl=t,"publishable-key":u()})),s("ta-error",{error:this.formError}),s("ta-button",{loading:this.creatingCard,onTaClick:t=>this.onSubmit(t)},"Add Card"))))}};v.style=":host{display:block}ta-button{--ta-button-width:150px}.cards{margin-bottom:30px}stripe-elements::part(stripe){border-radius:var(--border-radius);border:solid 2px var(--light-border-color);-webkit-box-shadow:none;box-shadow:none;height:42px;display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;-ms-flex-pack:center;justify-content:center;background-color:var(--ta-input-bg-color, var(--primary-input-bg-color));color:var(--primary-text-color);width:100%;font-size:20px}stripe-elements[complete]::part(stripe){border-color:var(--material-green-a700, #00C853)}stripe-elements[invalid]::part(stripe){border-color:var(--material-amber-a700, #FFAB00)}stripe-elements[error]::part(stripe){border-color:var(--primary-error-color)}stripe-elements::part(error){padding:0;font-size:14px;font-weight:500;color:var(--primary-error-color)}.spin-icon{position:absolute;margin:auto;width:15px;height:15px;top:12px;right:20px;border:solid 2px #fff;border-top-color:#ff3b3b;border-left-color:#ff3b3b;border-right-color:#ff3b3b;border-radius:20px;-webkit-animation:loading-spinner 500ms linear infinite;animation:loading-spinner 500ms linear infinite}";const O={fullName:"",email:"",oldPassword:"",password:"",serverError:""},j={oldPassword:"",password:"",fetchingApi:!1},x=class{constructor(s){t(this,s),this.initialMe=r(),this.me=this.initialMe,this.formErr=O,this.updatingUser=!1,this.updatePasswordState=j,this.onSubmit=t=>{t.preventDefault(),this.validate().then(this.updateUser).catch(this.handleValidationErrors)},this.updateUser=()=>{this.updatingUser=!0;const t=Object.assign(Object.assign({},this.me),{firstName:this.fullName.split(" ")[0],lastName:this.getLastName()});g().updateUser(this.me.id,t).then(this.onSuccess).catch(this.handleError).finally(()=>this.updatingUser=!1)},this.onSuccess=t=>{f().success("Your info was updated!"),localStorage.setItem("me",JSON.stringify(t.data))},this.handleError=t=>{if(!t.error)return this.formErr.serverError="Oops! Something went wrong. Please refresh and try again",console.log(t);const s=t.error;s.includes("email is taken")?this.formErr=Object.assign(Object.assign({},this.formErr),{email:"Email is taken"}):s.includes("invalid credentials")?this.formErr=Object.assign(Object.assign({},this.formErr),{oldPassword:"password is incorrect"}):f().danger(s)},this.handleValidationErrors=t=>{this.formErr=t},this.onUpdatePasswordSubmit=t=>{t.preventDefault(),this.validateUpdatePassword().then(this.updatePassword).catch(this.handleValidationErrors)},this.updatePassword=()=>{this.updatePasswordState.fetchingApi=!0;const{password:t,oldPassword:s}=this.updatePasswordState,i={userId:this.me.id,oldPassword:s,password:t};g().updatePassword(i).then(this.handleUpdatePasswordSuccess).catch(this.handleError).finally(()=>this.updatePasswordState.fetchingApi=!1)},this.handleUpdatePasswordSuccess=()=>{f().success("password was updated"),this.updatePasswordState=j},this.getLastName=()=>{const t=this.fullName.split(" ");return t.shift(),t.join(" ")},this.updatePasswordField=(t,s)=>{this.formErr=O,this.updatePasswordState=Object.assign(Object.assign({},this.updatePasswordState),{[t]:s})},this.updateMe=(t,s)=>{if(this.formErr=O,"fullName"!==t)this.me=Object.assign(Object.assign({},this.me),{[t]:s});else{const t=s.split(" ")[0],i=s.split(" ");i.shift();const e=i.join(" ");this.me=Object.assign(Object.assign({},this.me),{firstName:t,lastName:e})}},this.validate=()=>{const{me:t}=this;let s={};return this.fullName&&""!==this.fullName||(s=Object.assign(Object.assign({},s),{fullName:"Full name is required"})),o(this.fullName)||(s=Object.assign(Object.assign({},s),{fullName:"Please enter your full name (first & last name)."})),""===t.email&&(s=Object.assign(Object.assign({},s),{email:"Email is required"})),l(t.email)||(s=Object.assign(Object.assign({},s),{email:"Please enter a valid email address"})),0===Object.keys(s).length?Promise.resolve():Promise.reject(s)},this.validateUpdatePassword=()=>{const{password:t,oldPassword:s}=this.updatePasswordState;let i={};return""===s&&(i=Object.assign(Object.assign({},i),{oldPassword:"Old password is required"})),""===t&&(i=Object.assign(Object.assign({},i),{password:"Password is required"})),t.length<7&&(i=Object.assign(Object.assign({},i),{password:"Password must be at least 7 characters long"})),0===Object.keys(i).length?Promise.resolve():Promise.reject(i)}}get fullName(){return`${this.me.firstName} ${this.me.lastName}`.trimRight()}get hasNotFilledOutPasswordFields(){return!this.updatePasswordState.oldPassword||!this.updatePasswordState.password}get hasNotChangedPersonalInfo(){return JSON.stringify(this.me)===JSON.stringify(this.initialMe)}render(){return s(i,null,s("ta-card",null,s("ta-form-label",null,"Personal Info"),s("form",{onSubmit:this.onSubmit},s("ta-input",{onTaInput:t=>this.updateMe("fullName",t.detail),value:this.fullName,error:this.formErr.fullName,label:"Full Name"}),s("ta-input",{onTaInput:t=>this.updateMe("email",t.detail),value:this.me.email,error:this.formErr.email,label:"Email"}),s("ta-button",{disabled:this.hasNotChangedPersonalInfo,onTaClick:this.onSubmit,type:"submit",loading:this.updatingUser},"Update")),s("hr",null),s("ta-form-label",null,"Update Password"),s("form",null,s("ta-input",{onTaInput:t=>this.updatePasswordField("oldPassword",t.detail),value:this.updatePasswordState.oldPassword,label:"Current Password",error:this.formErr.oldPassword,type:"password"}),s("ta-input",{error:this.formErr.password,value:this.updatePasswordState.password,type:"password",onTaInput:t=>this.updatePasswordField("password",t.detail),label:"Update Password"}),s("ta-button",{disabled:this.hasNotFilledOutPasswordFields,onTaClick:this.onUpdatePasswordSubmit,loading:this.updatePasswordState.fetchingApi,class:"update-password-btn"},"Update Password"))))}};x.style="hr{border:solid 1px #e2e6ef;margin:30px 0}ta-button{--ta-button-width:150px}ta-button.update-password-btn{--ta-button-width:200px}";const y={email:"",serverError:""},P=class{constructor(s){t(this,s),this.initialSpace=r().space,this.space=this.initialSpace,this.updatingSpace=!1,this.formErr=y,this.onSubmit=t=>{t.preventDefault(),this.validate().then(this.updateSpace).catch(t=>this.formErr=t).finally(()=>this.updatingSpace=!1)},this.updateSpace=()=>(this.updatingSpace=!0,Object.freeze({setStorage:t=>m(`${h()}/spaces`,t),update:t=>m(`${h()}/spaces`,{email:t})}).update(this.space.email).then(this.handleSuccess).catch(this.handleError)),this.handleSuccess=t=>{const s=r();s.space=t.data,localStorage.setItem("me",JSON.stringify(s)),f().success("space was updated")},this.handleError=t=>{if(!t.error)return this.formErr.serverError="Oops! Something went wrong. Please refresh and try again",console.log(t);const s=t.error;s.includes("email is taken")?this.formErr=Object.assign(Object.assign({},this.formErr),{email:"Email is taken"}):f().danger(s)},this.validate=()=>{const{space:t}=this;let s={};return""===t.email&&(s=Object.assign(Object.assign({},s),{email:"Email is required"})),l(t.email)||(s=Object.assign(Object.assign({},s),{email:"Please enter a valid email address"})),0===Object.keys(s).length?Promise.resolve():Promise.reject(s)},this.handleUpdateSpace=(t,s)=>{this.formErr=y,this.space=Object.assign(Object.assign({},this.space),{[t]:s})}}get hasNotUpdatedSpace(){return JSON.stringify(this.initialSpace)===JSON.stringify(this.space)}render(){return s(i,null,s("ta-card",null,s("ta-form-label",null,"Space"),s("form",null,s("ta-input",{type:"email",label:"Email",value:this.space.email,onTaInput:t=>this.handleUpdateSpace("email",t.detail)}),s("ta-button",{disabled:this.hasNotUpdatedSpace,loading:this.updatingSpace,onTaClick:this.onSubmit},"Update"))))}};P.style=":host{display:block}ta-button{--ta-button-width:150px}";const k=class{constructor(s){t(this,s),this.isActive=!1}async activate(){this.isActive=!0}async deactivate(){this.isActive=!1}render(){return s("div",{class:{"ta-tab-body-component":!0,active:this.isActive}},s("slot",null))}};k.style=".ta-tab-body-component{display:none}.ta-tab-body-component.active{display:block}";const C=class{constructor(s){t(this,s),this.isActive=!1}async activate(){this.isActive=!0}async deactivate(){this.isActive=!1}render(){return s("div",{class:{"ta-tab-header-component":!0,active:this.isActive}},s("slot",null))}};C.style=".ta-tab-header-component{position:relative;background-color:transparent;font-size:14px;cursor:pointer;color:var(--primary-text-color);border-width:0px;border-style:initial;border-color:initial;-o-border-image:initial;border-image:initial;padding-bottom:12px;outline:none;bottom:-2px;margin-right:22px;font-weight:500}.ta-tab-header-component.active{border-bottom:2px solid var(--primary-color)}.ta-tab-header-component:hover:not(:disabled):not(.active){border-bottom:2px solid var(--light-border-color)}";const N=class{constructor(s){t(this,s)}render(){return s("div",{class:"ta-tab-header-bar-component"},s("slot",null))}};N.style=".ta-tab-header-bar-component{display:-ms-flexbox;display:flex;margin-bottom:24px;border-bottom:2px solid rgb(221, 221, 221);border-radius:2px;padding:0px}";const S=class{constructor(s){t(this,s),this.headers=[],this.bodies=[],this.initialValue="",this.bindHeaderClickHandlers=t=>{t.forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),this.activateHeader(t.tab),this.activateBody(t.tab),this.taChange.emit(t.tab)})})},this.taChange=e(this,"taChange",7)}componentDidLoad(){this.getHeaders(),this.getBodies()}getHeaders(){const t=this.$el.querySelectorAll("ta-tab-header");if(this.headers=Array.from(t),0===this.headers.length)throw new Error("[ta-tabs] Must have at least one ta-tab-header");""===this.initialValue?this.headers[0].activate():this.activateHeader(this.initialValue),this.bindHeaderClickHandlers(this.headers)}activateHeader(t){const s=this.headers.find(s=>s.tab===t);this.deactivateHeaders(),s.activate()}deactivateHeaders(){this.headers.forEach(t=>t.deactivate())}getBodies(){const t=this.$el.querySelectorAll("ta-tab-body");if(this.bodies=Array.from(t),0===this.bodies.length)throw new Error("[ta-tabs] Must have at least one ta-tab-header");""===this.initialValue?this.bodies[0].activate():this.activateBody(this.initialValue)}activateBody(t){const s=this.bodies.find(s=>s.tab===t);this.deactivateBodies(),s.activate()}deactivateBodies(){this.bodies.forEach(t=>t.deactivate())}render(){return s("div",{class:"ta-tabs-component"},s("slot",null))}get $el(){return a(this)}};S.style="ta-tabs{}";export{v as billing_setting_view,x as personal_setting_view,P as space_setting_view,k as ta_tab_body,C as ta_tab_header,N as ta_tab_header_bar,S as ta_tabs}