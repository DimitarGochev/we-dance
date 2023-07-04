import { IdType } from "../common-types";
import { User } from "./User";

export class CommentCreateDto {
    constructor(
        public text: string,
        public postedBy: IdType | User,
        public postId: IdType
    ) {}
}

export class Comment extends CommentCreateDto {
    constructor(
        public id: IdType,
        text: string,
        postedBy: IdType | User,
        postId: IdType,
        public createdAt: Date
    ) {
        super(text, postedBy, postId);
    }
}