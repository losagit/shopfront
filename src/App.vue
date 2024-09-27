<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import Home from "./views/Home.vue";
import Navbar from "./components/Appbar.vue";

export default {
  name: "App",

  components: { Navbar, Home },

  data: () => ({}),
};
</script>
