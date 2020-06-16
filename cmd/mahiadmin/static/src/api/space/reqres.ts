import {SpaceModel} from "../../models/space";
import {StorageEngineType} from "../../models/application";

export interface SetSpaceStorageRequest {
  storageEngine: StorageEngineType;
  storageSecretKey?: string;
  storageBucket?: string;
  storageRegion?: string;
  storageAccessKey?: string;
}

export interface SpaceResponse {
  data: SpaceModel;
}
