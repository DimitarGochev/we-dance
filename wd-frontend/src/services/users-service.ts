import { User } from '../models/User';
import { Api, ApiClient } from "./api-client";

export interface UsersService extends Api<User> {}

export const UsersClientService = new ApiClient<User>('users');