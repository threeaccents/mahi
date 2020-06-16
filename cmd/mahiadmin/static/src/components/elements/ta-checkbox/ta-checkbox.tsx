import {Component, ComponentInterface, Event, EventEmitter, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'ta-checkbox',
  styleUrl: 'ta-checkbox.css',
  shadow: true,
})
export class TaCheckbox implements ComponentInterface {
  @Prop() label: string;
  @Prop() initialChecked: boolean = false;

  @Event() taChange: EventEmitter

  private handleOnChange = (e: UIEvent) => {
    e.preventDefault();
    this.taChange.emit((e.target as HTMLFormElement).checked);
  }

  render() {
    return (
      <Host class="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          checked={this.initialChecked}
          onChange={this.handleOnChange}/>
        <label htmlFor="checkbox">{this.label}</label>
      </Host>
    );
  }

}
