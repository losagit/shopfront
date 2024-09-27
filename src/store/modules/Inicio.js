import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        ventadia:{},
        ventames:{},
        compradia:{},
        comprames:{},
        dataventas:[],
        datacompras:[]
    },

    mutations: {
        GET_VENTA_DIA: (state, data) => {
            state.ventadia = data[0];
        },
        GET_VENTA_MES: (state, data) => {
            state.ventames = data[0];
        },
        GET_COMPRA_DIA: (state, data) => {
            state.compradia = data[0];
        },
        GET_COMPRA_MES: (state, data) => {
            state.comprames = data[0];
        },
        GET_GRAFICO_VENTA_MES: (state, data) => {
            state.dataventas = data;
        },
        GET_GRAFICO_COMPRA_MES: (state, data) => {
            state.datacompras = data;
        },
        
    },

    actions: {
        ObtenerVentasDia({ commit },id_usuario) {
            axios.get(API_URL + `api/inicio/ventasdia/${id_usuario}`).then(response => {
                commit('GET_VENTA_DIA', response.data);
     
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerVentasMes({ commit },id_usuario) {
            axios.get(API_URL + `api/inicio/ventasmes/${id_usuario}`).then(response => {
                commit('GET_VENTA_MES', response.data);
     
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerComprasDia({ commit },id_usuario) {
            axios.get(API_URL + `api/inicio/comprasdia/${id_usuario}`).then(response => {
                commit('GET_COMPRA_DIA', response.data);
                
            }).catch((error) => {
                console.log(error);
            })
        },
        ObtenerComprasMes({ commit },id_usuario) {
            axios.get(API_URL + `api/inicio/comprasmes/${id_usuario}`).then(response => {
                commit('GET_COMPRA_MES', response.data);
             
            }).catch((error) => {
                console.log(error);
            })
        },
        GraficoVentasMes({ commit },id_empresa) {
            axios.get(API_URL + `api/inicio/graficoventasmes/${id_empresa}`).then(response => {
                commit('GET_GRAFICO_VENTA_MES', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        GraficoComprasMes({ commit },id_empresa) {
            axios.get(API_URL + `api/inicio/graficocomprasmes/${id_empresa}`).then(response => {
                commit('GET_GRAFICO_COMPRA_MES', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
    },

}