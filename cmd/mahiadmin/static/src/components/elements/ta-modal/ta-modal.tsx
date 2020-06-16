import { Component, ComponentInterface, Event, h, Host, Prop } from '@stencil/core';
import { EventEmitter } from '@stencil/router/dist/types/stencil.core';


@Component({
  tag: 'ta-modal',
  styleUrl: 'ta-modal.css',
  shadow: true,
})
export class TaModal implements ComponentInterface {
  @Prop() loading: boolean = false
  @Prop() titleText: string = ''
  @Prop() bodyText: string = ''
  @Prop() confirmBtnText: string = 'Confirm'
  @Prop() cancelBtnText: string = 'Cancel'
  @Prop() display: boolean = false
  @Prop() useDefaultFooter: boolean = true

  @Event() taClose: EventEmitter;
  @Event() taSubmit: EventEmitter;

  render() {
    if (!this.display) return null
    return (
      <Host>
        <div class="modal-wrapper">
          <div class="modal-content">
            <div class="modal-header">
              <div class="close-icon" onClick={() => this.taClose.emit()}>
                <ta-icon icon="close" />
              </div>
            </div>
            <div class="modal-body">
              <div class="modal-title-text">
                {this.titleText}
              </div>
              <div class="body-text">
                {this.bodyText}
              </div>
              <slot></slot>
            </div>
            {this.useDefaultFooter ?
              <div class="modal-footer">
                <div class="buttons">
                  <ta-button color="white" onClick={() => this.taClose.emit()}>
                    Cancel
               </ta-button>
                  <ta-button loading={this.loading} onClick={() => this.taSubmit.emit()}>
                    Delete
               </ta-button>
                </div>
              </div> : null
            }
          </div>
        </div>
      </Host>
    );
  }

}
