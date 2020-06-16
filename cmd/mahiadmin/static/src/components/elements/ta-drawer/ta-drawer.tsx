import {Component, ComponentInterface, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'ta-drawer',
  styleUrl: 'ta-drawer.css',
  shadow: true,
})
export class TaDrawer implements ComponentInterface {
  @Prop() open: boolean = false;

  render() {
    return (
      <Host
        class={{
          'open': this.open
        }}>
        <div class="drawer-container">
          <div class="drawer-wrapper">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

}
