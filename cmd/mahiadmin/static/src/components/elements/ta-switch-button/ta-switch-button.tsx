import {Component, ComponentInterface, Event, EventEmitter, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'ta-switch-button',
  styleUrl: 'ta-switch-button.css',
  shadow: true,
})
export class TaSwitchButton implements ComponentInterface {
  @Prop() label: string;
  @Prop() initialChecked: boolean = false;
  @Prop() noLabel: string = 'No';
  @Prop() yesLabel: string = 'Yes';

  @Event() taChange: EventEmitter

  private handleOnChange = (checked: boolean) => {
    this.taChange.emit(checked);
  }

  render() {
    return (
      <Host>
        <div class="switch-button-wrapper">
          <span class="label">{this.label}</span>
          <div class="switch-button">
            <div class={{
              'slider': true,
              'active': this.initialChecked,
            }}/>
            <div
              onClick={() => this.handleOnChange(true)}
              class={{
                'switch-side': true,
                'active': this.initialChecked
              }}>
              {this.yesLabel}
            </div>
            <div
              onClick={() => this.handleOnChange(false)}
              class={{
                'switch-side': true,
                'active': !this.initialChecked
              }}>
              {this.noLabel}
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
