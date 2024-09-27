<template>
  <v-container>
    <Sidebar />
    <v-container fluid>
      <router-view />
    </v-container>
  </v-container>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "Home",
  components: { Sidebar },
};
</script>
