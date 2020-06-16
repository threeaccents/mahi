import {Component, ComponentInterface, h, Host, State} from '@stencil/core';
import {CardModel} from "../../../../models/billing";
import BillingService, {CardResponse, CardsResponse, UpdateCardRequest} from "../../../../api/billing";
import {ApiError, DEFAULT_ERR_MSG} from '../../../../api/base';
import toastr from "../../../../libs/toastr";
import {stripeKey} from "../../../../config";

@Component({
  tag: 'billing-setting-view',
  styleUrl: 'billing-setting-view.css',
  shadow: true,
})
export class BillingSettingView implements ComponentInterface {
  stripeEl: any;

  @State() cards: CardModel[] = [];
  @State() fetchingCards: boolean = false;
  @State() creatingCard: boolean = false;
  @State() formError: string = '';

  componentWillLoad(): Promise<void> | void {
    this.getCards()
  }

  private getCards = () => {
    this.fetchingCards = true
    BillingService()
      .listCards()
      .then(this.handleSuccess)
      .catch(this.handleError)
      .finally(() => this.fetchingCards = false)
  }

  private handleSuccess = (resp: CardsResponse) => {
    this.cards = resp.data
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      toastr().danger(DEFAULT_ERR_MSG);
      return console.log(err);
    }

    this.formError = err.error
  }

  private onSubmit = (e: CustomEvent) => {
    e.preventDefault();

    this.creatingCard = true

    this.stripeEl.createToken()
      .then(this.createCard)
      .then(this.handleCreateCardSuccess)
      .catch(this.handleError)
      .finally(() => this.creatingCard = false)
  }

  private createCard = (result) => {
    const payload = {
      token: result.token.id,
      brand: result.token.card.brand,
      lastFour: parseInt(result.token.card.last4),
      exp: `${result.token.card.exp_month}/${result.token.card.exp_year}`,
    }

    return BillingService()
      .createCard(payload)
  }

  private handleCreateCardSuccess = (resp: CardResponse) => {
    toastr().success('Card was added!');
    this.cards = [...this.cards, resp.data];
    this.stripeEl.reset();
  }


  private deleteCard = (e: CustomEvent) => {
    const cardId = e.detail
    BillingService()
      .deleteCard(cardId)
      .then(() => this.handleDeleteCardSuccess(cardId))
      .catch(this.handleError)
  }

  private handleDeleteCardSuccess = (cardId: string) => {
    toastr().success('Card was deleted');
    this.cards = this.cards.filter(c => c.id !== cardId);
  }

  private handleUpdateCardSuccess = (cardId: string) => {
    toastr().success('Card set as default');
    const newCardsValue = this.cards.map(c => {
      return {
        ...c,
        isDefault: c.id === cardId
      }
    })
    this.cards = [...newCardsValue]
  }

  private setDefaultCard = (e: CustomEvent) => {
    const cardId = e.detail

    const payload: UpdateCardRequest = { isDefault: true }

    BillingService()
      .updateCard(cardId, payload)
      .then(() => this.handleUpdateCardSuccess(cardId))
      .catch(this.handleError)
  }

  render() {
    return (
      <Host>
        <ta-card>
          <ta-form-label>Cards</ta-form-label>
          {this.fetchingCards
            ?
            <ta-loader />
            :
            <div class={"cards"}>
              {this.cards.map((card) => (
                <ta-billing-card
                  key={card.id}
                  card={card}
                  onTaSetDefaultClick={this.setDefaultCard}
                  onTaDeleteClick={this.deleteCard}
                />
              ))}
            </div>
          }
          <ta-form-label>Add Card</ta-form-label>
          <ta-form onTaSubmit={(e: CustomEvent) => this.onSubmit(e as any)}>
            <div style={{ position: 'relative' }}>
              <stripe-elements
                onChange={() => this.formError = ''}
                show-error
                ref={(el) => this.stripeEl = el}
                publishable-key={stripeKey()}
              />
            </div>
            <ta-error error={this.formError} />
            <ta-button
              loading={this.creatingCard}
              onTaClick={(e: CustomEvent) => this.onSubmit(e as any)}>
              Add Card
            </ta-button>
          </ta-form>
        </ta-card>
      </Host >
    );
  }

}
