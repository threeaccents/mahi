import {Component, h, Method, Prop, State} from '@stencil/core';


@Component({
  tag: 'ta-tab-body',
  styleUrl: 'ta-tab-body.css',
  shadow: true
})
export class TaTabBody {
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
        'ta-tab-body-component': true,
        'active': this.isActive
      }}>
        <slot/>
      </div>
    );
  }
}
