import { Component, ComponentInterface, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { TaMultiSelectOption } from './interface'

@Component({
  tag: 'ta-multi-select',
  styleUrl: 'ta-multi-select.css',
  shadow: true,
})
export class MultiSelect implements ComponentInterface {
  @State() isFocused: boolean = false;
  @State() searchQuery: string = '';
  @State() showDropdown: boolean = false;
  @State() filteredOptions: TaMultiSelectOption[];

  @Prop() label: string = '';
  @Prop() value: string[] = [];
  @Prop() options: TaMultiSelectOption[] = [];
  @Prop() loading: boolean = false;

  @Event() taSelect: EventEmitter

  @Watch('options')
  watchOptionsHandler(newValue: TaMultiSelectOption[], oldValue: TaMultiSelectOption[]) {
    if (oldValue !== newValue) {
      this.filteredOptions = this.options;
    }
  }

  componentWillLoad() {
    this.filteredOptions = this.options;
  }

  private handleOnInput = (e: CustomEvent) => {
    this.searchQuery = e.detail;
    this.filterOptions(e.detail);
  }

  private filterOptions = (query: string) => {
    if (query) {
      this.filteredOptions = this.options.filter(o => o.text.toLowerCase().includes(query.toLowerCase()))
      return
    }
    this.filteredOptions = this.options;
  }

  private handleOnFocus = () => {
    this.isFocused = true
    this.showDropdown = true
  }

  private handleSelectOption = (value: any) => {
    this.showDropdown = false
    this.taSelect.emit([...this.value, value]);
  }

  private get availableDropdownOptions(): TaMultiSelectOption[] {
    return this.filteredOptions.filter(o => !this.value.includes(o.value));
  }

  private getDropdownOptions = (): Element[] => {
    if (this.availableDropdownOptions.length === 0) {
      return <span class="dropdown-item disabled">No options available</span>
    }
    return this.availableDropdownOptions.map((o) => {
      return (
        <span class="dropdown-item" onClick={() => this.handleSelectOption(o.value)}>
          {o.text}
        </span>
      )
    })
  }

  private isActive = (): boolean => {
    return !!this.searchQuery || this.isFocused;
  }

  private handleOnBlur = (e: UIEvent) => {
    e.preventDefault();
    this.isFocused = false;
    this.showDropdown = false;
  }

  private getValueText = (optionValue: string): string => {
    return this.options.find(o => o.value === optionValue).text
  }

  private handleRemoveSelectedItem = (optionValue: string) => {
    this.taSelect.emit(this.value.filter(o => o !== optionValue));
  }

  render() {
    if (this.loading) {
      return (
        <Host>
          <div
            class={{
              'ta-multi-select': true,
              'is-active': this.isActive(),
            }}>
            <ta-input
              disabled
              loading={this.loading}
              label={this.label}
              value={this.searchQuery}
            />
            <div class={{
              'expand-arrow-icon': true,
              'expanded': this.showDropdown,
            }}>
              <ta-icon icon='expand-arrow' />
            </div>
          </div>
        </Host>
      )
    }
    return (
      <Host>
        <div
          class={{
            'ta-multi-select': true,
            'is-active': this.isActive(),
          }}>
          <ta-input
            loading={this.loading}
            label={this.label}
            value={this.searchQuery}
            onTaInput={this.handleOnInput}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
          />
          <div class={{
            'expand-arrow-icon': true,
            'expanded': this.showDropdown,
          }}>
            <ta-icon icon='expand-arrow' />
          </div>
          <div class={{
            'dropdown-menu-wrapper': true,
            'open': this.showDropdown,
          }}>
            <div class="dropdown-menu">
              {this.getDropdownOptions()}
            </div>
          </div>
        </div>
        <div class="selected-items">
          {this.value.map(o => (
            <div class="selected-item">
              <span>{this.getValueText(o)}</span>
              <ta-icon
                onClick={() => this.handleRemoveSelectedItem(o)}
                icon="cancel"
              />
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
