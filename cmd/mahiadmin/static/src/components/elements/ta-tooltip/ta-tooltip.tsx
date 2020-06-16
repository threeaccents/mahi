import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'ta-tooltip',
  styleUrl: 'ta-tooltip.css',
  shadow: true,
})
export class TaTooltip implements ComponentInterface {
  @Prop() text: string = "";

  render() {
    return (
      <Host>
        <div class="tooltip">
          <slot></slot>
          <span class="tooltiptext ">{this.text}</span>
        </div>
      </Host>
    );
  }

}
