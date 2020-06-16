import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'ta-form-label',
  styleUrl: 'ta-form-label.css',
  shadow: true,
})
export class TaFormLabel implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
