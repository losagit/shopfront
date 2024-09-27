<template>
  <v-container fluid>
    <div class="row">
      <div class="col-8">
        <v-card class="mb-1">
          <template>
            <v-toolbar flat>
              <v-icon>mdi-shape</v-icon>
              <v-toolbar-title class="mx-2">CATEGORIAS</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
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
              <v-dialog v-model="dialogDelete" max-width="300px">
                <v-card>
                  <v-card-title> Eliminar item </v-card-title>
                  <v-card-text
                    >Esta seguro de eliminar este registro?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="success" text @click="EliminarOK"
                      >Eliminar</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
        </v-card>
        <v-card>
          <v-data-table
            :items="categorias"
            :headers="headers"
            :search="search"
            :key="categorias.id_categoria"
            :items-per-page="5"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon color="info" class="mr-2" @click="EditarDialog(item)">
                mdi-pencil
              </v-icon>
              <v-icon color="red" @click="EliminarDialog(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </div>
      <div class="col-4">
        <v-card class="mb-1">
          <v-card-title>
            <span class="text-h6">
              {{ titulo }}
              <v-icon>mdi-form-select</v-icon>
            </span>
          </v-card-title>
        </v-card>
        <v-card>
          <form action="">
            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="record.nombre"
                  label="nombre"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="record.imagen"
                  label="imagen"
                  outlined
                  dense
                ></v-text-field>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="cancelar"> Cancelar </v-btn>
              <v-btn color="success" text @click="GuardarCategoria">
                Guardar
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    dialogDelete: false,
    search: "",
    editedIndex: -1,
    headers: [
      { text: "Codigo", value: "id_categoria" },
      { text: "Nombre", value: "nombre" },
      { text: "Imagen", value: "imagen" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    id: null,
    recordDefault: {},
    record: {},
  }),
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    ...mapState("LoginModule", ["user"]),
    ...mapState("CategoriaModule", ["categorias"]),
    titulo() {
      return this.editedIndex === -1 ? "NUEVA CATEGORIA" : "EDITAR CATEGORIA";
    },
  },
  mounted() {
    this.ObtenerCategorias(this.user.user.id_empresa);
  },
  methods: {
    ...mapActions("CategoriaModule", [
      "ObtenerCategorias",
      "RegistrarCategoria",
      "EliminarCategoria",
      "EditarCategoria",
    ]),
    limpiar() {
      this.$nextTick(() => {
        this.record = Object.assign({}, this.recordDefault);
        this.editedIndex = -1;
      });
    },
    cancelar() {
      this.limpiar();
      this.editedIndex = -1;
    },
    closeDelete() {
      this.limpiar();
      this.dialogDelete = false;
    },
    GuardarCategoria() {
      this.record.id_empresa = this.user.user.id_empresa
      if (this.record.id_categoria) {
        this.EditarCategoria(this.record);
      } else {
        this.RegistrarCategoria(this.record);
      }
      this.limpiar();
      this.ObtenerCategorias(this.user.user.id_empresa);
    },
    EditarDialog(item) {
      this.editedIndex = this.categorias.indexOf(item);
      this.record = Object.assign({}, item);
    },
    EliminarDialog(item) {
      this.id = item.id_categoria;
      this.dialogDelete = true;
    },

    EliminarOK() {
      this.EliminarCategoria(this.id);
      this.closeDelete();
      this.ObtenerCategorias(this.user.user.id_empresa);
    },
  },
};
</script>