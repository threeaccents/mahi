import {Component, h} from '@stencil/core';


@Component({
  tag: 'ta-tab-header-bar',
  styleUrl: 'ta-tab-header-bar.css',
  shadow: true
})
export class TaTabHeaderBar {
  render() {
    return (
      <div class="ta-tab-header-bar-component">
        <slot></slot>
      </div>
    );
  }
}
