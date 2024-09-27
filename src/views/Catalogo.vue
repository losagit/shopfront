<template>
  <v-container>
    <template>
      <v-card class="mb-4">
        <v-toolbar flat>
          <v-toolbar-title> CATALOGO </v-toolbar-title>
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
          <v-btn
            v-if="
              (user.user.rol === 'administrador' && user.user.sede === 'A') ||
              (user.user.rol === 'auxiliar almacen' && user.user.sede === 'A')
            "
            color="info"
            dark
            to="/productos"
          >
            Productos</v-btn
          >
          <v-btn
            v-if="
              (user.user.rol === 'administrador' && user.user.sede === 'A') ||
              (user.user.rol === 'auxiliar almacen' && user.user.sede === 'A')
            "
            class="mx-2"
            color="warning"
            dark
            to="/unidades"
          >
            Unidades
          </v-btn>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="
                  (user.user.rol === 'administrador' &&
                    user.user.sede === 'A') ||
                  (user.user.rol === 'auxiliar almacen' &&
                    user.user.sede === 'A')
                "
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-playlist-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ titulo }}</span>
              </v-card-title>
              <v-card-text>
                <v-row class="mx-1">
                  <div class="col-md-2">
                    <v-text-field
                      label="Codigo"
                      v-model="record.codigo"
                      dense
                      outlined
                      hide-details
                      filled
                      readonly
                    >
                    </v-text-field>
                  </div>
                  <div class="col-md-9">
                    <v-text-field
                      label="Producto"
                      v-model="record.nombre"
                      dense
                      outlined
                      hide-details
                      filled
                      readonly
                    >
                    </v-text-field>
                  </div>
                  <div class="col-md-1">
                    <v-btn color="info" @click.stop="dialogProducto = true">
                      <v-icon>mdi-shopping</v-icon>
                    </v-btn>
                    <v-dialog v-model="dialogProducto" max-width="550">
                      <v-card class="mt-1">
                        <v-toolbar flat>
                          <v-toolbar-title> PRODUCTOS </v-toolbar-title>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Buscar"
                            hide-details
                            outlined
                            dense
                          ></v-text-field>
                        </v-toolbar>
                        <v-data-table
                          :items="productos"
                          :headers="hProducto"
                          :search="search"
                        >
                          <template v-slot:[`item.actions`]="{ item }">
                            <v-icon
                              color="info"
                              @click="SeleccionarProducto(item)"
                            >
                              mdi-checkbox-multiple-marked
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-row>
                <v-row class="mx-1">
                  <div class="col-md-12">
                    <v-text-field
                      label="Descripcion"
                      v-model="record.descripcion"
                      filled
                      readonly
                      dense
                      outlined
                      hide-details
                    >
                    </v-text-field>
                  </div>
                  
                </v-row>
                <v-row class="mx-1">
                  <div class="col-md-3">
                    <v-select
                      v-model="record.id_unidad"
                      :items="unidades"
                      item-text="nombre"
                      item-value="id_unidad"
                      label="Unidad"
                      outlined
                      dense
                    ></v-select>
                  </div>
                  <div class="col-md-3">
                    <v-text-field
                      label="Precio venta"
                      v-model="record.precio_venta"
                      dense
                      outlined
                      hide-details
                    >
                    </v-text-field>
                  </div>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close"> Cancelar </v-btn>
                <v-btn color="success" text @click="GuardarCatalogo">
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
        :items="catalogo"
        :headers="headers"
        :search="search"
        :key="catalogo.id_catalogo"
        :items-per-page="5"
      >
        <template v-slot:[`item.precio_venta`]="{ item }">
          <v-chip color="green" dark>
            {{ item.precio_venta }}
          </v-chip>
        </template>
        <template
          v-if="
            (user.user.rol === 'administrador' && user.user.sede === 'A') ||
            (user.user.rol === 'auxiliar almacen' && user.user.sede === 'A')
          "
          v-slot:[`item.actions`]="{ item }"
        >
          <!-- <v-icon color="info" class="mr-2" @click="EditarDialog(item)">
            mdi-pencil
          </v-icon> -->
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
  data: () => ({
    rol: "",
    sede: "",
    dialog: false,
    dialogDelete: false,
    dialogProducto: false,
    editedIndex: -1,
    id: null,
    recordDefault: {},
    record: {},
    search: "",
    hProducto: [
      { text: "Producto", value: "nombre" },
      { text: "Desricpion", value: "descripcion" },
      { text: "Select", value: "actions", sortable: false },
    ],
    headers: [
      { text: "Codigo", value: "codigo" },
      { text: "Nombre", value: "producto" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Presentacion", value: "unidad" },
      { text: "Unidad Sunat", value: "codigosunat" },
      { text: "C/U", value: "cantidad_unidad" },
      { text: "Precio(S/.)", value: "precio_venta" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("LoginModule", ["user"]),
    ...mapState("ProductoModule", ["productos", "catalogo"]),
    ...mapState("UnidadModule", ["unidades"]),
    titulo() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },
  mounted() {
    this.ObtenerProductos(this.user.user.id_empresa);
    this.ObtenerCatalogo(this.user.user.id_empresa);
    this.ObtenerUnidades(this.user.user.id_empresa);
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
    ...mapActions("UnidadModule", ["ObtenerUnidades"]),
    ...mapActions("ProductoModule", ["ObtenerProductos", "ObtenerCatalogo","RegistrarCatalogo","EliminarCatalogo"]),
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
    SeleccionarProducto(item) {
      this.record.id_producto = item.id_producto;
      this.record.codigo = item.codigo;
      this.record.nombre = item.nombre;
      this.record.descripcion = item.descripcion;
      this.dialogProducto = false;
    },
    GuardarCatalogo() {
      if (this.record.id_presentacion) {
        console.log("editar");
        console.log(this.record);
        //this.EditarCatalogo(this.record);
      } else {
        console.log("Registrar");
        console.log(this.record);
        this.RegistrarCatalogo(this.record);
      }
      this.close();
      this.ObtenerCatalogo(this.user.user.id_empresa);
    },

    EditarDialog(item) {
      this.editedIndex = this.catalogo.indexOf(item);
      console.log(item);
      /* this.record.id_presentacion = item.id_presentacion;
      this.record.codigo = item.codigo;
      this.record.nombre = item.nombre;
      this.record.descripcion = item.descripcion;
      this.record.id_subcategoria = item.id_subcategoria;
      this.record.id_unidad = item.id_unidad; */
      this.dialog = true;
    },
    EliminarDialog(item) {
      this.id = item.id_presentacion;
      this.dialogDelete = true;
    },

    EliminarConfirm() {
      this.EliminarCatalogo(this.id);
      this.closeEliminar();
      this.ObtenerCatalogo(this.user.user.id_empresa);
    },
  },
};
</script>