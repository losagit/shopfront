import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        proveedores: [],
        msg: ''
    },

    getters: {
        getProveedors: state => state.proveedores
    },

    mutations: {
        GET_PROVEEDORES: (state, data) => {
            state.proveedores = data
        },
        POST_PROVEEDOR: (state, status, data) => {
            if (status == 200) {
                state.proveedores.unshift(data)
                state.msg = 'Guardado con exito'
            } else {
                state.msg = 'error al guardar'
            }
        },
        PUT_PROVEEDOR: (state, status) => {
            if (status == 200) {
                state.msg = 'Editado con exito'
            } else {
                state.msg = 'error al editar'
            }
        },
        DELETE_PROVEEDOR: (state, status) => {
            if (status == 200) {
                state.msg = 'eliminado con exito'
            } else {
                state.msg = 'error al eliminar'
            }
        }

    },

    actions: {
        ObtenerProveedores({ commit },id_empresa) {
            axios.get(API_URL + `api/proveedores/${id_empresa}`).then(response => {
                commit('GET_PROVEEDORES', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarProveedor({ commit }, data) {
            console.log(data);
            axios.post(API_URL + `api/proveedores`, data).then(response => {
                commit('POST_PROVEEDOR', response.status, data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EditarProveedor({ commit }, data) {
            axios.put(API_URL + `api/proveedores/${data.id_proveedor}`, data).then(response => {
                commit('PUT_PROVEEDOR', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        EliminarProveedor({ commit }, id) {
            axios.delete(API_URL + `api/proveedores/${id}`).then(response => {
                commit('DELETE_PROVEEDOR', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },


    },

}