import {Component, ComponentInterface, h, Host} from '@stencil/core';

@Component({
  tag: 'ta-loader',
  styleUrl: 'ta-loader.css',
  shadow: true,
})
export class TaLoader implements ComponentInterface {

  render() {
    return (
      <Host>
        <div class="loading">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </Host>
    );
  }

}
