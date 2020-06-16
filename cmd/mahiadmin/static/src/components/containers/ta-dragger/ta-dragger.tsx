import {Component, ComponentInterface, Event, EventEmitter, h, Host, Prop, State} from '@stencil/core';
import {limitLen, randInt} from '../../../util'
import {PreviewFile} from './interface';
import uplaoder from "../../../libs/oriio-upload/realdeal";

@Component({
  tag: 'ta-dragger',
  styleUrl: 'ta-dragger.css',
  shadow: true,
})
export class TaDragger implements ComponentInterface {
  @State() dragging: boolean = false;
  @State() previewFiles: PreviewFile[] = []

  @Prop() applicationId!: string;

  @Event() taFileUpload: EventEmitter;

  private handleDragEnter = (e: InputEvent) => {
    this.stopDefaults(e)
    this.dragging = true
  }

  private handleDragLeave = (e: InputEvent) => {
    this.stopDefaults(e)
    this.dragging = false
  }

  private handleDragOver = (e: InputEvent) => {
    this.stopDefaults(e)
    this.dragging = true
  }

  private handleDrop = (e: DragEvent) => {
    this.stopDefaults(e)
    this.dragging = false
    Array.from(e.dataTransfer.files).forEach((file) => {
      this.previewFile(file)
    })
  }

  private stopDefaults = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  private uploadFile = (file: File, previewFile: PreviewFile) => {
    uplaoder()
      .options({})
      .send(this.applicationId, file)
      .onProgress((loaded, total) => {
        this.previewFiles = this.previewFiles.map((f) => {
          if (f.id !== previewFile.id) return f
          return {...f, progress: (loaded * 100.0 / total)}
        })
      })
      .onSuccess((resp) => {
        const payload = resp.data;
        payload.dataUrl = previewFile.src
        this.taFileUpload.emit(payload)
        this.previewFiles = this.previewFiles.filter(f => f.id !== previewFile.id)
        return
      })
      .onError(() => {
        this.previewFiles = this.previewFiles.map((f) => {
          if (f.id !== previewFile.id) return f
          return {...f, failed: true}
        })
      })
  }

  private previewFile = (file: File) => {
    const type = file.type.split('/')[0];

    let newFile = {
      id: randInt(10000),
      progress: 0,
      name: limitLen(file.name, 48),
      failed: false,
      isImage: false,
      src: '',
    }

    if (type !== 'image') {
      this.uploadFile(file, newFile)
      this.previewFiles = [...this.previewFiles, newFile]
      return
    }
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      newFile = {...newFile, src: (reader.result as string), isImage: true}
      this.uploadFile(file, newFile)
      this.previewFiles = [...this.previewFiles, newFile]
    }
  }

  get uploadingFilesCount(): string {
    const count = this.previewFiles.filter(f => !f.failed).length

    return count === 1 ? `Uploading 1 item` : `Uploading ${count} items`
  }

  render() {
    return (
      <Host
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        class={{
          'dragging': this.dragging
        }}
      >
        <slot/>
        {this.previewFiles.length > 0 ?
          <div class="gallery">
            <ta-card>
              <div class="gallery-heading">
                Uploading 1 item
              </div>
              {this.previewFiles.map(f => (
                <ta-dragger-preview-file file={f}/>
              ))}
            </ta-card>
          </div>
          : null}
      </Host>
    );
  }

}
