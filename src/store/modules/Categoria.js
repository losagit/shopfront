import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        categorias: [],
        msg:''
    },
    
    getters: {
        getCategorias: state => state.categorias
    },

    mutations: {
        GET_CATEGORIAS: (state, data) => {
            state.categorias = data
        },
        POST_CATEGORIA: (state,status,data) => {
            if(status == 200){
                state.categorias.unshift(data)
                state.msg = 'Guardado con exito'
            }else{
                state.msg = 'error al guardar'
            }
        },
        PUT_CATEGORIA:(state,status) =>{
            if(status ==200){
                state.msg = 'Editado con exito'
            }else{
                state.msg = 'error al editar'
            }
        },
        DELETE_CATEGORIA:(state,status) =>{
            if(status == 200){
                state.msg = 'eliminado con exito'
            }else{
                state.msg = 'error al eliminar'
            }
        }
        
    },

    actions: {
        ObtenerCategorias( { commit },id_empresa ){
            axios.get(API_URL + `api/categorias/${id_empresa}`).then(response => {
                commit('GET_CATEGORIAS', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarCategoria( {commit},data){
            axios.post(API_URL + `api/categorias`,data).then(response => {
                commit('POST_CATEGORIA', response.status,data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EditarCategoria({commit},data){
            axios.put(API_URL + `api/categorias/${data.id_categoria}`,data).then(response => {
                commit('PUT_CATEGORIA', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        EliminarCategoria({commit},id){
            axios.delete(API_URL + `api/categorias/${id}`).then(response => {
                commit('DELETE_CATEGORIA', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        
        
    },

}