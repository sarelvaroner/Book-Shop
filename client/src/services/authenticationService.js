import { API_URI, ROLE } from "../const";
import jwt_decode from "jwt-decode";

export async function login(email, password) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        const response = await fetch(`${API_URI}/users/login`, requestOptions)
        const data = await response.json()

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                return { user: null, massage: 'cannot login pleas try again' }
            }
            const error = (data && data.message) || response.statusText;
            return new Error(error)
        }
        const { token, user } = data
        const isAdmin = jwt_decode(token).role === ROLE.admin
        return { user, token, isAdmin, massage: 'success' };
    }
    catch (err) {
        // TODO:redirect to handle error component
        console.log(err)
    }
}
