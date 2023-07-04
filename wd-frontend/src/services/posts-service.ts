import { Post } from '../models/Post';
import { Api, ApiClient } from "./api-client";

export interface PostsService extends Api<Post> {}

export const PostsClientService = new ApiClient<Post>('posts');