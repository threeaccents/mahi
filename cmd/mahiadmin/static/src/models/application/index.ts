import {UserModel} from "../user";

export type StorageEngineType =
  'oriio' |
  'wasabi' |
  'digital_ocean' |
  'b2' |
  's3' |
  'azure_blob_storage' |
  'google_cloud_storage';

export interface ApplicationModel {
  id: string;
  name: string;
  slug: string;
  description: string;
  storageEngine: string;
  users: UserModel[];
  storage: number;
  fileCount: number;
  cdnUrl: string;
}

export interface NewApplicationModel {
  name: string;
  description?: string;
  userIds: string[];
  storageEngine: StorageEngineType;
  storageSecretKey?: string;
  storageEndpoint?: string;
  storageRegion?: string;
  storageAccessKey?: string;
}

export const initialNewApplicationModel: NewApplicationModel = {
  name: '',
  description: '',
  userIds: [],
  storageEngine: 'oriio',
  storageSecretKey: '',
  storageEndpoint: '',
  storageRegion: '',
  storageAccessKey: '',
}

export interface UpdateApplicationModel {
  name?: string;
  description?: string;
  userIds?: string[];
}