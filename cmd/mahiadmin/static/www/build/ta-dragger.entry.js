import { r as registerInstance, c as createEvent, h, H as Host } from './index-d067c2a6.js';
import { B as BASE_URL } from './index-37baca77.js';
import './validation-9a44dfe6.js';
import './auth-d1cdc736.js';
import { r as randInt, l as limitLen } from './index-fb199afa.js';

const initialConfig = {
    concurrentUploads: 3
};
const chunkSize = 5e+6;
class Uploader {
    constructor() {
        this.config = initialConfig;
        this.file = null;
        this.activeConnections = [];
        this.chunksQueue = [];
        this.applicationId = '';
        this.uploadId = '';
        this.chunksQuantity = 0;
        this.progressCache = [];
        this.uploadedSize = 0;
    }
    setConfig(config) {
        console.log(config);
        // handle overriding config defaults.
    }
    setup(applicationId, file) {
        if (!file)
            throw new Error('file is empty');
        this.file = file;
        this.applicationId = applicationId;
        this.uploadId = this.createUploadId();
        this.chunksQuantity = Math.ceil(this.file.size / chunkSize);
        this.chunksQueue = new Array(this.chunksQuantity).fill(1).map((_, index) => index);
    }
    start(applicationId, file) {
        this.setup(applicationId, file);
        this.sendNextChunk();
    }
    sendNextChunk() {
        const activeConnections = Object.keys(this.activeConnections).length;
        if (activeConnections >= this.config.concurrentUploads) {
            return;
        }
        if (!this.chunksQueue.length) {
            if (!activeConnections) {
                this.sendCompleted()
                    .then(resp => {
                    this["onSuccess"](resp);
                }).catch(err => {
                    this["onError"](err);
                });
            }
            return;
        }
        const chunkId = this.chunksQueue.pop();
        const offset = chunkId * chunkSize;
        const chunk = this.file.slice(offset, offset + chunkSize);
        this.sendChunk(chunk, chunkId)
            .then(() => {
            this.sendNextChunk();
        }).catch(() => {
            // add failed chunk back to the queue
            // do some check if we should add it back to the queue or end the upload
            this.chunksQueue.push(chunkId);
            setTimeout(() => {
                this.sendNextChunk();
            }, 4200);
        });
        this.sendNextChunk();
    }
    sendCompleted() {
        return new Promise((resolve, reject) => {
            const payload = {
                applicationId: this.applicationId,
                fileName: this.file.name,
                uploadId: this.uploadId
            };
            const url = `${BASE_URL()}/chunks-completed`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(resp => resp.json())
                .then(payload => {
                if (payload.error)
                    return reject(payload);
                resolve(payload);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    sendChunk(chunk, chunkId) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.upload(chunk, chunkId);
                resolve();
            }
            catch (error) {
                reject(error);
                return;
            }
        });
    }
    regularUpload(applicationId, file) {
        const url = `${BASE_URL()}/upload`;
        const req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('POST', url, true);
        req.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`);
        req.upload.onprogress = (e) => {
            this["onProgress"](e.loaded, e.total);
        };
        req.onerror = () => {
            this["onError"]();
        };
        req.onload = () => {
            if (req.status === 201) {
                this["onSuccess"](req.response);
                return;
            }
            this["onError"]();
        };
        const formData = new FormData();
        formData.append('application_id', applicationId);
        formData.append('file_name', file.name);
        formData.append('file', file);
        req.send(formData);
    }
    upload(chunk, chunkId) {
        return new Promise((resolve, reject) => {
            const xhr = this.activeConnections[chunkId] = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", (e) => this.handleProgress(e, chunkId));
            xhr.addEventListener("error", (e) => this.handleProgress(e, chunkId));
            xhr.addEventListener("abort", (e) => this.handleProgress(e, chunkId));
            xhr.addEventListener("loadend", (e) => this.handleProgress(e, chunkId));
            // this also will just point to the production servers
            const url = `${BASE_URL()}/chunk-upload`;
            xhr.open("post", url, true);
            // when we make this a library this won't be needed as the intermidiary server will be open.
            xhr.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve();
                    delete this.activeConnections[chunkId];
                }
            };
            xhr.onerror = (error) => {
                reject(error);
                delete this.activeConnections[chunkId];
            };
            xhr.onabort = () => {
                reject(new Error("Upload canceled by user"));
                delete this.activeConnections[chunkId];
            };
            const fd = new FormData();
            fd.append('upload_id', this.uploadId);
            fd.append('chunk_number', chunkId.toString());
            fd.append('total_chunks', this.chunksQuantity.toString());
            fd.append('total_file_size', this.file.size.toString());
            fd.append('file_name', this.file.name);
            fd.append('application_id', this.applicationId);
            fd.append('data', chunk);
            xhr.send(fd);
        });
    }
    handleProgress(event, chunkId) {
        if (event.type === "progress" || event.type === "error" || event.type === "abort") {
            this.progressCache[chunkId] = event.loaded;
        }
        if (event.type === "loadend") {
            this.uploadedSize += this.progressCache[chunkId] || 0;
            delete this.progressCache[chunkId];
        }
        const inProgress = Object.keys(this.progressCache).reduce((memo, id) => memo += this.progressCache[id], 0);
        const sentLength = Math.min(this.uploadedSize + inProgress, this.file.size);
        this["onProgress"](sentLength, this.file.size);
    }
    createUploadId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    on(method, callback) {
        this[method] = callback;
    }
}
const uploader = function () {
    const smartUploader = new Uploader();
    return Object.freeze({
        options(config) {
            smartUploader.setConfig(config);
            return this;
        },
        send(applicationId, file) {
            if (file.size > chunkSize) {
                smartUploader.start(applicationId, file);
                return this;
            }
            smartUploader.regularUpload(applicationId, file);
            return this;
        },
        onProgress(callback) {
            smartUploader.on("onProgress", callback);
            return this;
        },
        onError(callback) {
            smartUploader.on("onError", callback);
            return this;
        },
        onSuccess(callback) {
            smartUploader.on("onSuccess", callback);
            return this;
        }
    });
};

const taDraggerCss = ":host{display:block;width:var(--ta-dragger-width, 100%);height:var(--ta-dragger-height, 100%);border-radius:12px;position:relative}:host(.dragging){border:solid 2px var(--primary-color);background:rgba(254, 110, 113, .1)}.gallery{position:fixed;width:400px;bottom:20px;right:20px}.gallery-heading{height:50px;background:var(--primary-color);border-radius:12px 12px 0 0;position:relative;display:flex;align-items:center;color:white;font-size:14px;padding:0 20px}ta-card{--ta-card-padding:0}";

const TaDragger = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dragging = false;
        this.previewFiles = [];
        this.handleDragEnter = (e) => {
            this.stopDefaults(e);
            this.dragging = true;
        };
        this.handleDragLeave = (e) => {
            this.stopDefaults(e);
            this.dragging = false;
        };
        this.handleDragOver = (e) => {
            this.stopDefaults(e);
            this.dragging = true;
        };
        this.handleDrop = (e) => {
            this.stopDefaults(e);
            this.dragging = false;
            Array.from(e.dataTransfer.files).forEach((file) => {
                this.previewFile(file);
            });
        };
        this.stopDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        this.uploadFile = (file, previewFile) => {
            uploader()
                .options({})
                .send(this.applicationId, file)
                .onProgress((loaded, total) => {
                this.previewFiles = this.previewFiles.map((f) => {
                    if (f.id !== previewFile.id)
                        return f;
                    return Object.assign(Object.assign({}, f), { progress: (loaded * 100.0 / total) });
                });
            })
                .onSuccess((resp) => {
                const payload = resp.data;
                payload.dataUrl = previewFile.src;
                this.taFileUpload.emit(payload);
                this.previewFiles = this.previewFiles.filter(f => f.id !== previewFile.id);
                return;
            })
                .onError(() => {
                this.previewFiles = this.previewFiles.map((f) => {
                    if (f.id !== previewFile.id)
                        return f;
                    return Object.assign(Object.assign({}, f), { failed: true });
                });
            });
        };
        this.previewFile = (file) => {
            const type = file.type.split('/')[0];
            let newFile = {
                id: randInt(10000),
                progress: 0,
                name: limitLen(file.name, 48),
                failed: false,
                isImage: false,
                src: '',
            };
            if (type !== 'image') {
                this.uploadFile(file, newFile);
                this.previewFiles = [...this.previewFiles, newFile];
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                newFile = Object.assign(Object.assign({}, newFile), { src: reader.result, isImage: true });
                this.uploadFile(file, newFile);
                this.previewFiles = [...this.previewFiles, newFile];
            };
        };
        this.taFileUpload = createEvent(this, "taFileUpload", 7);
    }
    get uploadingFilesCount() {
        const count = this.previewFiles.filter(f => !f.failed).length;
        return count === 1 ? `Uploading 1 item` : `Uploading ${count} items`;
    }
    render() {
        return (h(Host, { onDragEnter: this.handleDragEnter, onDragOver: this.handleDragOver, onDragLeave: this.handleDragLeave, onDrop: this.handleDrop, class: {
                'dragging': this.dragging
            } }, h("slot", null), this.previewFiles.length > 0 ?
            h("div", { class: "gallery" }, h("ta-card", null, h("div", { class: "gallery-heading" }, "Uploading 1 item"), this.previewFiles.map(f => (h("ta-dragger-preview-file", { file: f })))))
            : null));
    }
};
TaDragger.style = taDraggerCss;

export { TaDragger as ta_dragger };
