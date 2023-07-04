import { IdType } from "../common-types";


export class ClubCreateDto {
    constructor(
        public name: string,
        public logo: string,
        public ownerId: IdType,
        public members: IdType[]
    ) {}
}

export class Club extends ClubCreateDto {
    constructor(
        public id: IdType,
        name: string,
        logo: string,
        ownerId: IdType,
        members: IdType[],
        public createdAt: Date
    ) {
        super(name, logo, ownerId, members);
    }
}