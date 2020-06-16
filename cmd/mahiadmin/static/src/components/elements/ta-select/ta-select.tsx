import {Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Listen, Prop, State} from '@stencil/core';

@Component({
  tag: 'ta-select',
  styleUrl: 'ta-select.css',
  shadow: true,
})
export class TaSelect implements ComponentInterface {
  options: HTMLTaSelectOptionElement[] = [];

  @Element() $el;

  @State() dropdownOpen: boolean = false;
  @State() label: string = '';

  @Prop() placeholder: string;
  @Prop() value: string | number;
  @Prop() error: string = '';

  @Event() taSelect: EventEmitter;

  componentDidLoad() {
    this.getOptions()
    this.checkSelected()
    this.checkForChildChanges()
  }

  @Listen('click', {target: 'window'})
  handleWindowClick() {
    this.dropdownOpen = false
  }

  private checkForChildChanges = () => {
    const observer = new MutationObserver(this.getOptions);

    const config = {
      childList: true,
      subtree: true,
      characterData: true
    };

    observer.observe(this.$el, config);
  }

  private getOptions = () => {
    const options = this.$el.querySelectorAll('ta-select-option');
    this.options = Array.from(options);

    this.bindClickListeners(this.options);
  }

  private checkSelected() {
    this.options.forEach(opt => {
      if (opt.value !== this.value) return

      opt.select()
      this.label = opt.label
    })
  }

  private bindClickListeners(options: HTMLTaSelectOptionElement[]) {
    options.forEach(opt => {
      opt.addEventListener('click', (e: UIEvent) => {
        e.stopPropagation();
        e.preventDefault();
        this.deselectAll();
        opt.select();
        this.taSelect.emit(opt.value)
        this.label = opt.label
        this.dropdownOpen = false
      })
    })
  }

  private deselectAll() {
    this.options.forEach(opt => opt.deselect())
  }

  private handleOnFocus = (e: UIEvent) => {
    this.stopPropagation(e)
    e.preventDefault();
    this.dropdownOpen = true
  }

  private stopPropagation = (e: UIEvent) => {
    e.stopPropagation()
    e.stopImmediatePropagation()
  }

  private displayError = () => {
    if (!this.error || this.error === '') return;

    return (
      <div class="input-error-message">
        {this.error}
      </div>
    )
  }

  render() {
    return (
      <Host>
        <div class={{
          'has-error': this.error !== '',
          'ta-select': true
        }}>
          <input
            onClick={this.stopPropagation}
            class="input"
            placeholder={this.placeholder}
            value={this.label}
            readOnly
            onFocus={this.handleOnFocus}/>
          <div class={{
            'expand-arrow-icon': true,
            'expanded': this.dropdownOpen,
          }}>
            <ta-icon icon='expand-arrow'/>
          </div>
          <div class={{
            'dropdown': true,
            'open': this.dropdownOpen
          }}>
            <div class="dropdown-wrapper">
              <slot></slot>
            </div>
          </div>
          {this.displayError()}
        </div>
      </Host>
    );
  }

}
