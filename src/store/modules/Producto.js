import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        productos: [],
        catalogo:[],
        stock:[],
    },

    getters: {
        getProductos: state => state.productos,
    },

    mutations: {
        GET_PRODUCTOS: (state, data) => {
            state.productos = data;
        },
        GET_CATALOGO: (state, data) => {
            state.catalogo = data;
        },
        GET_STOCK: (state, data) => {
            state.stock = data;
        },
        POST_PRODUCTO: (state, status, data) => {
            if (status == 200) {
                state.productos.unshift(data)
                state.msg = 'Guardado con exito'
            } else {
                state.msg = 'error al guardar'
            }
        },
        POST_CATALOGO: (state, status, data) => {
            if (status == 200) {
                state.catalogo.unshift(data)
                state.msg = 'Guardado con exito'
            } else {
                state.msg = 'error al guardar'
            }
        },
        PUT_PRODUCTO: (state, status) => {
            if (status == 200) {
                state.msg = 'Editado con exito'
            } else {
                state.msg = 'error al editar'
            }
        },
        DELETE_PRODUCTO: (state, status) => {
            if (status == 200) {
                state.msg = 'eliminado con exito'
            } else {
                state.msg = 'error al eliminar'
            }
        },
        DELETE_CATALOGO: (state, status) => {
            if (status == 200) {
                state.msg = 'eliminado con exito'
            } else {
                state.msg = 'error al eliminar'
            }
        }
    },

    actions: {
        ObtenerProductos({ commit },id_empresa) {
            axios.get(API_URL + `api/productos/${id_empresa}`).then(response => {
                commit('GET_PRODUCTOS', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarProducto({ commit }, data) {
            axios.post(API_URL + `api/productos`, data).then(response => {
                commit('POST_PRODUCTO', response.status, data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EditarProducto({ commit }, data) {
            axios.put(API_URL + `api/productos/${data.id_producto}`, data).then(response => {
                commit('PUT_PRODUCTO', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        EliminarProducto({ commit }, id) {
            axios.delete(API_URL + `api/productos/${id}`).then(response => {
                commit('DELETE_PRODUCTO', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerStock({ commit },id_empresa) {
            axios.get(API_URL + `api/catalogo/stock/${id_empresa}`).then(response => {
                commit('GET_STOCK', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerCatalogo({ commit },id_empresa) {
            axios.get(API_URL + `api/catalogo/${id_empresa}`).then(response => {
                commit('GET_CATALOGO', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarCatalogo({ commit }, data) {
            axios.post(API_URL + `api/catalogo`, data).then(response => {
                commit('POST_CATALOGO', response.status, data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EliminarCatalogo({ commit }, id) {
            axios.delete(API_URL + `api/catalogo/${id}`).then(response => {
                commit('DELETE_CATALOGO', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
    },

}