import{r as t,d as s,h as e,H as i}from"./p-cd2828d1.js";import{i as a,a as r}from"./p-bb39c509.js";import"./p-4c11f27f.js";import{t as o}from"./p-df5b8a0d.js";import{U as l}from"./p-1f4f58ae.js";const n={firstName:"",lastName:"",email:"",password:"",isAdmin:!1},h={fullName:"",password:"",email:"",error:""},c=class{constructor(e){t(this,e),this.newUser=n,this.formErr=h,this.creatingUser=!1,this.fullName="",this.onSubmit=t=>{t.preventDefault(),this.validate().then(this.createUser).catch(this.handleValidationErrors)},this.handleValidationErrors=t=>{this.formErr=t},this.createUser=()=>{this.creatingUser=!0;const t=this.getPayload();l().createUser(t).then(this.onSuccess).catch(this.handleError).finally(()=>this.creatingUser=!1)},this.getLastName=()=>{const t=this.fullName.split(" ");return t.shift(),t.join(" ")},this.getPayload=()=>Object.assign(Object.assign({},this.newUser),{firstName:this.fullName.split(" ")[0],lastName:this.getLastName()}),this.onSuccess=t=>{o().success(`${t.data.firstName} ${t.data.lastName} was created!`),this.resetForm(),this.taUserWasCreated.emit(t.data),this.history.push("/users")},this.handleError=t=>{if(!t.error)return this.formErr.error="Oops! Something went wrong. Please refresh and try again",console.log(t);const s=t.error;s.includes("email is taken")?this.formErr=Object.assign(Object.assign({},this.formErr),{email:"Email is taken"}):o().danger(s)},this.validate=()=>{const{newUser:t}=this;let s={};return""===this.fullName&&(s=Object.assign(Object.assign({},s),{fullName:"Full name is required"})),this.fullName&&!a(this.fullName)&&(s=Object.assign(Object.assign({},s),{fullName:"Please enter a valid full name"})),""===t.email&&(s=Object.assign(Object.assign({},s),{email:"Email is required"})),t.email&&!r(t.email)&&(s=Object.assign(Object.assign({},s),{email:"Please enter a valid email address"})),""===t.password&&(s=Object.assign(Object.assign({},s),{password:"Password is required"})),t.password&&t.password.length<7&&(s=Object.assign(Object.assign({},s),{password:"Password must be at least 7 characters long"})),0===Object.keys(s).length?Promise.resolve():Promise.reject(s)},this.updateNewUser=(t,s)=>{this.formErr=h,this.newUser=Object.assign(Object.assign({},this.newUser),{[t]:s})},this.updateFullName=t=>{this.formErr=h,this.fullName=t},this.resetForm=()=>{this.newUser=n,this.formErr=h},this.handleClose=()=>{const t=this.history.location.pathname;this.resetForm(),this.history.push(t)},this.taUserWasCreated=s(this,"taUserWasCreated",7)}render(){const{newUser:t,formErr:s}=this;return e(i,null,e("div",{class:"header"},e("div",{class:"close-icon",onClick:this.handleClose},e("ta-icon",{icon:"close"}))),e("ta-form",{onTaSubmit:t=>this.onSubmit(t)},e("label",null,"Create User"),e("ta-input",{value:this.fullName,label:"Full Name",onTaInput:t=>this.updateFullName(t.detail),error:s.fullName}),e("ta-input",{value:t.email,label:"Email",onTaInput:t=>this.updateNewUser("email",t.detail),error:s.email}),e("ta-input",{type:"password",value:t.password,label:"Password",onTaInput:t=>this.updateNewUser("password",t.detail),error:s.password}),e("ta-switch-button",{initialChecked:t.isAdmin,label:"Administrator",onTaChange:t=>this.updateNewUser("isAdmin",t.detail)}),e("ta-error",{error:s.error}),e("ta-button",{type:"submit",loading:this.creatingUser,onTaClick:t=>this.onSubmit(t)},"Create User"),e("ta-button",{color:"white",onTaClick:this.handleClose},"Cancel")))}};c.style=":host{display:block}.form-title{font-size:24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;color:var(--primary-text-color)}label{font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:var(--dark-text-color);margin-bottom:24px;display:block}.header{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end}.close-icon{font-size:24px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.09px;text-align:center;color:var(--light-text-color);cursor:pointer}ta-icon{--ta-icon-fill:#c3cbd3}";export{c as create_user_view}