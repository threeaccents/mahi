import { Component, ComponentInterface, Host, h, EventEmitter, Event, Listen } from '@stencil/core';

@Component({
  tag: 'ta-form',
  styleUrl: 'ta-form.css',
  shadow: true,
})
export class TaForm implements ComponentInterface {
  @Event() taSubmit: EventEmitter;

  @Listen('keyup')
  handleKeyUpEvent(event) {
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      this.taSubmit.emit()
    }
  }

  render() {
    return (
      <Host class="ta-form">
        <slot></slot>
      </Host>
    );
  }

}
