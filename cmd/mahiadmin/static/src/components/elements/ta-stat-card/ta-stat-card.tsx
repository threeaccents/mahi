import {Component, ComponentInterface, h, Host, Prop} from '@stencil/core';
import {TaIconType} from '../ta-icon/ta-icon'

@Component({
  tag: 'ta-stat-card',
  styleUrl: 'ta-stat-card.css',
  shadow: true,
})
export class TaStatCard implements ComponentInterface {
  @Prop() icon!: TaIconType;
  @Prop() label!: string;
  @Prop() value!: string;

  render() {
    return (
      <Host>
        <div class="wrapper">
          <div class="icon-section">
            <div class="icon-wrapper">
              <ta-icon icon={this.icon}/>
            </div>
          </div>
          <div class="info-section">
            <div class="label">{this.label}</div>
            <div class="value">{this.value}</div>
          </div>
        </div>
      </Host>
    );
  }

}
