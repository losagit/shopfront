import AuthService from '../../services/auth.service';
import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export default {
    namespaced: true,
    state:  initialState,

    mutations: {
        GET_USERS: (state, data) => {
            state.usuarios = data
        },
        LOGIN_SUCCESS(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        LOGIN_FAILURE(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        LOGOUT(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        REGISTER_SUCCESS(state) {
            state.status.loggedIn = false;
        },
        REGISTER_FAILURE(state) {
            state.status.loggedIn = false;
        }
    },

    actions: {
        ObtenerUsuarios( { commit } ,id_empresa){
            axios.get(API_URL + `api/usuarios/${id_empresa}`).then(response => {
                commit('GET_USERS', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('LOGIN_SUCCESS', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('LOGIN_FAILURE');
                    return Promise.reject(error);
                }
            );

        },
        logout({ commit }) {
            AuthService.logout();
            commit('LOGOUT');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('REGISTER_SUCCESS');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('REGISTER_FAILURE');
                    return Promise.reject(error);
                }
            );
        }
    }
}