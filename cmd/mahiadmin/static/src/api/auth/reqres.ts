import {UserModel} from "../../models/user";

////////////////////////////////
// REQUESTS //
////////////////////////////////
export interface AuthenticateRequest {
  email: string;
  password: string;
}

////////////////////////////////
// RESPONSES //
////////////////////////////////
export interface AuthenticateResponse {
  data: {
    token: string;
  }
}

export interface MeResponse {
  data: UserModel;
}
