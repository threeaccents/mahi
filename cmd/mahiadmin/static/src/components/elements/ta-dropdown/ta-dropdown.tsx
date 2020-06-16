import { Component, Element, h, Listen, Method, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'ta-dropdown',
  styleUrl: 'ta-dropdown.css',
  shadow: false
})
export class TaDropdown {
  @Element()
  $el: HTMLElement;

  @State() showOverlay: boolean = false;
  @State() width: string;

  @Prop() overlay!: HTMLElement;

  @Event() taOverlayRendered: EventEmitter;

  componentDidLoad() {
    this.bindChildClickListener()
  }

  @Listen('click', { target: 'window' })
  handleWindowClick() {
    this.taOverlayRendered.emit(false)
    this.showOverlay = false
  }

  private bindChildClickListener() {
    const el = this.$el.querySelector('.ta-dropdown-component').children[0];
    el.addEventListener('click', this.handleChildClick)
  }

  private handleChildClick = (e: UIEvent) => {
    this.stopDefaults(e)
    this.taOverlayRendered.emit(!this.showOverlay)
    this.showOverlay = !this.showOverlay;
  }

  private stopDefaults = (e: Event) => {
    e.preventDefault();
    e.stopPropagation()
  }

  @Method()
  async close() {
    this.showOverlay = false;
  }

  render() {
    return (
      <div class="ta-dropdown-component" style={{
        width: this.width
      }}>
        <slot />
        <div class={{
          'ta-dropdown': true,
          'show': this.showOverlay
        }}>
          <div class="ta-dropdown-wrapper" onClick={this.stopDefaults}>
            {this.overlay}
          </div>
        </div>
      </div>
    );
  }
}
