import axios from 'axios';
const API_URL = `https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
       cajas:[],
       caja:{},
       arqueos:[]
    },

    mutations: {
        GET_CAJAS: (state, data) => {
            state.cajas = data;
        },
        GET_CAJAID: (state, data) => {
            state.caja = data;
        },
        POST_CAJA: (state, status, data) => {
            if (status == 200) {
                state.cajas.unshift(data)
                state.msg = 'Guardado con exito'
            } else {
                state.msg = 'error al guardar'
            }
        },
        
        PUT_CAJA: (state, status) => {
            if (status == 200) {
                state.msg = 'Editado con exito'
            } else {
                state.msg = 'error al editar'
            }
        },
        DELETE_CAJA: (state, status) => {
            if (status == 200) {
                state.msg = 'eliminado con exito'
            } else {
                state.msg = 'error al eliminar'
            }
        },
        GET_ARQUEOS: (state, data) => {
            state.arqueos = data;
        },
        POST_ARQUEO: (state, status, data) => {
            if (status == 200) {
                state.arqueos.unshift(data)
                state.msg = 'Guardado con exito'
            } else {
                state.msg = 'error al guardar'
            }
        },
        PUTT_ARQUEO: (state, status, data) => {
            if (status == 200) {
                state.msg = 'Guardado con exito'
            } else {
                state.msg = 'error al guardar'
            }
        },
        
    },

    actions: {
        ObtenerCajas({ commit },id_empresa) {
            axios.get(API_URL + `api/cajas/${id_empresa}`).then(response => {
                commit('GET_CAJAS', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerCajaId({ commit },id_caja) {
            axios.get(API_URL +`api/cajas/id/${id_caja}`).then(response => {
                commit('GET_CAJAID', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarCaja({ commit }, data) {
            axios.post(API_URL +'api/cajas', data).then(response => {
                commit('POST_CAJA', response.status, data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EditarCaja({ commit }, data) {
            axios.put(API_URL +`api/cajas/${data.id_caja}`, data).then(response => {
                commit('PUT_CAJA', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        EliminarCaja({ commit }, id) {
            axios.delete(API_URL +`api/cajas/${id}`).then(response => {
                commit('DELETE_CAJA', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerArqueos({ commit },id_caja) {
            axios.get(API_URL +`api/cajas/arqueos/${id_caja}`).then(response => {
                commit('GET_ARQUEOS', response.data);
     
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarApertura({ commit }, data) {
            axios.post(API_URL +'api/cajas/arqueos/abrir', data).then(response => {
                commit('POST_ARQUEO', response.status, data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EditarCierre({ commit }, data) {
            axios.put(API_URL +`api/cajas/arqueos/cerrar`, data).then(response => {
                commit('PUT_ARQUEO', response.status, data);
            }).catch((error) => {
                console.log(error);
            })
        },

    },

}