import { r as registerInstance, h, H as Host } from './index-d067c2a6.js';
import { g as get, p as post, b as put, d as del, D as DEFAULT_ERR_MSG } from './base-1320a4aa.js';
import { B as BASE_URL, s as stripeKey } from './index-16096693.js';
import { t as toastr } from './index-61f3bdea.js';

function BillingService() {
    function setBillingLocalStorage(resp) {
        localStorage.setItem('amountDue', resp.data.amountDue.toString());
    }
    return Object.freeze({
        getBilling() {
            return get(`${BASE_URL()}/invoices`);
        },
        setBilling() {
            this.getBilling()
                .then(setBillingLocalStorage);
        },
        listCards() {
            return get(`${BASE_URL()}/cards`);
        },
        createCard(req) {
            return post(`${BASE_URL()}/cards`, req);
        },
        updateCard(id, req) {
            return put(`${BASE_URL()}/cards/${id}`, req);
        },
        deleteCard(id) {
            return del(`${BASE_URL()}/cards/${id}`);
        }
    });
}

const billingSettingViewCss = ":host{display:block}ta-button{--ta-button-width:150px}.cards{margin-bottom:30px}stripe-elements::part(stripe){border-radius:var(--border-radius);border:solid 2px var(--light-border-color);box-shadow:none;height:42px;display:flex;flex-flow:column;justify-content:center;background-color:var(--ta-input-bg-color, var(--primary-input-bg-color));color:var(--primary-text-color);width:100%;font-size:20px}stripe-elements[complete]::part(stripe){border-color:var(--material-green-a700, #00C853)}stripe-elements[invalid]::part(stripe){border-color:var(--material-amber-a700, #FFAB00)}stripe-elements[error]::part(stripe){border-color:var(--primary-error-color)}stripe-elements::part(error){padding:0;font-size:14px;font-weight:500;color:var(--primary-error-color)}.spin-icon{position:absolute;margin:auto;width:15px;height:15px;top:12px;right:20px;border:solid 2px #fff;border-top-color:#ff3b3b;border-left-color:#ff3b3b;border-right-color:#ff3b3b;border-radius:20px;animation:loading-spinner 500ms linear infinite}";

const BillingSettingView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.cards = [];
        this.fetchingCards = false;
        this.creatingCard = false;
        this.formError = '';
        this.getCards = () => {
            this.fetchingCards = true;
            BillingService()
                .listCards()
                .then(this.handleSuccess)
                .catch(this.handleError)
                .finally(() => this.fetchingCards = false);
        };
        this.handleSuccess = (resp) => {
            this.cards = resp.data;
        };
        this.handleError = (err) => {
            if (!err.error) {
                toastr().danger(DEFAULT_ERR_MSG);
                return console.log(err);
            }
            this.formError = err.error;
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            this.creatingCard = true;
            this.stripeEl.createToken()
                .then(this.createCard)
                .then(this.handleCreateCardSuccess)
                .catch(this.handleError)
                .finally(() => this.creatingCard = false);
        };
        this.createCard = (result) => {
            const payload = {
                token: result.token.id,
                brand: result.token.card.brand,
                lastFour: parseInt(result.token.card.last4),
                exp: `${result.token.card.exp_month}/${result.token.card.exp_year}`,
            };
            return BillingService()
                .createCard(payload);
        };
        this.handleCreateCardSuccess = (resp) => {
            toastr().success('Card was added!');
            this.cards = [...this.cards, resp.data];
            this.stripeEl.reset();
        };
        this.deleteCard = (e) => {
            const cardId = e.detail;
            BillingService()
                .deleteCard(cardId)
                .then(() => this.handleDeleteCardSuccess(cardId))
                .catch(this.handleError);
        };
        this.handleDeleteCardSuccess = (cardId) => {
            toastr().success('Card was deleted');
            this.cards = this.cards.filter(c => c.id !== cardId);
        };
        this.handleUpdateCardSuccess = (cardId) => {
            toastr().success('Card set as default');
            const newCardsValue = this.cards.map(c => {
                return Object.assign(Object.assign({}, c), { isDefault: c.id === cardId });
            });
            this.cards = [...newCardsValue];
        };
        this.setDefaultCard = (e) => {
            const cardId = e.detail;
            const payload = { isDefault: true };
            BillingService()
                .updateCard(cardId, payload)
                .then(() => this.handleUpdateCardSuccess(cardId))
                .catch(this.handleError);
        };
    }
    componentWillLoad() {
        this.getCards();
    }
    render() {
        return (h(Host, null, h("ta-card", null, h("ta-form-label", null, "Cards"), this.fetchingCards
            ?
                h("ta-loader", null)
            :
                h("div", { class: "cards" }, this.cards.map((card) => (h("ta-billing-card", { key: card.id, card: card, onTaSetDefaultClick: this.setDefaultCard, onTaDeleteClick: this.deleteCard })))), h("ta-form-label", null, "Add Card"), h("ta-form", { onTaSubmit: (e) => this.onSubmit(e) }, h("div", { style: { position: 'relative' } }, h("stripe-elements", { onChange: () => this.formError = '', "show-error": true, ref: (el) => this.stripeEl = el, "publishable-key": stripeKey() })), h("ta-error", { error: this.formError }), h("ta-button", { loading: this.creatingCard, onTaClick: (e) => this.onSubmit(e) }, "Add Card")))));
    }
};
BillingSettingView.style = billingSettingViewCss;

export { BillingSettingView as billing_setting_view };
