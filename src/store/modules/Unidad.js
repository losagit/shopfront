import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        unidades: [],
    },
    
    getters: {
        getUnidades: state => state.unidades
    },

    mutations: {
        GET_UNIDADES: (state, data) => {
            state.unidades = data
        },
        POST_UNIDAD: (state,status,data) => {
            if(status == 200){
                state.unidades.unshift(data)
                state.msg = 'Guardado con exito'
            }else{
                state.msg = 'error al guardar'
            }
        },
        PUT_UNIDAD:(state,status) =>{
            if(status ==200){
                state.msg = 'Editado con exito'
            }else{
                state.msg = 'error al editar'
            }
        },
        DELETE_UNIDAD:(state,status) =>{
            if(status == 200){
                state.msg = 'eliminado con exito'
            }else{
                state.msg = 'error al eliminar'
            }
        }
    },

    actions: {
        ObtenerUnidades( { commit },id_empresa ){
            axios.get(API_URL + `api/unidades/${id_empresa}`).then(response => {
                commit('GET_UNIDADES', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarUnidad( {commit},data){
            axios.post(API_URL + `api/unidades`,data).then(response => {
                commit('POST_UNIDAD', response.status,data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EditarUnidad({commit},data){
            axios.put(API_URL + `api/unidades/${data.id_unidad}`,data).then(response => {
                commit('PUT_UNIDAD', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        EliminarUnidad({commit},id){
            axios.delete(API_URL + `api/unidades/${id}`).then(response => {
                commit('DELETE_UNIDAD', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        
    },

}