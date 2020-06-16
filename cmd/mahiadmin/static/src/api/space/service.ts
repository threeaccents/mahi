import {SetSpaceStorageRequest, SpaceResponse} from './reqres';
import {patch} from '../base';
import {BASE_URL} from '../../config/index';

export default function SpaceService() {
  return Object.freeze({
    setStorage(req: SetSpaceStorageRequest): Promise<SpaceResponse> {
      return patch(`${BASE_URL()}/spaces`, req);
    },
    update(email: string): Promise<SpaceResponse> {
      return patch(`${BASE_URL()}/spaces`, {email});
    }
  })
}
