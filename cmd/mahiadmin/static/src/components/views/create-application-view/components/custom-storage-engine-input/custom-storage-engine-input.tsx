import {Component, ComponentInterface, Event, EventEmitter, h, Host, Prop} from '@stencil/core';
import {StorageEngineType} from '../../../../../models/application';

@Component({
  tag: 'custom-storage-engine-input',
  styleUrl: 'custom-storage-engine-input.css',
  shadow: true,
})
export class CustomStorageEngineInput implements ComponentInterface {
  @Prop() value!: StorageEngineType;
  @Prop() exceptions: StorageEngineType[] = [];

  @Event() taSelect: EventEmitter;

  private handleSelectOption = (value: StorageEngineType) => {
    this.taSelect.emit(value);
  }

  private isException = (value: StorageEngineType): boolean => {
    return this.exceptions.some((e) => e && e === value)
  }

  render() {
    const {value} = this;
    return (
      <Host>
        <div class="storage-options-wrapper">
          {!this.isException('oriio') ?
            <div
              onClick={() => this.handleSelectOption('oriio')}
              class={{
                "storage-option-item": true,
                "selected": value === 'oriio',
              }}>
              <ta-icon icon='logo-sm'/>
            </div>
            : null
          }
          {!this.isException('wasabi') ?
            <div
              onClick={() => this.handleSelectOption('wasabi')}
              class={{
                "storage-option-item": true,
                "selected": value === 'wasabi'
              }}>
              <img src='../../assets/wasabi-logo.jpg' alt='Wasabi'/>
            </div>
            : null
          }
          {!this.isException('s3') ?
            <div
              onClick={() => this.handleSelectOption('s3')}
              class={{
                "storage-option-item": true,
                "selected": value === 's3'
              }}>
              <img src='../../assets/aws-logo.jpg' alt='AWS s3'/>
            </div>
            : null}
          {!this.isException('digital_ocean') ?
            <div
              onClick={() => this.handleSelectOption('digital_ocean')}
              class={{
                "storage-option-item": true,
                "selected": value === 'digital_ocean'
              }}>
              <img src='../../assets/digital-ocean-logo.jpg' alt='DigitalOcean'/>
            </div>
            : null}
          {!this.isException('b2') ?
            <div
              onClick={() => this.handleSelectOption('b2')}
              class={{
                "storage-option-item": true,
                "selected": value === 'b2'
              }}>
              <img src='../../assets/backblaze-logo.jpg' alt='BackBlaze'/>
            </div>
            : null}
        </div>
      </Host>
    );
  }

}
