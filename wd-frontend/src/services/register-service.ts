import { UserRegisterDto } from "../models/User";
import { BASE_API_URL, handleRequest } from "./api-client";

class RegisterClient {

    register(data: UserRegisterDto) {
        return handleRequest(`${BASE_API_URL}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}
    export const RegisterService = new RegisterClient();