import { Component, ComponentInterface, h, Host, Prop, Event, EventEmitter, State } from '@stencil/core';
import { FileModel } from '../../../models/file'
import { copyToClipboard, limitLen, formatBytes } from '../../../util';
import toastr from '../../../libs/toastr';
import FileService from '../../../api/file';
import { ApiError } from '../../../api/base';

const DEFAULT_BK_IMG = `url('../../../assets/file.svg')`

@Component({
  tag: 'ta-file-card',
  styleUrl: 'ta-file-card.css',
  shadow: true,
})
export class TaFileCard implements ComponentInterface {
  @State() displayConfirmModal: boolean = false;
  @State() deletingFile: boolean = false;

  @Prop() file!: FileModel;

  @Event() taFileWasDeleted: EventEmitter;

  get backgroundImg(): string {
    const { file } = this;
    return file.dataUrl ? `url(${file.dataUrl as string})` : `url(${this.file.url}?width=450)`
  }

  get fileImg(): string {
    const { file } = this;
    return file.dataUrl ? file.dataUrl as string : `${this.file.url}?width=240`;
  }

  get shouldPreview(): boolean {
    return this.file.mimeType === "image"
  }

  private onCopyClick = (e: CustomEvent) => {
    e.preventDefault()
    e.stopPropagation()

    copyToClipboard(this.file.url)

    toastr().success('File link copied to clipboard')
  }

  private onDeleteClick = () => {
    this.toggleConfirmModal()
  }

  private onSuccess = () => {
    toastr().success('File was deleted')
    this.toggleConfirmModal()
    this.taFileWasDeleted.emit(this.file);
  }

  private onError = (err: ApiError) => {
    if (err.error) {
      toastr().danger(err.error)
      return
    }
    toastr().danger('Error deleting file')
  }
  private toggleConfirmModal = () => {
    this.displayConfirmModal = !this.displayConfirmModal
  }

  private deleteFile = () => {
    this.deletingFile = true;

    FileService()
      .delete(this.file.id)
      .then(this.onSuccess)
      .catch(this.onError)
      .finally(() => this.deletingFile = false)
  }

  private get confirmDeleteModal() {
    return (
      <ta-modal
        titleText={`Delete ${this.file.fileName}`}
        bodyText="Are you sure you want to delete this file?"
        confirmBtnText="Delete"
        display={this.displayConfirmModal}
        onTaClose={this.toggleConfirmModal}
        onTaSubmit={this.deleteFile}
        loading={this.deletingFile}
      />
    )
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'file-card-image': true,
            'default-img': !this.shouldPreview
          }}
          style={{
            backgroundImage: this.shouldPreview ? this.backgroundImg : DEFAULT_BK_IMG
          }}>
          <div class="overlay"></div>
          <div class="controls">
            <div class="control-icon">
              <ta-icon onTaClick={this.onCopyClick} icon="copy" />
            </div>
            <div class="control-icon">
              <ta-icon onTaClick={this.onDeleteClick} icon="trash" />
            </div>
          </div>
        </div>
        <div class="image-details">
          <div class="names">
            <ta-tooltip text={this.file.fileName}>
              <div class="file-name">{limitLen(this.file.fileName, 12)}</div>
            </ta-tooltip>
          </div>
          <div class="other-details">
            <div class="type">{this.file.extension.toUpperCase()}</div>
            <div class="file-size">{`${formatBytes(this.file.size, 1)}`}</div>
          </div>
        </div>
        {this.confirmDeleteModal}
      </Host>
    );
  }
}
