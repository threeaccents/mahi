import {Component, Event, EventEmitter, h, Host, Prop, State} from '@stencil/core';

export type InputType = 'text' | 'tel' | 'password' | 'email' | 'search';

@Component({
  tag: 'ta-input',
  styleUrl: 'ta-input.css',
  shadow: true
})
export class TaInput {
  private textInput?: HTMLInputElement;

  @State() isFocused: boolean = false;
  @State() showCleartext: boolean = false;

  @Prop() value: string = '';
  @Prop() label: string = '';
  @Prop() type: InputType = 'text';
  @Prop() error: string = '';
  @Prop() loading: boolean = false;
  @Prop() disabled: boolean = false;

  @Event() taInput: EventEmitter


  private handleFocus = (isFocused: boolean) => {
    this.isFocused = isFocused
  }

  private handleLabelClick = (e: UIEvent) => {
    e.preventDefault();

    this.textInput.focus()
  }

  private displayError = () => {
    if (!this.error || this.error === '') return;

    return (
      <div class="input-error-message">
        {this.error}
      </div>
    )
  }

  private isActive = (): boolean => {
    return this.value !== '' || this.isFocused;
  }

  render() {
    return (
      <Host>
        <div class={{
          'is-active': this.isActive(),
          'has-error': !!this.error,
          'ta-input': true
        }}>
          <label onClick={this.handleLabelClick}>{this.label}</label>
          <input
            disabled={this.disabled}
            type={this.showCleartext ? 'text' : this.type}
            value={this.value}
            onInput={(e: Event) => this.taInput.emit((e.target as HTMLInputElement).value)}
            onFocus={() => this.handleFocus(true)}
            onBlur={() => this.handleFocus(false)}
            ref={el => this.textInput = el as HTMLInputElement}
          />
          {this.loading ? <div class="spin-icon"></div> : null}
          {this.type === 'password' ?
            <div onClick={() => this.showCleartext = !this.showCleartext} class="cleartext-toggle">
              {this.showCleartext ? <ta-icon icon="eye-closed"/> : <ta-icon icon="eye-open"/>}
            </div>
            : null}
          {this.displayError()}
        </div>
      </Host>
    );
  }
}
