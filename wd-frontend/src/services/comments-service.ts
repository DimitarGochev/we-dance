import { Comment } from '../models/Comment';
import { Api, ApiClient } from "./api-client";

export interface CommentsService extends Api<Comment> {}

export const CommentsClientService = new ApiClient<Comment>('comments');