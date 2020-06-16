import {Component, h, Method, Prop, State} from '@stencil/core';


@Component({
  tag: 'ta-tab-header',
  styleUrl: 'ta-tab-header.css',
  shadow: true
})
export class TaTabHeader {
  @Prop() tab!: string;

  @State() isActive: boolean = false;

  @Method()
  async activate() {
    this.isActive = true
  }

  @Method()
  async deactivate() {
    this.isActive = false
  }

  render() {
    return (
      <div class={{
        'ta-tab-header-component': true,
        'active': this.isActive,
      }}>
        <slot/>
      </div>
    );
  }
}
