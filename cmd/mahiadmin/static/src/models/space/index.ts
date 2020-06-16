import {UserModel} from "../user";
import {StorageEngineType} from "../application";

export interface SpaceModel {
  id: string;
  name: string;
  email:string;
  users: UserModel[];
  storageEngine: StorageEngineType;
  storageSecretKey?: string;
  storageBucket?: string;
  storageEndpoint?: string;
  storageRegion?: string;
  storageAccessKey?: string;
}
