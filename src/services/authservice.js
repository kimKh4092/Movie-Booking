import http from './httpService'
import jwtDecode from 'jwt-decode'

export function login(email, password) {
    return http.post('url', { email, password })
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    }
    catch (ex) {
    }
}