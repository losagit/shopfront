import Vue from 'vue'
import Vuex from 'vuex'
import Categoria from './modules/Categoria';
import Cliente from './modules/Cliente';
import Compras from './modules/Compras';
import Producto from './modules/Producto';
import Proveedor from './modules/Proveedor';
import Subcategoria from './modules/Subcategoria';
import Unidad from './modules/Unidad';
import Login from './modules/Login';
import Ventas from './modules/Ventas';
import Usuario from './modules/Usuario';
import Cajas from './modules/Cajas';
import Inicio from './modules/Inicio'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ProductoModule: Producto,
    CategoriaModule: Categoria,
    SubcategoriaModule: Subcategoria,
    UnidadModule: Unidad,
    ClienteModule: Cliente,
    CompraModule: Compras,
    VentaModule: Ventas,
    ProveedorModule:Proveedor,
    LoginModule:Login,
    UsuarioModule:Usuario,
    CajaModule:Cajas,
    InicioModule:Inicio
  }
})
