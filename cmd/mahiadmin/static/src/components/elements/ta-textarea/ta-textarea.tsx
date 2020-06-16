import {Component, Event, EventEmitter, h, Host, Prop, State} from '@stencil/core';

@Component({
  tag: 'ta-textarea',
  styleUrl: 'ta-textarea.css',
  shadow: true
})
export class TextArea {
  private textArea?: HTMLTextAreaElement;

  @State() isFocused: boolean = false;

  @Prop() value: string = '';
  @Prop() label: string = '';
  @Prop() error: string = '';
  @Prop() rows: number = 4;

  @Event() taInput: EventEmitter


  private handleFocus = (isFocused: boolean) => {
    this.isFocused = isFocused
  }

  private handleLabelClick = (e: UIEvent) => {
    e.preventDefault();
    this.textArea.focus()
  }

  private displayError = () => {
    if (!this.error || this.error === '') return;

    return (
      <div class="textarea-error-message">
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
          'has-error': this.error !== '',
          'ta-textarea': true
        }}>
          <label onClick={this.handleLabelClick}>{this.label}</label>
          <textarea
            rows={this.rows}
            value={this.value}
            onInput={(e: Event) => this.taInput.emit((e.target as HTMLTextAreaElement).value)}
            onFocus={() => this.handleFocus(true)}
            onBlur={() => this.handleFocus(false)}
            ref={el => this.textArea = el as HTMLTextAreaElement}
          />
          {this.displayError()}
        </div>
      </Host>
    );
  }
}
