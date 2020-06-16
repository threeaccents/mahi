import {Component, ComponentInterface, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'ta-progress',
  styleUrl: 'ta-progress.css',
  shadow: true,
})
export class TaProgress implements ComponentInterface {
  @Prop() value!: number;
  @Prop() size: number = 75;

  get leftTransform(): string {
    const value = (this.value / 100) * 360;
    return `rotate(${value}deg)`
  }

  render() {
    const {value} = this;
    return (
      <Host
        style={{
          fontSize: `${this.size}px`
        }}>
        <div class="pie-wrapper">
          <span class="label">{Math.round(value)}<span class="smaller">%</span></span>
          <div
            style={{
              clip: `${value > 50 ? 'rect(auto, auto, auto, auto)' : ''}`
            }}
            class="pie">
            <div
              style={{
                transform: this.leftTransform
              }}
              class="left-side half-circle"
            ></div>
            <div
              style={{
                display: `${value <= 50 ? 'none' : ''}`,
                transform: `${value > 50 ? 'rotate(180deg)' : ''}`
              }}
              class="right-side half-circle"></div>
          </div>
        </div>
      </Host>
    );
  }

}
