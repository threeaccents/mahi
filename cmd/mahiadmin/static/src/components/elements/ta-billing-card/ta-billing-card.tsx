import { Component, ComponentInterface, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { CardModel } from "../../../models/billing";

@Component({
  tag: 'ta-billing-card',
  styleUrl: 'ta-billing-card.css',
  shadow: true,
})
export class TaBillingCard implements ComponentInterface {
  dropdownEl: HTMLTaDropdownElement;

  @State() isMenuShown: boolean = false;

  @Prop() card: CardModel;

  @Event() taDeleteClick: EventEmitter
  @Event() taSetDefaultClick: EventEmitter

  private getEditMenu = () => {
    return (
      <div class="edit-menu">
        {this.card.isDefault ? null
          : <div class="edit-menu-item" onClick={this.handleSetDefault}>
            Make Default
          </div>
        }
        <div class="edit-menu-item" onClick={this.handleDelete}>
          Delete Card
        </div>
      </div>
    )
  }

  private handleDelete = () => {
    this.dropdownEl.close()
    this.taDeleteClick.emit(this.card.id)
  }

  private handleSetDefault = () => {
    this.dropdownEl.close()
    this.taSetDefaultClick.emit(this.card.id)
  }

  private handleOverlayRendered = (e: CustomEvent) => {
    this.isMenuShown = e.detail
  }

  render() {
    return (
      <Host
        class={{
          'default': this.card.isDefault
        }}
      >
        <div class={"left"}>
          {this.card.brand}
        </div>
        <div class={"middle"}>
          <div class={"number"}>
            XXXX-{this.card.lastFour}
          </div>
          <div class={"exp"}>
            {this.card.exp}
          </div>
        </div>
        <div class={"right"}>
          <ta-dropdown
            ref={(el) => this.dropdownEl = el}
            onTaOverlayRendered={this.handleOverlayRendered}
            overlay={this.getEditMenu()}>
            <div class={{
              "vertical-dots-icon": true,
              "active": this.isMenuShown,
            }}>
              <ta-icon icon="vertical-dots" />
            </div>
          </ta-dropdown>
        </div>
      </Host>
    );
  }

}
