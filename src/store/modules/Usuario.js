import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        usuarios:[],
        roles:[]
    },

    mutations: {
        GET_USERS: (state, data) => {
            state.usuarios = data
        },
        GET_ROLES: (state, data) => {
            state.roles = data
        },
    },

    actions: {
        ObtenerUsuarios( { commit } ,id_empresa){
            axios.get(API_URL + `api/usuarios/${id_empresa}`).then(response => {
                commit('GET_USERS', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerRoles( { commit }){
            axios.get(API_URL + `api/usuarios/roles`).then(response => {
                commit('GET_ROLES', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },

    }
}