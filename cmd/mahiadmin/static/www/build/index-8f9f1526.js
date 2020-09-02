import { p as post, g as get } from './base-1320a4aa.js';
import { B as BASE_URL } from './index-16096693.js';

const onAuthenticateSuccess = (resp) => {
    AuthService().setToken(resp.data.token);
    return AuthService().me();
};
const onMeSuccess = (resp) => {
    AuthService().setMe(resp.data);
    return Promise.resolve(resp.data);
};
function AuthService() {
    return Object.freeze({
        authenticate(req) {
            return post(`${BASE_URL()}/authenticate`, req)
                .then(onAuthenticateSuccess)
                .then(onMeSuccess);
        },
        me() {
            return get(`${BASE_URL()}/me`);
        },
        passwordResetRequest(email) {
            return post(`${BASE_URL()}/accounts/request_reset`, { email });
        },
        resetPassword(token, password) {
            return post(`${BASE_URL()}/accounts/reset`, { token, password });
        },
        setToken(token) {
            localStorage.setItem('token', token);
        },
        setMe(me) {
            localStorage.setItem('me', JSON.stringify(me));
            localStorage.setItem('userId', me.id);
        },
        logout() {
            localStorage.clear();
            window.location.href = "/auth";
        },
        isAuthenticated() {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const me = localStorage.getItem('me');
            if (!token || token === '')
                return false;
            if (!userId || userId === '')
                return false;
            if (!me || me === '')
                return false;
            return true;
        },
        updateLocalStorage() {
            this.me()
                .then(onMeSuccess);
        }
    });
}

export { AuthService as A };
