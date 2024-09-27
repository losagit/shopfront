<template>
  <v-container>
    <template>
      <v-card class="mb-4">
        <v-toolbar flat>
          <v-toolbar-title> PRODUCTOS </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            outlined
            dense
          ></v-text-field>

          <v-spacer></v-spacer>
          <v-btn color="info" dark to="/categorias"> Categorias </v-btn>
          <v-btn color="cyan" dark class="mx-2" to="/subcategorias">
            SubCategorias
          </v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-spacer></v-spacer>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" class="ml-2" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-playlist-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ titulo }}</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <v-text-field
                      v-model="record.codigo"
                      label="codigo"
                      outlined
                      dense
                    ></v-text-field>
                    <v-text-field
                      v-model="record.nombre"
                      label="nombre"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <v-select
                      v-model="record.id_subcategoria"
                      :items="subcategorias"
                      item-text="nombre"
                      item-value="id_subcategoria"
                      label="Subcategoria"
                      outlined
                      dense
                    ></v-select>
                    <!-- <v-select
                      v-model="record.id_unidad"
                      :items="unidades"
                      item-text="nombre"
                      item-value="id_unidad"
                      label="Unidad"
                      outlined
                      dense
                    ></v-select> -->
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea
                      rows="2"
                      v-model="record.descripcion"
                      label="descripcion"
                      outlined
                      dense
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close"> Cancelar </v-btn>
                <v-btn color="success" text @click="GuardarProducto">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="350px">
            <v-card>
              <v-card-title>Eliminar item</v-card-title>
              <v-card-text>
                Estas seguro que desea eliminar este registro?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeEliminar">Cancelar</v-btn>
                <v-btn color="success" text @click="EliminarConfirm"
                  >Eliminar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </v-card>
      <v-spacer></v-spacer>
    </template>
    <v-card>
      <v-data-table
        :items="productos"
        :headers="headers"
        :search="search"
        :key="productos.id_producto"
        :items-per-page="5"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="info" class="mr-2" @click="EditarDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            color="red lighten-2"
            class="mr-2"
            @click="EliminarDialog(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: { dialogProducto: "boolean" },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    id: null,
    recordDefault: {},
    record: {},
    search: "",
    headers: [
      { text: "Codigo", value: "codigo" },
      { text: "Nombre", value: "nombre" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Subcategoria", value: "subcategoria" },
      { text: "Categoria", value: "categoria" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("LoginModule", ["user"]),
    ...mapState("ProductoModule", ["productos"]),
    ...mapState("SubcategoriaModule", ["subcategorias"]),
    ...mapState("UnidadModule", ["unidades"]),
    titulo() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },
  mounted() {
    this.ObtenerProductos(this.user.user.id_empresa);
    this.ObtenerSubcategorias(this.user.user.id_empresa);
    
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeEliminar();
    },
  },
  methods: {
    ...mapActions("SubcategoriaModule", ["ObtenerSubcategorias"]),
    ...mapActions("ProductoModule", [
      "ObtenerProductos",
      "RegistrarProducto",
      "EditarProducto",
      "EliminarProducto",
      "SelectProducto",
    ]),
    limpiar() {
      this.$nextTick(() => {
        this.record = Object.assign({}, this.recordDefault);
        this.editedIndex = -1;
      });
    },
    close() {
      this.dialog = false;
      this.limpiar();
    },
    closeEliminar() {
      this.limpiar();
      this.dialogDelete = false;
    },
    GuardarProducto() {
      
      if (this.record.id_producto) {
        this.EditarProducto(this.record);
      } else {
        this.RegistrarProducto(this.record);
      }
      this.close();
      this.ObtenerProductos(this.user.user.id_empresa);
    },

    EditarDialog(item) {
      this.editedIndex = this.productos.indexOf(item);
      this.record.id_producto = item.id_producto;
      this.record.codigo = item.codigo;
      this.record.nombre = item.nombre;
      this.record.descripcion = item.descripcion;
      this.record.id_subcategoria = item.id_subcategoria;
      this.record.id_unidad = item.id_unidad;
      this.dialog = true;
    },
    EliminarDialog(item) {
      this.id = item.id_producto;
      this.dialogDelete = true;
    },

    EliminarConfirm() {
      this.EliminarProducto(this.id);
      this.closeEliminar();
      this.ObtenerProductos(this.user.user.id_empresa);
    },
  },
};
</script>