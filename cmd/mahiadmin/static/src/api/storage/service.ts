import {TestStorageRequest, TestStorageResponse} from './reqres';
import {post} from '../base';
import {BASE_URL} from '../../config/index';

export default function StorageService() {
  return Object.freeze({
    testStorage(req: TestStorageRequest): Promise<TestStorageResponse> {
      return post(`${BASE_URL()}/storages/check`, req);
    }
  })
}
