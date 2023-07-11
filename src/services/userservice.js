import http from './httpService'

export function register(user) {
    return http.post('url', {
        //check with backend
        email: user.username,
        password: user.password,
        name: user.name
    })

}