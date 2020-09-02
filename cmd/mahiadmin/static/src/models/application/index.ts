export type StorageEngineType =
  'wasabi' |
  'digital_ocean' |
  'b2' |
  's3' |
  'azure_blob_storage' |
  'google_cloud_storage';

export interface ApplicationModel {
  id: string;
  name: string;
  description: string;
  storageEngine: string;
  deliveryUrl: string;
}

export interface NewApplicationModel {
  name: string;
  description?: string;
  deliveryUrl: string;
  storageEngine: StorageEngineType;
  storageSecretKey?: string;
  storageEndpoint?: string;
  storageRegion?: string;
  storageAccessKey?: string;
}

export const initialNewApplicationModel: NewApplicationModel = {
  name: '',
  description: '',
  deliveryUrl: '',
  storageEngine: 's3',
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