import {Component, Element, Event, EventEmitter, h, Prop} from '@stencil/core';

@Component({
  tag: 'ta-tabs',
  styleUrl: 'ta-tabs.css',
  shadow: true
})
export class TaTabs {
  headers: HTMLTaTabHeaderElement[] = [];
  bodies: HTMLTaTabBodyElement[] = [];

  @Element()
  $el: HTMLElement;

  @Prop() initialValue: string = '';

  @Event() taChange: EventEmitter;

  componentDidLoad() {
    this.getHeaders();
    this.getBodies();
  }

  private getHeaders() {
    const headerEls = this.$el.querySelectorAll('ta-tab-header');
    this.headers = Array.from(headerEls)

    if (this.headers.length === 0) {
      throw new Error('[ta-tabs] Must have at least one ta-tab-header');
    }

    if (this.initialValue === '') {
      this.headers[0].activate();
    } else {
      this.activateHeader(this.initialValue)
    }

    this.bindHeaderClickHandlers(this.headers)
  }

  private activateHeader(tab: string) {
    const header = this.headers.find(b => b.tab === tab);
    this.deactivateHeaders()
    header.activate();
  }

  private bindHeaderClickHandlers = (headers: HTMLTaTabHeaderElement[]) => {
    headers.forEach((header) => {
      header.addEventListener('click', (e: UIEvent) => {
        e.preventDefault();
        this.activateHeader(header.tab)
        this.activateBody(header.tab)
        this.taChange.emit(header.tab)
      })
    })
  }

  private deactivateHeaders() {
    this.headers.forEach(header => header.deactivate())
  }

  private getBodies() {
    const bodyEls = this.$el.querySelectorAll('ta-tab-body');
    this.bodies = Array.from(bodyEls)

    if (this.bodies.length === 0) {
      throw new Error('[ta-tabs] Must have at least one ta-tab-header');
    }

    if (this.initialValue === '') {
      this.bodies[0].activate();
    } else {
      this.activateBody(this.initialValue)
    }
  }

  private activateBody(tab: string) {
    const body = this.bodies.find(b => b.tab === tab);
    this.deactivateBodies();
    body.activate();
  }

  private deactivateBodies() {
    this.bodies.forEach(header => header.deactivate())
  }

  render() {
    return (
      <div class="ta-tabs-component">
        <slot></slot>
      </div>
    );
  }
}
