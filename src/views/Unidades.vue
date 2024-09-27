<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <v-card class="mb-1">
          <template>
            <v-toolbar flat>
              <v-icon>mdi-tape-measure</v-icon>
              <v-toolbar-title class="mx-2">Unidad de medida</v-toolbar-title>
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
              <v-dialog v-model="dialogDelete" max-width="300px">
                <v-card>
                  <v-card-title>Eliminar item</v-card-title>
                  <v-card-text class="font-weight-medium">
                    Esta seguro de eliminar este registro?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="closeDelete"
                      >Cancelar</v-btn
                    >
                    <v-btn color="success" text @click="deleteItemConfirm"
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
            :items="unidades"
            :headers="headers"
            :search="search"
            :key="unidades.id_unidades"
            :items-per-page="5"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon color="info" class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon color="red" @click="EliminarDialog(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </div>
      <div class="col-md-4">
        <v-card class="mb-1">
          <v-card-title>
            <span class="text-h5">
              {{ titulo }}
              <v-icon>mdi-form-select</v-icon>
            </span>
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-text>
            <v-container>
              <v-text-field
                v-model="record.nombre"
                label="nombre"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="record.codigo"
                label="codigo"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="record.cantidad_unidad"
                label="Cantidad"
                outlined
                dense
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancelar"> Cancelar </v-btn>
            <v-btn color="green" text @click="GuardarUnidades">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    dialogDelete: false,
    search: "",
    editedIndex: -1,
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Codigo", value: "codigo" },
      { text: "Cantidad_unidad", value: "cantidad_unidad" },
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
    ...mapState("UnidadModule", ["unidades"]),
    ...mapState("LoginModule", ["user"]),
    titulo() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  mounted() {
    this.ObtenerUnidades(this.user.user.id_empresa);
  },
  methods: {
    ...mapActions("UnidadModule", [
      "ObtenerUnidades",
      "RegistrarUnidad",
      "EliminarUnidad",
      "EditarUnidad",
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
    GuardarUnidades() {
      this.record.id_empresa = this.user.user.id_empresa
      if (this.record.id_unidad != null) {
        console.log(this.record);
        this.EditarUnidad(this.record);
      } else {
        console.log(this.record);
        this.RegistrarUnidad(this.record);
      }
      this.limpiar();
      this.ObtenerUnidades(this.user.user.id_empresa);
    },
    editItem(item) {
      this.editedIndex = this.unidades.indexOf(item);
      this.record = Object.assign({}, item);
    },
    EliminarDialog(item) {
      this.id = item.id_unidad;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.EliminarUnidad(this.id);
      this.closeDelete();
      this.ObtenerUnidades(this.user.user.id_empresa);
    },
  },
};
</script>