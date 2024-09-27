<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-card class="mb-1">
          <template>
            <v-toolbar flat>
              <v-icon>mdi-tape-measure</v-icon>
              <v-toolbar-title class="mx-2">Usuarios</v-toolbar-title>
              <v-divider class="mx-1" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
                outlined
                dense
              >
              </v-text-field>
              <v-dialog v-model="dialog" max-width="500px">
                <v-spacer></v-spacer>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    class="ml-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-playlist-plus</v-icon>
                  </v-btn>
                </template>
                <v-card class="pt-4 pa-4">
                  <form name="form" @submit.prevent="handleRegister">
                    <div v-if="!successful">
                      <div class="form-group">
                        <v-text-field
                          v-model="usuario.nombre"
                          label="Nombre"
                          outlined
                          dense
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          v-model="usuario.username"
                          label="usuario"
                          outlined
                          dense
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          v-model="usuario.password"
                          type="password"
                          label="Contraseña"
                          outlined
                          dense
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-select
                          label="Tipo Documento"
                          :items="tipoDoc"
                          v-model="usuario.tipo_doc"
                          dense
                          outlined
                        >
                        </v-select>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          v-model="usuario.num_doc"
                          label="numero"
                          dense
                          outlined
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-text-field
                          v-model="usuario.telefono"
                          label="Telefono"
                          dense
                          outlined
                          maxlength="9"
                        ></v-text-field>
                      </div>
                      <div class="form-group">
                        <v-select
                          label="Sede"
                          :items="sede"
                          v-model="usuario.sede"
                          dense
                          outlined
                        >
                        </v-select>
                      </div>
                      <div class="form-group">
                        <v-select
                          label="Rol"
                          :items="roles"
                          item-text="rol"
                          item-value="id_rol"
                          v-model="usuario.id_rol"
                          dense
                          outlined
                        >
                        </v-select>
                      </div>
                      <div class="form-group">
                        <v-switch
                          v-model="usuario.estado"
                          color="success"
                          label="Estado"
                        ></v-switch>
                      </div>
                      <div class="form-group">
                        <v-btn type="submit" color="success">Registrar</v-btn>
                      </div>
                    </div>
                  </form>
                  <v-alert
                    v-if="message"
                    class="alert"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                  >
                    {{ message }}
                  </v-alert>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
        </v-card>
        <v-card>
          <v-data-table
            :items="itemsIndex"
            :headers="headers"
            :search="search"
            :key="usuarios.id_usuario"
            :items-per-page="5"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      usuario: {},
      usuarioDefault: {},
      search: "",
      dialog: false,
      submitted: false,
      successful: false,
      message: "",
      sede: ["A","B","C","D"],
      tipoDoc: ["DNI", "Carnet de extranjeria"],
      headers: [
        { text: "#", value: "index" },
        { text: "Sede", value: "sede" },
        { text: "Rol", value: "rol" },
        { text: "Nombre", value: "nombre" },
        { text: "Usuario", value: "username" },
        { text: "Tipo", value: "tipo_doc" },
        { text: "Numero", value: "num_doc" },
        { text: "Telefono", value: "telefono" },
      ],
    };
  },
  computed: {
    ...mapState("LoginModule", ["user"]),
    ...mapState("UsuarioModule", ["usuarios", "roles"]),
    itemsIndex() {
      return this.usuarios.map((usuarios, index) => ({
        ...usuarios,
        index: index + 1,
      }));
    },
  },
  mounted() {
    this.ObtenerUsuarios(this.user.user.id_empresa);
    this.ObtenerRoles();
  },
  methods: {
    ...mapActions("UsuarioModule", ["ObtenerUsuarios", "ObtenerRoles"]),
    limpiar() {
      this.$nextTick(() => {
        this.usuario = Object.assign({}, this.usuarioDefault);
        this.editedIndex = -1;
      });
    },

    handleRegister() {
      this.message = "";
      this.usuario.id_empresa = this.user.user.id_empresa;
      if (this.usuario.username && this.usuario.password) {
        this.$store.dispatch("LoginModule/register", this.usuario).then(
          (data) => {
            this.message = data.message;
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.successful = false;
          }
        );
      }
      this.limpiar();
      this.ObtenerUsuarios(this.user.user.id_empresa);
    },
  },
};
</script>
