import { IdType } from "../common-types";

export type UserRoles = 'user' | 'admin' | 'trainer';
export type AccountStatus = 'active' | 'suspended' | 'deactivated';

export class UserCreateDto {
    constructor(
        public firstName: string,
        public lastName: string,
        public role: UserRoles,
        public avatar: string,
        public email: string,
        public status: AccountStatus
    ) { }
}
export class UserLoginDto {
    constructor(
        public email: string,
        public password: string
    ) {}
}

export class UserRegisterDto {
    constructor(
        public firstName: string,
        public lastName: string,
        public avatar: string,
        public email: string,
        public password: string
    ) {}
}

export class User extends UserCreateDto {
    constructor(
        public id: IdType,
        firstName: string,
        lastName: string,
        role: UserRoles,
        avatar: string,
        email: string,
        status: AccountStatus,
        public dateOfCreation: Date,
        public dateOfLastModification: Date
    ) {
        super(firstName, lastName, role, avatar, email, status);
    }
}
