import Api from './Api'

export default {
    getToken(params) {
        return Api().post("/api.php", {
            action: 'getToken',
            username: params.username,
            password: params.password,
        })
    }
}
