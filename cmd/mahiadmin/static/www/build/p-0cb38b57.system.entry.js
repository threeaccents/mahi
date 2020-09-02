System.register(["./p-05ba43f8.system.js","./p-aec35cab.system.js","./p-f2ebe6a2.system.js","./p-2abf2625.system.js","./p-16d83290.system.js"],(function(e){"use strict";var t,i,s,o,r,n,a,l,d,c,p;return{setters:[function(e){t=e.r;i=e.h;s=e.H;o=e.d},function(e){r=e.r;n=e.l;a=e.c;l=e.f},function(e){d=e.B},function(e){c=e.F},function(e){p=e.t}],execute:function(){const h=":host{display:block;border-left:solid 3px #e5e5e5}.header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:start;align-items:flex-start;border-bottom:solid 2px #c3cbd3;padding-bottom:12px}.title{font-size:14px;font-weight:500;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-0.05px;color:#425a70}.metrics{margin-top:43px}.metric-item{margin-top:12px}.metric-item:first-child{margin-top:0}.label{font-size:12px;font-weight:900;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#425a70}.value{margin-top:4px;font-size:12px;font-weight:100;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#6886a2}";const u=e("application_details_sidebar",class{constructor(e){t(this,e)}render(){return i(s,null,i("ta-app-page",null,i("div",{class:"header"},i("div",{class:"title"},"Details"),i("ta-icon",{icon:"settings"}))))}});u.style=h;const g={concurrentUploads:3};const f=5e6;class x{constructor(){this.config=g;this.file=null;this.activeConnections=[];this.chunksQueue=[];this.applicationId="";this.uploadId="";this.chunksQuantity=0;this.progressCache=[];this.uploadedSize=0}setConfig(e){console.log(e)}setup(e,t){if(!t)throw new Error("file is empty");this.file=t;this.applicationId=e;this.uploadId=this.createUploadId();this.chunksQuantity=Math.ceil(this.file.size/f);this.chunksQueue=new Array(this.chunksQuantity).fill(1).map((e,t)=>t)}start(e,t){this.setup(e,t);this.sendNextChunk()}sendNextChunk(){const e=Object.keys(this.activeConnections).length;if(e>=this.config.concurrentUploads){return}if(!this.chunksQueue.length){if(!e){this.sendCompleted().then(e=>{this["onSuccess"](e)}).catch(e=>{this["onError"](e)})}return}const t=this.chunksQueue.pop();const i=t*f;const s=this.file.slice(i,i+f);this.sendChunk(s,t).then(()=>{this.sendNextChunk()}).catch(()=>{this.chunksQueue.push(t);setTimeout(()=>{this.sendNextChunk()},4200)});this.sendNextChunk()}sendCompleted(){return new Promise((e,t)=>{const i={applicationId:this.applicationId,fileName:this.file.name,uploadId:this.uploadId};const s=`${d()}/chunks-completed`;fetch(s,{method:"POST",headers:{Authorization:`Bearer ${window.localStorage.getItem("token")}`,"Content-Type":"application/json"},body:JSON.stringify(i)}).then(e=>e.json()).then(i=>{if(i.error)return t(i);e(i)}).catch(e=>{t(e)})})}sendChunk(e,t){return new Promise(async(i,s)=>{try{await this.upload(e,t);i()}catch(o){s(o);return}})}regularUpload(e,t){const i=`${d()}/upload`;const s=new XMLHttpRequest;s.responseType="json";s.open("POST",i,true);s.setRequestHeader("Authorization",`Bearer ${window.localStorage.getItem("token")}`);s.upload.onprogress=e=>{this["onProgress"](e.loaded,e.total)};s.onerror=()=>{this["onError"]()};s.onload=()=>{if(s.status===201){this["onSuccess"](s.response);return}this["onError"]()};const o=new FormData;o.append("application_id",e);o.append("file_name",t.name);o.append("file",t);s.send(o)}upload(e,t){return new Promise((i,s)=>{const o=this.activeConnections[t]=new XMLHttpRequest;o.upload.addEventListener("progress",e=>this.handleProgress(e,t));o.addEventListener("error",e=>this.handleProgress(e,t));o.addEventListener("abort",e=>this.handleProgress(e,t));o.addEventListener("loadend",e=>this.handleProgress(e,t));const r=`${d()}/chunk-upload`;o.open("post",r,true);o.setRequestHeader("Authorization",`Bearer ${window.localStorage.getItem("token")}`);o.onreadystatechange=()=>{if(o.readyState===4&&o.status===200){i();delete this.activeConnections[t]}};o.onerror=e=>{s(e);delete this.activeConnections[t]};o.onabort=()=>{s(new Error("Upload canceled by user"));delete this.activeConnections[t]};const n=new FormData;n.append("upload_id",this.uploadId);n.append("chunk_number",t.toString());n.append("total_chunks",this.chunksQuantity.toString());n.append("total_file_size",this.file.size.toString());n.append("file_name",this.file.name);n.append("application_id",this.applicationId);n.append("data",e);o.send(n)})}handleProgress(e,t){if(e.type==="progress"||e.type==="error"||e.type==="abort"){this.progressCache[t]=e.loaded}if(e.type==="loadend"){this.uploadedSize+=this.progressCache[t]||0;delete this.progressCache[t]}const i=Object.keys(this.progressCache).reduce((e,t)=>e+=this.progressCache[t],0);const s=Math.min(this.uploadedSize+i,this.file.size);this["onProgress"](s,this.file.size)}createUploadId(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const t=Math.random()*16|0,i=e=="x"?t:t&3|8;return i.toString(16)}))}on(e,t){this[e]=t}}const m=function(){const e=new x;return Object.freeze({options(t){e.setConfig(t);return this},send(t,i){if(i.size>f){e.start(t,i);return this}e.regularUpload(t,i);return this},onProgress(t){e.on("onProgress",t);return this},onError(t){e.on("onError",t);return this},onSuccess(t){e.on("onSuccess",t);return this}})};const y=":host{display:block;width:var(--ta-dragger-width, 100%);height:var(--ta-dragger-height, 100%);border-radius:12px;position:relative}:host(.dragging){border:solid 2px var(--primary-color);background:rgba(254, 110, 113, .1)}.gallery{position:fixed;width:400px;bottom:20px;right:20px}.gallery-heading{height:50px;background:var(--primary-color);border-radius:12px 12px 0 0;position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;color:white;font-size:14px;padding:0 20px}ta-card{--ta-card-padding:0}";const b=e("ta_dragger",class{constructor(e){t(this,e);this.dragging=false;this.previewFiles=[];this.handleDragEnter=e=>{this.stopDefaults(e);this.dragging=true};this.handleDragLeave=e=>{this.stopDefaults(e);this.dragging=false};this.handleDragOver=e=>{this.stopDefaults(e);this.dragging=true};this.handleDrop=e=>{this.stopDefaults(e);this.dragging=false;Array.from(e.dataTransfer.files).forEach(e=>{this.previewFile(e)})};this.stopDefaults=e=>{e.preventDefault();e.stopPropagation()};this.uploadFile=(e,t)=>{m().options({}).send(this.applicationId,e).onProgress((e,i)=>{this.previewFiles=this.previewFiles.map(s=>{if(s.id!==t.id)return s;return Object.assign(Object.assign({},s),{progress:e*100/i})})}).onSuccess(e=>{const i=e.data;i.dataUrl=t.src;this.taFileUpload.emit(i);this.previewFiles=this.previewFiles.filter(e=>e.id!==t.id);return}).onError(()=>{this.previewFiles=this.previewFiles.map(e=>{if(e.id!==t.id)return e;return Object.assign(Object.assign({},e),{failed:true})})})};this.previewFile=e=>{const t=e.type.split("/")[0];let i={id:r(1e4),progress:0,name:n(e.name,48),failed:false,isImage:false,src:""};if(t!=="image"){this.uploadFile(e,i);this.previewFiles=[...this.previewFiles,i];return}let s=new FileReader;s.readAsDataURL(e);s.onloadend=()=>{i=Object.assign(Object.assign({},i),{src:s.result,isImage:true});this.uploadFile(e,i);this.previewFiles=[...this.previewFiles,i]}};this.taFileUpload=o(this,"taFileUpload",7)}get uploadingFilesCount(){const e=this.previewFiles.filter(e=>!e.failed).length;return e===1?`Uploading 1 item`:`Uploading ${e} items`}render(){return i(s,{onDragEnter:this.handleDragEnter,onDragOver:this.handleDragOver,onDragLeave:this.handleDragLeave,onDrop:this.handleDrop,class:{dragging:this.dragging}},i("slot",null),this.previewFiles.length>0?i("div",{class:"gallery"},i("ta-card",null,i("div",{class:"gallery-heading"},"Uploading 1 item"),this.previewFiles.map(e=>i("ta-dragger-preview-file",{file:e})))):null)}});b.style=y;const v=":host{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;border-radius:6px;height:210px;-webkit-box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14);box-shadow:0 4px 12px 0 rgba(0, 0, 0, 0.14)}.names{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between}.no-image{height:100%;position:relative;border-radius:6px 6px 0 0;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.file-card-image{height:100%;border-radius:6px 6px 0 0;background-size:cover;background-position:center;position:relative;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background-repeat:no-repeat}.file-card-image.default-img{background-size:initial;background-repeat:no-repeat}.image-details{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:white;border-top:solid 1px var(--light-border-color);border-bottom:solid 1px var(--light-border-color);border-radius:0 0 6px 6px;padding:0 4px;-ms-flex-pack:distribute;justify-content:space-around;min-height:50px}.details{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:white;border-top:solid 1px var(--light-border-color);border-bottom:solid 1px var(--light-border-color);height:auto;border-radius:0 0 6px 6px;padding:0 4px;-ms-flex-pack:distribute;justify-content:space-around;min-height:50px}.tags{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:start;justify-content:flex-start;width:100px;overflow-x:scroll;-ms-overflow-style:none}.tags::-webkit-scrollbar{display:none}.tag{padding:2px;font-size:12px;color:white;background-color:var(--primary-text-color);border-radius:3px;margin-left:2px;white-space:nowrap}.file-name{font-size:14px;color:var(--primary-text-color)}.other-details{height:15px;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;font-size:12px;color:var(--light-text-color)}.overlay{position:absolute;top:0;right:0;left:0;bottom:0;background-color:rgba(0, 0, 0, 0.4);opacity:0;border-radius:6px 6px 0 0}.control-icon{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;text-align:center;-ms-flex-align:center;align-items:center;border-radius:50%;height:28px;width:28px}.control-icon:hover{background-color:white}.control-icon ta-icon{cursor:pointer}:host(:hover) .overlay{opacity:1;-webkit-transition:opacity 0.3s;transition:opacity 0.3s}.controls{position:absolute;bottom:4px;right:10px;opacity:0;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}:host(:hover) .controls{opacity:1;-webkit-transition:opacity 0.4s;transition:opacity 0.4s}ta-icon{--ta-icon-fill:#fff;--ta-icon-width:14px;--ta-icon-height:14px}ta-icon:hover{--ta-icon-fill:var(--primary-color)}ta-modal{--ta-modal-height:120px}";const w=`url('../../../assets/file.svg')`;const k=e("ta_file_card",class{constructor(e){t(this,e);this.displayConfirmModal=false;this.deletingFile=false;this.onCopyClick=e=>{e.preventDefault();e.stopPropagation();a(this.file.url);p().success("File link copied to clipboard")};this.onDeleteClick=()=>{this.toggleConfirmModal()};this.onSuccess=()=>{p().success("File was deleted");this.toggleConfirmModal();this.taFileWasDeleted.emit(this.file)};this.onError=e=>{if(e.error){p().danger(e.error);return}p().danger("Error deleting file")};this.toggleConfirmModal=()=>{this.displayConfirmModal=!this.displayConfirmModal};this.deleteFile=()=>{this.deletingFile=true;c().delete(this.file.id).then(this.onSuccess).catch(this.onError).finally(()=>this.deletingFile=false)};this.taFileWasDeleted=o(this,"taFileWasDeleted",7)}get backgroundImg(){const{file:e}=this;return e.dataUrl?`url(${e.dataUrl})`:`url(${this.file.url}?width=450)`}get fileImg(){const{file:e}=this;return e.dataUrl?e.dataUrl:`${this.file.url}?width=240`}get shouldPreview(){return this.file.mimeType==="image"}get confirmDeleteModal(){return i("ta-modal",{titleText:`Delete ${this.file.fileName}`,bodyText:"Are you sure you want to delete this file?",confirmBtnText:"Delete",display:this.displayConfirmModal,onTaClose:this.toggleConfirmModal,onTaSubmit:this.deleteFile,loading:this.deletingFile})}render(){return i(s,null,i("div",{class:{"file-card-image":true,"default-img":!this.shouldPreview},style:{backgroundImage:this.shouldPreview?this.backgroundImg:w}},i("div",{class:"overlay"}),i("div",{class:"controls"},i("div",{class:"control-icon"},i("ta-icon",{onTaClick:this.onCopyClick,icon:"copy"})),i("div",{class:"control-icon"},i("ta-icon",{onTaClick:this.onDeleteClick,icon:"trash"})))),i("div",{class:"image-details"},i("div",{class:"names"},i("ta-tooltip",{text:this.file.fileName},i("div",{class:"file-name"},n(this.file.fileName,12)))),i("div",{class:"other-details"},i("div",{class:"type"},this.file.extension.toUpperCase()),i("div",{class:"file-size"},`${l(this.file.size,1)}`))),this.confirmDeleteModal)}});k.style=v}}}));