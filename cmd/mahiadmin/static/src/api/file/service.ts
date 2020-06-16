import { get, post, ApiResponse, del } from '../base';
import { BASE_URL } from '../../config/index';
import { FilesResponse, SearchFileRequest } from './reqres';

export default function FileService() {
  return Object.freeze({
    listApplicationFiles(applicationId: string): Promise<FilesResponse> {
      return get(`${BASE_URL()}/applications/${applicationId}/files`);
    },
    search(req: SearchFileRequest): Promise<FilesResponse> {
      return post(`${BASE_URL()}/search/files`, req)
    },
    delete(fileId: string): Promise<ApiResponse> {
      return del(`${BASE_URL()}/files/${fileId}`)
    }
  })
}
