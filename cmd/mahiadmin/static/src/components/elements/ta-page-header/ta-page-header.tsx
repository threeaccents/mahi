import {Component, ComponentInterface, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'ta-page-header',
  styleUrl: 'ta-page-header.css',
  shadow: true,
})
export class TaPageHeader implements ComponentInterface {
  @Prop() pageTitle!: string;

  render() {
    return (
      <Host>
        <div class="left-side">
          <div class="page-header-title">{this.pageTitle}</div>
        </div>
        <div class="right-side">
          <slot name="right"/>
        </div>
      </Host>
    );
  }

}
