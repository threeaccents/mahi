import {Component, ComponentInterface, h, Host, Method, Prop, State} from '@stencil/core';

@Component({
  tag: 'ta-select-option',
  styleUrl: 'ta-select-option.css',
  shadow: true,
})
export class TaSelectOption implements ComponentInterface {
  @Prop() value!: string | number;
  @Prop() label!: string;

  @State() selected: boolean = false;

  @Method()
  async select() {
    this.selected = true
  }

  @Method()
  async deselect() {
    this.selected = false
  }

  render() {
    return (
      <Host class={{
        'selected': this.selected
      }}>
        {this.label}
      </Host>
    );
  }

}
