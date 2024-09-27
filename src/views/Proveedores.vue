<template>
  <v-card>
    <v-data-table
      :items="proveedores"
      :headers="headers"
      :search="search"
      :key="proveedores.id_proveedor"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Proveedores</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            dense
            outlined
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="300px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-truck-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
                <v-card-title>
                  <span class="text-h5">{{ titulo }}</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="record.razon_social"
                        label="Razon Social"
                        dense
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="record.ruc"
                        maxlength="11"
                        label="RUC"
                        dense
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="record.telefono"
                        label="telefono"
                        maxlength="9"
                        dense
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="record.e_mail"
                        label="E-mail"
                        dense
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="record.direccion"
                        label="Direccion"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="close"> Cancelar </v-btn>
                  <v-btn color="success" text @click="GuardarProveedor">
                    Guardar
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="300px">
            <v-card>
              <v-card-title>Eliminar item</v-card-title>
              <v-card-text>
                Esta seguro de eliminar este registro?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="success" text @click="EliminarConfirm">Eliminar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="info" class="mr-2" @click="EditarDialog(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red lighten-2" @click="EliminarDialog(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    editedIndex: -1,
    headers: [
      { text: "Codigo", value: "id_proveedor" },
      { text: "Razon Social", value: "razon_social" },
      { text: "RUC", value: "ruc" },
      { text: "Telefono", value: "telefono" },
      { text: "E-mail", value: "e_mail" },
      { text: "Direccion", value: "direccion" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    recordDefault: {},
    record: {},
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    ...mapState("ProveedorModule", ["proveedores"]),
    ...mapState("LoginModule", ["user"]),
    titulo() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },
  mounted() {
    this.ObtenerProveedores(this.user.user.id_empresa);
  },
  methods: {
    ...mapActions("ProveedorModule", [
      "ObtenerProveedores",
      "RegistrarProveedor",
      "EliminarProveedor",
      "EditarProveedor",
    ]),
    limpiar() {
      this.$nextTick(() => {
        this.record = Object.assign({}, this.recordDefault);
        this.editedIndex = -1;
      });
    },
    close() {
      this.limpiar();
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    GuardarProveedor() {
      this.record.id_empresa = this.user.user.id_empresa
      if (this.record.id_proveedor) {
        this.EditarProveedor(this.record);
      } else {
        this.RegistrarProveedor(this.record);
      }
      this.close();
      this.ObtenerProveedores(this.user.user.id_empresa);
    },
    EditarDialog(item) {
      this.editedIndex = this.proveedores.indexOf(item);
      this.record = Object.assign({}, item);
      this.dialog = true;
    },
    EliminarDialog(item) {
      this.limpiar();
      this.id = item.id_proveedor;
      this.dialogDelete = true;
    },

    EliminarConfirm() {
      this.EliminarProveedor(this.id);
      this.closeDelete();
      this.ObtenerProveedores(this.user.user.id_empresa);
    },
  },
};
</script>