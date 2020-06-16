import {Component, ComponentInterface, h, Host, Prop} from '@stencil/core';
import {PreviewFile} from '../interface';

@Component({
  tag: 'ta-dragger-preview-file',
  styleUrl: 'ta-dragger-preview-file.css',
  shadow: true,
})
export class TaDraggerPreviewFile implements ComponentInterface {
  @Prop() file!: PreviewFile;

  render() {
    const {src, name, progress, failed, isImage} = this.file;
    return (
      <Host class={{
        'preview-file': true,
        'failed': failed
      }}>
        <div class="preview-file-wrapper">
          <div class="preview-info">
            <div class="preview-img">
              {isImage ? <img src={src as string}/> : <ta-icon icon="files"/>}
            </div>
            <div class="preview-file-name">{name}</div>
          </div>

          <ta-progress
            size={30}
            value={progress}/>
        </div>
      </Host>
    );
  }

}
