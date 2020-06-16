import {UserModel} from "../../models/user";

///////////////////////////////////////////
// REQUESTS //
///////////////////////////////////////////

export interface CreateSuperUserRequest {
  spaceName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

export interface UpdatePasswordRequest {
  userId: string;
  oldPassword: string;
  password: string;
}


///////////////////////////////////////////
// RESPONSES //
///////////////////////////////////////////
export interface UserResponse {
  data: UserModel;
}

export interface UsersResponse {
  data: UserModel[];
}
