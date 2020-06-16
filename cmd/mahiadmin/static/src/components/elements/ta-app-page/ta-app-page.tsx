import {Component, ComponentInterface, h, Host} from '@stencil/core';

@Component({
  tag: 'ta-app-page',
  styleUrl: 'ta-app-page.css',
  shadow: true,
})
export class TaAppPage implements ComponentInterface {

  render() {
    return (
      <Host>
        <div class="wrapper">
          <slot></slot>
        </div>
      </Host>
    );
  }

}
