import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/inicio',
        name: 'Inicio',
        component: function () {
          return import('../views/Inicio.vue')
        }
      },
      {
        path: '/productos',
        name: 'Productos',
        component: function () {
          return import('../views/Productos.vue')
        }
      },
      {
        path: '/catalogo',
        name: 'Catalogo',
        component: function () {
          return import('../views/Catalogo.vue')
        }
      },
      {
        path: '/categorias',
        name: 'Categorias',
        component: function () {
          return import('../views/Categorias.vue')
        }
      },
      {
        path: '/subcategorias',
        name: 'Subcategorias',
        component: function () {
          return import('../views/Subcategorias.vue')
        }
      },
      {
        path: '/unidades',
        name: 'Unidades',
        component: function () {
          return import('../views/Unidades.vue')
        }
      },
      {
        path: '/compras',
        name: 'Compras',
        component: function () {
          return import('../views/Compras.vue')
        },
      },
      {
        path: '/nuevacompra',
        name: 'NUevacompras',
        component: function () {
          return import('../views/NuevaCompra.vue')
        }
      },
      {
        path: '/ventas',
        name: 'Ventas',
        component: function () {
          return import('../views/Ventas.vue')
        }
      },
      {
        path: '/nuevaventa',
        name: 'NuevaVenta',
        component: function () {
          return import('../views/NuevaVenta.vue')
        }
      },
      {
        path: '/clientes',
        name: 'Clientes',
        component: function () {
          return import('../views/Clientes.vue')
        }
      },
      {
        path: '/proveedores',
        name: 'Proveedores',
        component: function () {
          return import('../views/Proveedores.vue')
        }
      },
      {
        path: '/stock',
        name: 'Stock',
        component: function () {
          return import('../views/Stock.vue')
        }
      },
      {
        path: '/cajas',
        name: 'Cajas',
        component: function () {
          return import('../views/Caja.vue')
        }
      },
      {
        path: '/arqueo',
        name: 'Arqueo',
        component: function () {
          return import('../components/Arqueo')
        }
      },
      {
        path: '/personal',
        name: 'Personal',
        component: function () {
          return import('../views/Personal.vue')
        }
      },
      {
        path: '/configuraciones',
        name: 'Configuraciones',
        component: function () {
          return import('../views/Configuracion.vue')
        }
      }

    ]
  },
  {
    path: '/login',
    name: 'Login',

    component: function () {
      return import('../views/Login.vue')
    },
  },

]

const router = new VueRouter({
  routes,
  mode: "history"
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});


export default router
