import { B as BASE_URL } from './index-37baca77.js';
import { a as patch } from './base-1320a4aa.js';

function SpaceService() {
    return Object.freeze({
        setStorage(req) {
            return patch(`${BASE_URL()}/spaces`, req);
        },
        update(email) {
            return patch(`${BASE_URL()}/spaces`, { email });
        }
    });
}

export { SpaceService as S };
