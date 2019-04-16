import axios from 'axios'
import router from './router'

const state = {
    token: null,
    username: null,
    authError: null
}

const mutations = {
    authUser(state, userData) {
        state.token = userData.token
        state.username = userData.username
    },
    setAuthError(state, error) {
        state.authError = error
    },
    clearAuthError(state) {
        state.authError = null
    },
    clearAuthData(state) {
        state.token = null
        state.username = null
    }
}

const actions = {
    setLogoutTimer({commit}, expirationTime) {
        setTimeout(() => {
            commit('clearAuthData')
            commit('setAuthError', 'token has expired')
        }, 60 * 60 * 1000)
    },
    login({commit, dispatch}, authData) {
        return new Promise((resolve, reject) => {
            axios.post("/api.php", {
                action: 'getToken',
                username: authData.username,
                password: authData.password
            })
                .then(res => {
                    if ('error' in res.data) {
                        commit('setAuthError', res.data.error.message)
                        resolve(0)
                    } else {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('username', authData.username)
                        localStorage.setItem('expirationDate', res.data.expires)
                        commit('authUser', {
                            token: res.data.token,
                            username: authData.username
                        })
                        dispatch('setLogoutTimer', res.data.expires)

                        resolve(1)
                    }
                })
                .catch(error => {
                    commit('setAuthError', 'Server does not respond')
                });
        })
    },
    tryAutoLogin({commit, dispatch}) {
        const token = localStorage.getItem('token')
        const expirationDate = localStorage.getItem('expirationDate')
        const username = localStorage.getItem('username')
        const now = new Date()

        if (!token || now >= expirationDate) {
            dispatch('logout')
        }

        commit('authUser', {
            token: token,
            username: username
        })
    },
    logout({commit}) {
        commit('clearAuthData')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        router.replace('/login')
    }
}

const getters = {
    token: state => {
        return state.token
    },
    username: state => {
        return state.username
    },
    authError: state => {
        return state.authError
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
