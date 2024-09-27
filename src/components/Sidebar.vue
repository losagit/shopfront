<template>
  <v-card>
    <v-navigation-drawer
      class="text-capitalize"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-3 pt-2">
        <v-list-item-avatar>
          <v-img src="#" aria-label="logo"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ rol }}</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
          color="#246b8f"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group color="#246b8f" v-if="rol === 'administrador' || rol === 'vendedor'"
        :value="true" prepend-icon="mdi-sale" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Ventas</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in ventas"
            :key="item.title"
            router
            :to="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-group
        color="#246b8f"
          v-if="rol === 'administrador' && sede === 'A' || rol === 'auxiliar almacen' && sede === 'A'"
          :value="true"
          prepend-icon="mdi-bookshelf"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Logistica</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in logistica"
            :key="item.title"
            router
            :to="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-group color="#246b8f" v-if="rol === 'administrador' || rol === 'vendedor'" :value="true" prepend-icon="mdi-cash-register" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Finanzas</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in finanzas"
            :key="item.title"
            router
            :to="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-group
        color="#246b8f"
          v-if="rol === 'administrador'"
          :value="true"
          prepend-icon="mdi-hospital-building"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in administracion"
            :key="item.title"
            router
            :to="item.route"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      rol: "",
      sede:"",
      items: [
        { title: "Inicio", icon: "mdi-view-dashboard", route: "/inicio" },
      ],
      ventas: [
        { title: "Ventas", icon: "mdi-sale", route: "/ventas" },
        { title: "Catalogo", icon: "mdi-book-open-variant", route: "/catalogo" },
        {
          title: "Stock",
          icon: "mdi-stack-overflow",
          route: "/stock",
        },
        {
          title: "Clientes",
          icon: "mdi-account-group-outline",
          route: "/clientes",
        },
      ],
      administracion: [
        
        {
          title: "Personal",
          icon: "mdi-account-circle",
          route: "/personal",
        },
        {
          title: "Configuraciones",
          icon: "mdi-cogs",
          route: "/configuraciones",
        },
      ],
      logistica: [
        { title: "Compras", icon: "mdi-package-variant", route: "/compras" },
        
        {
          title: "Proveedores",
          icon: "mdi-truck-delivery",
          route: "/proveedores",
        },
      ],
      finanzas: [
        { title: "Cajas", icon: "mdi-cash-register", route: "/cajas" },
        ],
      mini: false,
    };
  },
  computed: {
    ...mapState("LoginModule", ["user"]),
  },
  mounted() {
    this.getDataUser();
  },
  methods: {
    getDataUser() {
      this.rol = this.user.user.rol;
      this.sede = this.user.user.sede;
    },
  },
};
</script>