import {Component, ComponentInterface, h, Host, Prop} from '@stencil/core';
import {TaAvatarColors, TaAvatarSize} from '../ta-avatar/ta-avatar';

const colors = ['blue', 'yellow', 'green', 'red', 'grey'];
const indexes = ['9', '8', '7', '6', '5'];

@Component({
  tag: 'ta-avatar-list',
  styleUrl: 'ta-avatar-list.css',
  shadow: true,
})
export class TaAvatarList implements ComponentInterface {
  @Prop() items!: string[];
  @Prop() size: TaAvatarSize = 'medium';

  private styles = (index: number) => {
    return {
      // marginLeft: `${index * 20}px`,
      zIndex: indexes[index],
    }
  }

  private totals = () => {
    if (this.items.length <= 4) return;

    const remainder = this.items.length - 4;

    return (
      <div
        style={this.styles(4)}
        class="avatar-item">
        <ta-avatar
          color="grey"
          text={remainder.toString()}
          size={this.size}/>
      </div>
    )
  }

  render() {
    return (
      <Host>
        <div class="avatar-items">
          {this.items.slice(0, 4).map((item, index) => (
            <div
              style={this.styles(index)}
              class="avatar-item">
              <ta-avatar
                color={colors[index] as TaAvatarColors}
                text={item}
                size={this.size}/>
            </div>
          ))}
          {this.totals()}
        </div>
      </Host>
    );
  }

}
