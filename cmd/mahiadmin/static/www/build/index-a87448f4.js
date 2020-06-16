import { B as BASE_URL } from './index-37baca77.js';
import { g as get, p as post, d as del } from './base-fd95655b.js';

function FileService() {
    return Object.freeze({
        listApplicationFiles(applicationId) {
            return get(`${BASE_URL()}/applications/${applicationId}/files`);
        },
        search(req) {
            return post(`${BASE_URL()}/search/files`, req);
        },
        delete(fileId) {
            return del(`${BASE_URL()}/files/${fileId}`);
        }
    });
}

export { FileService as F };
