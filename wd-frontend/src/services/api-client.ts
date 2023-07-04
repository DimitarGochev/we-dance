import { IdType, Identifiable } from "../common-types";

export const BASE_API_URL = 'http://localhost:3000';

export interface Api<T extends Identifiable> {
    findAll():  Promise<T[]>;
    findById(id: IdType): Promise<T>;
    create(entity: Omit<T, 'id'>): Promise<T>;
    update(entity: T): Promise<T>;
    deleteById(id: IdType): Promise<T>;
}

export class ApiClient<T extends Identifiable> implements Api<T>{
    constructor(private collection: string) {}
    findAll(): Promise<T[]> {
        return handleRequest<T[]>(`${BASE_API_URL}/${this.collection}`);
    }
    findById(id: IdType): Promise<T> {
        return handleRequest<T>(`${BASE_API_URL}/${this.collection}/${id}`);
    }
    create(entity: Omit<T, "id">): Promise<T> {
        return handleRequest<T>(`${BASE_API_URL}/${this.collection}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    update(entity: T): Promise<T> {
        return handleRequest<T>(`${BASE_API_URL}/${this.collection}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    deleteById(id: string): Promise<T> {
        return handleRequest<T>(`${BASE_API_URL}/${this.collection}/${id}`, {
            method: 'DELETE'
        });
    }
}

    

export async function handleRequest<D>(url: string, options?: RequestInit) {
    try {
        const resp = await fetch(url, options);
        if(resp.status >= 400) {
            return Promise.reject(resp.body);
        }
        return resp.json() as D;
    } catch(err) {
        return Promise.reject(err);
    }
}