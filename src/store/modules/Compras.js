import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        compras: [],
    },

    getters: {
        getCompras: state => state.compras
    },

    mutations: {
        GET_COMPRAS: (state, data) => {
            state.compras = data;
        },
        POST_COMPRA: (state, status, data) => {
            if (status == 200) {
                state.compras.unshift(data)
                state.msg = 'Guardado con exito'
            } else {
                state.msg = 'error al guardar'
            }
        },
        DELETE_COMPRA:(state,status) =>{
            if(status == 200){
                state.msg = 'eliminado con exito'
            }else{
                state.msg = 'error al eliminar'
            }
        }
    },

    actions: {
        ImprimirCompra({ dispatch }) {
            axios.get(API_URL + `api/compras/lastId`).then(response => {
              console.log(response.data[0].id_compra); 
              dispatch('GenerarPdfCompra',response.data[0].id_compra);
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerCompras({ commit },id_empresa) {
            axios.get(API_URL + `api/compras/${id_empresa}`).then(response => {
                commit('GET_COMPRAS', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        ProcesarCompra({ commit }, data) {
            axios.post(API_URL + `api/compras`, data).then(response => {
                commit('POST_COMPRA', response.status, data);
            }).catch((error) => {
                console.log(error);
            })
        },
        GenerarPdfCompra({ commit },id_compra) {
            axios.get(API_URL + `api/compras/pdf/${id_compra}`,
                {
                    responseType: 'arraybuffer',
                    headers: { 'Accept': 'application/pdf' }
                }).then(response => {
                    const blob = new Blob([response.data], { type: 'application/pdf' });
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    window.open(link.href,"_blank")
                }).catch((error) => {
                    console.log(error);
                })
        },
        AnularCompra({ commit }, id_compra) {
            axios.put(API_URL + `api/compras/${id_compra}`).then(response => {
                commit('DELETE_COMPRA', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
    },

}