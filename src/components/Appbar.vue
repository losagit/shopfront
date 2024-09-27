<template>
  <div>
    <v-app-bar class="text-uppercase" color="#246b8f" dark app>
      <v-toolbar-title>
        <v-icon>mdi-desktop-classic</v-icon>
        SCI
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="currentUser">
        <label>
          {{ currentUser.user.razon_social }} - SEDE {{currentUser.user.sede}}
        </label>
      </div>
      <v-spacer></v-spacer>
      <div v-if="currentUser">
        <v-menu v-if="currentUser"  offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn text class="white--text ma-5" v-bind="attrs" v-on="on">
              <label>
                {{ currentUser.user.nombre }}
                <v-icon>mdi-account-circle</v-icon>
              </label>
            </v-btn>
          </template>
          <v-list>
            <v-list-item dense @click.prevent="logOut" >
              <v-list-item-content>
                <v-list-item-title>
                     Perfil
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-account-box-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item dense @click.prevent="logOut" >
              
              <v-list-item-content>
                <v-list-item-title>
                     Salir
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.LoginModule.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("LoginModule/logout");
      this.$router.push("/login");
    },
  },
};
</script>