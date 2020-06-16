import { ApplicationModel } from "../../models/application";

///////////////////////////////////////////
// REQUESTS //
///////////////////////////////////////////
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  userIds?: string[];
  storageEngine?: string;
  storageSecretKey?: string;
  storageEndpoint?: string;
  storageRegion?: string;
  storageAccessKey?: string;
}

export interface UpdateApplicationRequest {
  description?: string;
  userIds?: string[];
  name?: string;
}

///////////////////////////////////////////
// RESPONSES //
///////////////////////////////////////////
export interface ApplicationResponse {
  data: ApplicationModel;
}

export interface ApplicationsResponse {
  data: ApplicationModel[];
}

