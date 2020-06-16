import {
  CreateSuperUserRequest,
  CreateUserRequest,
  UpdatePasswordRequest,
  UpdateUserRequest,
  UserResponse,
  UsersResponse
} from './reqres';
import {ApiResponse, del, get, post, put} from '../base';
import {BASE_URL} from '../../config/index';

export default function UserService() {
  return Object.freeze({
    createUser(req: CreateUserRequest): Promise<UserResponse> {
      return post(`${BASE_URL()}/users`, req);
    },
    createSuperUser(req: CreateSuperUserRequest): Promise<UserResponse> {
      return post(`${BASE_URL()}/superusers`, req);
    },
    listSpaceUsers(): Promise<UsersResponse> {
      return get(`${BASE_URL()}/users`);
    },
    getUser(userId: string): Promise<UserResponse> {
      return get(`${BASE_URL()}/users/${userId}`)
    },
    updateUser(userId: string, req: UpdateUserRequest): Promise<UserResponse> {
      return put(`${BASE_URL()}/users/${userId}`, req)
    },
    deleteUser(userId: string): Promise<ApiResponse> {
      return del(`${BASE_URL()}/users/${userId}`)
    },
    updatePassword(req: UpdatePasswordRequest): Promise<ApiResponse> {
      return post(`${BASE_URL()}/users/${req.userId}/update-password`, req)
    }
  })
}
