import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
  tag: 'ta-card',
  styleUrl: 'ta-card.css',
  shadow: true,
})
export class TaCard implements ComponentInterface {

  render() {
    return (
      <Host>
          <slot></slot>
      </Host>
    );
  }

}
