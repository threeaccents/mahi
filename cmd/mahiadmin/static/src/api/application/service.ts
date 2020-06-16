import { get, post, ApiResponse, del, patch } from '../base';
import { BASE_URL } from '../../config/index';
import { ApplicationResponse, ApplicationsResponse, CreateApplicationRequest } from '.';
import { UpdateApplicationRequest } from './reqres';

export default function ApplicationService() {
  return Object.freeze({
    create(req: CreateApplicationRequest): Promise<ApplicationResponse> {
      return post(`${BASE_URL()}/applications`, req);
    },
    update(applicationId: string, req: UpdateApplicationRequest): Promise<ApplicationResponse> {
      return patch(`${BASE_URL()}/applications/${applicationId}`, req)
    },
    list(): Promise<ApplicationsResponse> {
      return get(`${BASE_URL()}/applications`);
    },
    get(slug: string): Promise<ApplicationResponse> {
      return get(`${BASE_URL()}/applications/${slug}`);
    },
    delete(applicationId: string): Promise<ApiResponse> {
      return del(`${BASE_URL()}/applications/${applicationId}`);
    }
  })
}
