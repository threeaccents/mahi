export interface CustomStorageItem {
  name: string;
  value: string;
  icon?: string;
}

export const customStorages: CustomStorageItem[] = [
  {
    name: 'Wasabi',
    value: 'wasabi'
  },
  {
    name: 'Digital Ocean',
    value: 'digital_ocean'
  },
  {
    name: 'Backblaze B2',
    value: 'b2'
  },
  {
    name: 'AWS s3',
    value: 's3'
  },
  {
    name: 'Azure',
    value: 'azure_blob_storage'
  },
  {
    name: 'Google',
    value: 'google_cloud_storage'
  },
]
