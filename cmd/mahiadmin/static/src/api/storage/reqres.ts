import {SpaceModel} from "../../models/space";
import {StorageEngineType} from "../../models/application";

export interface TestStorageRequest {
  storageAccessKey: string;
  storageEngine: StorageEngineType;
  storageSecretKey: string;
  storageBucket: string;
  storageRegion?: string;
}

export interface TestStorageResponse {
  data: SpaceModel;
}
