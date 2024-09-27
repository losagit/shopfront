import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        clientes: [],
        msg:'',
    },
    
    getters: {
        getClientes: state => state.clientes
    },

    mutations: {
        GET_CLIENTES: (state, data) => {
            state.clientes = data
        },
        POST_CLIENTE: (state,data) => {
            state.clientes.unshift(data);
        },
        PUT_CLIENTE:(state,status) =>{
            if(status ==200){
                state.msg = 'Editado con exito'
            }else{
                state.msg = 'error al editar'
            }
        },
        DELETE_CLIENTE:(state,status) =>{
            if(status == 200){
                state.msg = 'eliminado con exito'
            }else{
                state.msg = 'error al eliminar'
            }
        }
        
    },

    actions: {
        ObtenerClientes( { commit },id_empresa){
            axios.get(API_URL + `api/clientes/${id_empresa}`).then(response => {
                commit('GET_CLIENTES', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarCliente( {commit},data){
            axios.post(API_URL + `api/clientes`,data).then(response => {
                commit('POST_CLIENTE', data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EditarCliente({commit},data){
            axios.put(API_URL + `api/clientes/${data.id_cliente}`,data).then(response => {
                commit('PUT_CLIENTE', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        EliminarCliente({commit},id){
            axios.delete(API_URL + `api/clientes/${id}`).then(response => {
                commit('DELETE_CLIENTE', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        
        
    },

}