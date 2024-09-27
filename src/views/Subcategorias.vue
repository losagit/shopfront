<template>
  <v-container fluid>
    <div class="row">
      <div class="col-8">
        <v-card class="mb-1">
          <template>
            <v-toolbar flat>
              <v-icon>mdi-shape</v-icon>
              <v-toolbar-title class="mx-2">SUBCATEGORIAS</v-toolbar-title>
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
                    <v-btn color="red" text @click="closeDelete">Cancel</v-btn>
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
            :items="subcategorias"
            :headers="headers"
            :search="search"
            :key="subcategorias.id_subcategoria"
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
                <v-select
                  v-model="record.id_categoria"
                  :items="categorias"
                  item-text="nombre"
                  item-value="id_categoria"
                  label="Categoria"
                  outlined
                  dense
                ></v-select>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="cancelar"> Cancelar </v-btn>
              <v-btn color="success" text @click="GuardarSubcategoria">
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
      { text: "Codigo", value: "id_subcategoria" },
      { text: "Nombre", value: "nombre" },
      { text: "Imagen", value: "imagen" },
      { text: "Categoria", value: "categoria" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    id: null,
    recordDefault: {},
    record: {
        nombre:null,
        imagen:null,
        id_categoria:null
    },
  }),
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    ...mapState("SubcategoriaModule", ["subcategorias"]),
    ...mapState("CategoriaModule", ["categorias"]),
    ...mapState("LoginModule", ["user"]),
    titulo() {
      return this.editedIndex === -1
        ? "NUEVA SUBCATEGORIA"
        : "EDITAR SUBCATEGORIA";
    },
  },
  mounted() {
    this.ObtenerSubcategorias(this.user.user.id_empresa);
    this.ObtenerCategorias(this.user.user.id_empresa);
  },
  methods: {
    ...mapActions("SubcategoriaModule", [
      "ObtenerSubcategorias",
      "RegistrarSubcategoria",
      "EliminarSubcategoria",
      "EditarSubcategoria",
    ]),
    ...mapActions("CategoriaModule",["ObtenerCategorias"]),
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
    GuardarSubcategoria() {
      if (this.record.id_subcategoria) {
          this.EditarSubcategoria(this.record);
      } else {
          this.RegistrarSubcategoria(this.record);
      }
      this.limpiar();
      this.ObtenerSubcategorias(this.user.user.id_empresa);
    },
    EditarDialog(item) {
      this.editedIndex = this.subcategorias.indexOf(item);
      this.record.id_subcategoria = item.id_subcategoria;
      this.record.nombre = item.nombre;
      this.record.imagen = item.imagen;
      this.record.id_categoria = item.id_categoria;

    },
    EliminarDialog(item) {
      this.id = item.id_subcategoria;
      this.dialogDelete = true;
    },

    EliminarOK() {
      this.EliminarSubcategoria(this.id);
      this.closeDelete();
      this.ObtenerSubcategorias(this.user.user.id_empresa);
    },
  },
};
</script>