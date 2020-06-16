import { B as BASE_URL } from './index-37baca77.js';
import { b as patch } from './base-fd95655b.js';

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
