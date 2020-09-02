import { p as post, a as patch, g as get, d as del } from './base-1320a4aa.js';
import { B as BASE_URL } from './index-16096693.js';

function ApplicationService() {
    return Object.freeze({
        create(req) {
            return post(`${BASE_URL()}/applications`, req);
        },
        update(applicationId, req) {
            return patch(`${BASE_URL()}/applications/${applicationId}`, req);
        },
        list() {
            return get(`${BASE_URL()}/applications`);
        },
        get(slug) {
            return get(`${BASE_URL()}/applications/${slug}`);
        },
        delete(applicationId) {
            return del(`${BASE_URL()}/applications/${applicationId}`);
        }
    });
}

export { ApplicationService as A };
