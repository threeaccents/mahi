import { B as BASE_URL } from './index-37baca77.js';
import { g as get, p as post, a as put, d as del } from './base-fd95655b.js';

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

export { BillingService as B };
