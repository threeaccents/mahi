import {SpaceModel} from "../space";

export interface UserModel {
  id?: string;
  space?: SpaceModel;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export const initialNewUserModel: UserModel = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: false,
}

export interface NewSuperUserModel {
  space: string;
  fullName: string;
  email: string;
  password: string;
}

export const initialNewSuperUserModel: NewSuperUserModel = {
  space: '',
  fullName: '',
  email: '',
  password: '',
}
