import {BASE_URL} from "../../config";
import {FileResponse} from "../../api/file";
import {ApiError} from "../../api/base";

export interface Config {
  concurrentUploads?: number;
}

const initialConfig = {
  concurrentUploads: 3
}

type ProgressFunction = (loaded: number, total: number) => void;
type ErrorFunction = (err: ApiError) => void;
type SuccessFunction = (resp: FileResponse) => void;

const chunkSize = 5e+6;

export type onEvents = 'onProgress' | 'onError' | 'onSuccess';

class Uploader {
  private config: Config = initialConfig;
  private file: File = null;
  private activeConnections: Array<XMLHttpRequest> = [];
  private chunksQueue: Array<number> = [];
  private applicationId: string = '';
  private uploadId: string = ''
  private chunksQuantity: number = 0;
  private progressCache: Array<number> = [];
  private uploadedSize: number = 0;

  setConfig(config: Config) {
    console.log(config)
    // handle overriding config defaults.
  }

  setup(applicationId: string, file: File) {
    if (!file) throw new Error('file is empty');

    this.file = file;
    this.applicationId = applicationId;
    this.uploadId = this.createUploadId();
    this.chunksQuantity = Math.ceil(this.file.size / chunkSize);
    this.chunksQueue = new Array(this.chunksQuantity).fill(1).map((_, index) => index);
  }

  start(applicationId: string, file: File) {
    this.setup(applicationId, file);

    this.sendNextChunk()
  }

  private sendNextChunk() {
    const activeConnections = Object.keys(this.activeConnections).length;

    if (activeConnections >= this.config.concurrentUploads) {
      return;
    }

    if (!this.chunksQueue.length) {
      if (!activeConnections) {
        this.sendCompleted()
          .then(resp => {
            this[("onSuccess" as onEvents)](
              resp
            )
          }).catch(err => {
          this[("onError" as onEvents)](
            err
          )
        })
      }

      return;
    }

    const chunkId = this.chunksQueue.pop();
    const offset = chunkId * chunkSize;
    const chunk = this.file.slice(offset, offset + chunkSize);

    this.sendChunk(chunk, chunkId)
      .then(() => {
        this.sendNextChunk()
      }).catch(() => {
      // add failed chunk back to the queue
      // do some check if we should add it back to the queue or end the upload
      this.chunksQueue.push(chunkId)
      setTimeout(() => {
        this.sendNextChunk()
      }, 4200)
    });

    this.sendNextChunk()
  }

  private sendCompleted(): Promise<FileResponse> {
    return new Promise((resolve, reject) => {
      const payload = {
        applicationId: this.applicationId,
        fileName: this.file.name,
        uploadId: this.uploadId
      };
      const url = `${BASE_URL()}/chunks-completed`
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
            return reject(payload)
          resolve(payload)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  private sendChunk(chunk: Blob, chunkId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.upload(chunk, chunkId);
        resolve();
      } catch (error) {
        reject(error);
        return;
      }
    })
  }

  regularUpload(applicationId: string, file: File) {
    const url = `${BASE_URL()}/upload`

    const req = new XMLHttpRequest()
    req.responseType = 'json';
    req.open('POST', url, true)
    req.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`)

    req.upload.onprogress = (e) => {
      this[("onProgress" as onEvents)](
        e.loaded,
        e.total
      )
    }

    req.onerror = () => {
      this[("onError" as onEvents)]()
    }

    req.onload = () => {
      if (req.status === 201) {
        this[("onSuccess" as onEvents)](req.response)
        return
      }
      this[("onError" as onEvents)]()
    };

    const formData = new FormData()
    formData.append('application_id', applicationId)
    formData.append('file_name', file.name)
    formData.append('file', file)

    req.send(formData)
  }

  private upload(chunk: Blob, chunkId: number) {
    return new Promise((resolve, reject) => {
      const xhr = this.activeConnections[chunkId] = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => this.handleProgress(e, chunkId));

      xhr.addEventListener("error", (e) => this.handleProgress(e, chunkId));
      xhr.addEventListener("abort", (e) => this.handleProgress(e, chunkId));
      xhr.addEventListener("loadend", (e) => this.handleProgress(e, chunkId));

      // this also will just point to the production servers
      const url = `${BASE_URL()}/chunk-upload`

      xhr.open("post", url, true);
      // when we make this a library this won't be needed as the intermidiary server will be open.
      xhr.setRequestHeader('Authorization', `Bearer ${window.localStorage.getItem('token')}`)


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

      const fd = new FormData()
      fd.append('upload_id', this.uploadId)
      fd.append('chunk_number', chunkId.toString())
      fd.append('total_chunks', this.chunksQuantity.toString())
      fd.append('total_file_size', this.file.size.toString())
      fd.append('file_name', this.file.name)
      fd.append('application_id', this.applicationId)
      fd.append('data', chunk)

      xhr.send(fd);
    })
  }

  private handleProgress(event: ProgressEvent, chunkId: number) {
    if (event.type === "progress" || event.type === "error" || event.type === "abort") {
      this.progressCache[chunkId] = event.loaded;
    }

    if (event.type === "loadend") {
      this.uploadedSize += this.progressCache[chunkId] || 0;
      delete this.progressCache[chunkId];
    }

    const inProgress = Object.keys(this.progressCache).reduce((memo, id) => memo += this.progressCache[id], 0);

    const sentLength = Math.min(this.uploadedSize + inProgress, this.file.size);

    this[("onProgress" as onEvents)](
      sentLength,
      this.file.size
    )
  }

  private createUploadId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  on(method: onEvents, callback: Function) {
    this[method] = callback;
  }
}

const uploader = function () {
  const smartUploader = new Uploader()

  return Object.freeze({
    options(config: Config) {
      smartUploader.setConfig(config);

      return this;
    },
    send(applicationId: string, file: File) {
      if (file.size > chunkSize) {
        smartUploader.start(applicationId, file)
        return this;
      }

      smartUploader.regularUpload(applicationId, file)

      return this;
    },
    onProgress(callback: ProgressFunction) {
      smartUploader.on("onProgress", callback)

      return this;
    },
    onError(callback: ErrorFunction) {
      smartUploader.on("onError", callback)

      return this;
    },
    onSuccess(callback: SuccessFunction) {
      smartUploader.on("onSuccess", callback)

      return this;
    }
  })
}

export default uploader;
