import axios from 'axios';
const API_URL = `https://https://shopback01.vercel.app/`;
//const API_URL = `http://localhost:3030/`;
export default {
    namespaced: true,
    state: {
        subcategorias: [],
        msg:''
    },
    
    getters: {
        getSubcategorias: state => state.subcategorias
    },

    mutations: {
        GET_SUBCATEGORIAS: (state, data) => {
            state.subcategorias = data
        },
        POST_SUBCATEGORIA: (state,status,data) => {
            if(status == 200){
                state.subcategorias.unshift(data)
                state.msg = 'Guardado con exito'
            }else{
                state.msg = 'error al guardar'
            }
        },
        PUT_SUBCATEGORIA:(state,status) =>{
            if(status ==200){
                state.msg = 'Editado con exito'
            }else{
                state.msg = 'error al editar'
            }
        },
        DELETE_SUBCATEGORIA:(state,status) =>{
            if(status == 200){
                state.msg = 'eliminado con exito'
            }else{
                state.msg = 'error al eliminar'
            }
        }
        
    },

    actions: {
        ObtenerSubcategorias( { commit },id_empresa ){
            axios.get(API_URL + `api/subcategorias/${id_empresa}`).then(response => {
                commit('GET_SUBCATEGORIAS', response.data);
            }).catch((error) => {
                console.log(error);
            })
        },
        RegistrarSubcategoria( {commit},data){
            axios.post(API_URL + `api/subcategorias`,data).then(response => {
                commit('POST_SUBCATEGORIA', response.status,data);
            }).catch((error) => {
                console.log(error);
            })
        },
        EditarSubcategoria({commit},data){
            axios.put(API_URL + `api/subcategorias/${data.id_subcategoria}`,data).then(response => {
                commit('PUT_SUBCATEGORIA', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        EliminarSubcategoria({commit},id){
            axios.delete(API_URL + `api/subcategorias/${id}`).then(response => {
                commit('DELETE_SUBCATEGORIA', response.status);
            }).catch((error) => {
                console.log(error);
            })
        },
        
        
    },

}