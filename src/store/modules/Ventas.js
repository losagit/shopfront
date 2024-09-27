import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        ventas: [],
        numero: [],
        msg:''
    },

    mutations: {
        GET_VENTAS: (state, data) => {
            state.ventas = data;
        },
        GET_NUMERO: (state, data) => {
            state.numero = data[0];
        },
        POST_VENTA: (state, status, data) => {
            if (status == 200) {
                state.ventas.unshift(data)
                state.msg = 'Guardado con exito'
            } else {
                state.msg = 'error al guardar'
            }
        },
        DELETE_VENTA:(state,status) =>{
            if(status == 200){
                state.msg = 'eliminado con exito'
            }else{
                state.msg = 'error al eliminar'
            }
        }
    },

    actions: {
        ImprimirVenta({ dispatch },id_empresa) {
            axios.get(API_URL + `api/ventas/lastId/${id_empresa}`).then(response => {
                console.log(response.data[0].id_venta); 
              dispatch('GenerarPdfVenta',response.data[0].id_venta);
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerVentas({ commit },id_empresa) {
            axios.get(API_URL + `api/ventas/${id_empresa}`).then(response => {
                commit('GET_VENTAS', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerNumero({ commit }, data) {
            axios.post(API_URL + `api/ventas/numero`,data).then(response => {
                if(data.tc == "Boleta"){
                    if(response.data.length == 0){
                        let serie = 'B'+data.sede+'01'
                        let numero = [{
                            serie:serie,
                            correlativo:"1"
                        }]
                        commit('GET_NUMERO', numero);
                    }else{
                        commit('GET_NUMERO', response.data);
                    }
                }else{
                    if(response.data.length == 0){
                        let serie = 'F'+data.sede+'01'
                        let numero = [{
                            serie:serie,
                            correlativo:"1"
                        }]
                        commit('GET_NUMERO', numero);
                    }else{
                        commit('GET_NUMERO', response.data);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        ProcesarVenta({ commit }, data) {
            axios.post(API_URL + `api/ventas`, data).then(response => {
                commit('POST_VENTA', response.status, data);
            }).catch((error) => {
                console.log(error);
            })
        },
        AnularVenta({ commit }, id_venta) {
            axios.put(API_URL + `api/ventas/${id_venta}`).then(response => {
                commit('DELETE_VENTA', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        GenerarPdfVenta({ commit },id_venta) {
            axios.get(API_URL + `api/ventas/pdf/${id_venta}`,
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
        }

    },

}