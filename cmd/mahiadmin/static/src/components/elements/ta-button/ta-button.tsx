import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

export type TaButtonType = 'button' | 'type' | 'submit';

@Component({
  tag: 'ta-button',
  styleUrl: 'ta-button.css',
  shadow: true
})

export class TaButton {
  @Prop() loading: boolean = false;
  @Prop() type: TaButtonType = 'button';
  @Prop() small: boolean = false;
  @Prop() color: 'white' | 'grey' | 'dark-grey' = null;
  @Prop() disabled: boolean = false;

  @Event() taClick: EventEmitter;

  private handleOnClick = (e: UIEvent) => {
    this.taClick.emit(e);
  }

  render() {
    if (this.loading) {
      return (
        <button
          class={{
            [this.color]: true,
            'small': this.small
          }}
          disabled>
          <div class="spin-icon"></div>
        </button>
      )
    }

    return (
      <button
        disabled={this.disabled}
        type={this.type}
        class={{
          [this.color]: true,
          'small': this.small,
          'disabled': this.disabled,
        }}
        onClick={this.handleOnClick}>
        <slot></slot>
      </button>
    );
  }
}
