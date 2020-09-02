import { p as post, g as get, b as put, d as del } from './base-1320a4aa.js';
import { B as BASE_URL } from './index-16096693.js';

function UserService() {
    return Object.freeze({
        createUser(req) {
            return post(`${BASE_URL()}/users`, req);
        },
        createSuperUser(req) {
            return post(`${BASE_URL()}/superusers`, req);
        },
        listSpaceUsers() {
            return get(`${BASE_URL()}/users`);
        },
        getUser(userId) {
            return get(`${BASE_URL()}/users/${userId}`);
        },
        updateUser(userId, req) {
            return put(`${BASE_URL()}/users/${userId}`, req);
        },
        deleteUser(userId) {
            return del(`${BASE_URL()}/users/${userId}`);
        },
        updatePassword(req) {
            return post(`${BASE_URL()}/users/${req.userId}/update-password`, req);
        }
    });
}

export { UserService as U };
