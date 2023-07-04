import { IdType } from "../common-types";
import { Comment } from "./Comment";
import { User } from "./User";


export class PostCreateDto {
    constructor(
        public description: string,
        public imageUrl: string,
        public postedBy: IdType | User
    ) {}
}

export class Post extends PostCreateDto {
    constructor(
        public id: IdType,
        description: string,
        imageUrl: string,
        postedBy: IdType | User,
        public comments: IdType[] | Comment[],
        public createdAt: Date
    ) {
        super(description, imageUrl, postedBy)
    }
}