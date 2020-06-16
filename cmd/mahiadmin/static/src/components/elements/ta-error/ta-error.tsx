import {Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'ta-error',
  styleUrl: 'ta-error.css',
  shadow: true
})
export class TaDropdown {
  @Prop() error: string = '';

  render() {
    return (
      !!this.error ?
        <div class="ta-error">
          <span>{this.error}</span>
        </div> :
        null
    );
  }
}
