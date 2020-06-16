import {CardModel} from "../../models/billing";

////////////////////////////////
// REQUESTS //
////////////////////////////////

export interface CreateCardRequest {
  token: string;
  exp: string;
  lastFour: number;
  brand: string;
}

export interface UpdateCardRequest {
  isDefault: boolean;
}

////////////////////////////////
// RESPONSES //
////////////////////////////////

export interface BillingResponse {
  data: {
    amountDue: number;
  }
}

export interface CardsResponse {
  data: CardModel[]
}

export interface CardResponse {
  data: CardModel;
}

