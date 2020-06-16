import {FileModel} from "../../models/file";

export interface FilesResponse {
  data: FileModel[];
}

export interface FileResponse {
  data: FileModel;
}

export interface SearchFileRequest {
  applicationId: string;
  query: string;
}
