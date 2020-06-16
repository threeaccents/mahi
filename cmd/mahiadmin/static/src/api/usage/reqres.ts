import {UsagesModel} from "../../models/usage";

export interface UsagesQueryParam {
  start_time?: string;
  end_time?: string;
}

export interface UsagesResponse {
  data: UsagesModel;
}

