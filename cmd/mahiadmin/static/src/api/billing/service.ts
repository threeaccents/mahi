import {del, get, post, put } from '../base';
import {BASE_URL} from '../../config';
import {BillingResponse, CardResponse, CardsResponse, CreateCardRequest, UpdateCardRequest} from './reqres';


export default function BillingService() {
  function setBillingLocalStorage(resp: BillingResponse) {
    localStorage.setItem('amountDue', resp.data.amountDue.toString())
  }

  return Object.freeze({
    getBilling(): Promise<BillingResponse> {
      return get(`${BASE_URL()}/invoices`);
    },
    setBilling() {
      this.getBilling()
        .then(setBillingLocalStorage)
    },
    listCards(): Promise<CardsResponse> {
      return get(`${BASE_URL()}/cards`);
    },
    createCard(req: CreateCardRequest): Promise<CardResponse> {
      return post(`${BASE_URL()}/cards`, req);
    },
    updateCard(id: string, req: UpdateCardRequest): Promise<any> {
      return put(`${BASE_URL()}/cards/${id}`, req)
    },
    deleteCard(id: string): Promise<any> {
      return del(`${BASE_URL()}/cards/${id}`);
    }
  })
}
