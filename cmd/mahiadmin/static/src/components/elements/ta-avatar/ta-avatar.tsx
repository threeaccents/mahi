import {Component, ComponentInterface, h, Host, Prop} from '@stencil/core';

export type TaAvatarSize = 'small' | 'medium' | 'large'
export type TaAvatarColors = 'blue' | 'green' | 'yellow' | 'red' | 'grey'

@Component({
  tag: 'ta-avatar',
  styleUrl: 'ta-avatar.css',
  shadow: true,
})
export class TaAvatar implements ComponentInterface {
  @Prop() size: TaAvatarSize = 'medium'
  @Prop() color: TaAvatarColors = 'blue'
  @Prop() text!: string;

  render() {
    return (
      <Host
        class={{
          [this.size]: true,
          [this.color]: true
        }}>
        {this.text[0].toUpperCase()}
        {this.text[1] ? this.text[1].toUpperCase() : null}
      </Host>
    );
  }

}
