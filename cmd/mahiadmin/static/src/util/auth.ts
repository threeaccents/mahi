import {UserModel} from "../models/user"

export const me = (): UserModel => {
  return JSON.parse(localStorage.getItem('me'));
}

export const meUserId = (): string => {
  return localStorage.getItem('userId');
}
