<template>
  <v-container fluid>
    <v-row class="mt-6" no-gutters>
      <v-col md="3" offset-md="5">
        <v-card class="pt-4 pa-4">
          <v-alert v-if="message" color="red lighten-2" dark>
            {{ message }}
          </v-alert>
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <form name="form" @submit.prevent="handleLogin">
            <div class="form-group">
              <v-text-field
                v-model="user.username"
                label="Usuario"
                outlined
                dense
              />
            </div>
            <div class="form-group">
              <v-text-field
                v-model="user.password"
                type="password"
                label="Contraseña"
                outlined
                dense
              />
            </div>
            <div class="form-group mt-3">
              <v-btn type="submit" color="success">
                <span>Ingresar</span>
              </v-btn>
            </div>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: [],
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.LoginModule.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/inicio");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.username && this.user.password) {
        this.$store.dispatch("LoginModule/login", this.user).then(
          () => {
            this.$router.push("/inicio");
          },
          (error) => {
            this.loading = false;
            this.message = error.response.data.msg || error.toString();
          }
        );
      }
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>