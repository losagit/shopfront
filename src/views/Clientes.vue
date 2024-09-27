<template>
  <v-card>
    <v-data-table
      :items="clientes"
      :headers="headers"
      :search="search"
      :key="clientes.id_cliente"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Clientes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
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
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="350px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-account-multiple-plus-outline</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ titulo }}</span>
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      label="Tipo Documento"
                      :items="tipoDoc"
                      v-model="record.tipo_doc"
                      dense
                      outlined
                      hide-details
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="record.num_doc"
                      label="numero"
                      dense
                      outlined
                      maxlength="11"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="record.nombre"
                      label="nombre o razon social"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      label="Sexo"
                      :items="sexo"
                      v-model="record.sexo"
                      dense
                      outlined
                      hide-details
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="record.telefono"
                      label="Telefono"
                      dense
                      outlined
                      maxlength="9"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="success" text @click="GuardarCliente">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="300px">
            <v-card>
              <v-card-title> Eliminar item </v-card-title>
              <v-card-text>
                Esta seguro de eliminar este registro?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="closeDelete"
                  >Cancel</v-btn
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
        <v-icon color="red" @click="EliminarDialog(item)"> mdi-delete </v-icon>
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
    sexo: ["M", "F"],
    tipoDoc: ["DNI","RUC", "Carnet de extranjeria"],
    headers: [
      { text: "Codigo", value: "id_cliente" },
      { text: "Nombre", value: "nombre" },
      { text: "Sexo", value: "sexo" },
      { text: "Tipo Documento", value: "tipo_doc" },
      { text: "Numero", value: "num_doc" },
      { text: "Telefono", value: "telefono" },
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
    ...mapState("ClienteModule", ["clientes"]),
    ...mapState("LoginModule", ["user"]),
    titulo() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },
  mounted() {
    this.ObtenerClientes(this.user.user.id_empresa);
  },
  methods: {
    ...mapActions("ClienteModule", [
      "ObtenerClientes",
      "RegistrarCliente",
      "EliminarCliente",
      "EditarCliente",
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
    GuardarCliente() {
      this.record.id_empresa = this.user.user.id_empresa
      if (this.record.id_cliente) {
        this.EditarCliente(this.record);
      } else {
        this.RegistrarCliente(this.record);
      }
      this.close();
      this.ObtenerClientes(this.user.user.id_empresa);
    },
    EditarDialog(item) {
      this.editedIndex = this.clientes.indexOf(item);
      this.record = Object.assign({}, item);
      this.dialog = true;
    },
    EliminarDialog(item) {
      this.limpiar();
      this.id = item.id_cliente;
      this.dialogDelete = true;
    },

    EliminarConfirm() {
      this.EliminarCliente(this.id);
      this.closeDelete();
      this.ObtenerClientes(this.user.user.id_empresa);
    },
  },
};
</script>