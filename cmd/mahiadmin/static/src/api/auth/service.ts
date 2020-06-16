import {AuthenticateRequest, AuthenticateResponse, MeResponse} from './reqres';
import {BASE_URL} from '../../config';
import {get, post} from '../base';
import {UserModel} from '../../models/user';

const onAuthenticateSuccess = (resp: AuthenticateResponse): Promise<MeResponse> => {
  AuthService().setToken(resp.data.token)
  return AuthService().me();
}

export const onMeSuccess = (resp: MeResponse): Promise<UserModel> => {
  AuthService().setMe(resp.data)
  return Promise.resolve(resp.data);
}

export default function AuthService() {
  return Object.freeze({
    authenticate(req: AuthenticateRequest): Promise<UserModel> {
      return post(`${BASE_URL()}/authenticate`, req)
        .then(onAuthenticateSuccess)
        .then(onMeSuccess)
    },
    me(): Promise<MeResponse> {
      return get(`${BASE_URL()}/me`);
    },
    passwordResetRequest(email: string): Promise<any> {
      return post(`${BASE_URL()}/accounts/request_reset`, {email})
    },
    resetPassword(token: string, password: string): Promise<any> {
      return post(`${BASE_URL()}/accounts/reset`, {token, password})
    },
    setToken(token: string): void {
      localStorage.setItem('token', token)
    },
    setMe(me: UserModel): void {
      localStorage.setItem('me', JSON.stringify(me))
      localStorage.setItem('userId', me.id)
    },
    logout(): void {
      localStorage.clear();
      window.location.href = "/auth"
    },
    isAuthenticated(): boolean {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const me = localStorage.getItem('me')
      if (!token || token === '') return false;
      if (!userId || userId === '') return false;
      if (!me || me === '') return false;
      return true
    },
    updateLocalStorage() {
      this.me()
        .then(onMeSuccess)
    }
  })
}
