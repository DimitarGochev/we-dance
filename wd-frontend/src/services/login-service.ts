import { User, UserLoginDto } from "../models/User";
import { BASE_API_URL, handleRequest } from "./api-client";

class LoginClient {

    login({email, password}: UserLoginDto): Promise<User> {
        return handleRequest(`${BASE_API_URL}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    }
}
    export const LoginService = new LoginClient();