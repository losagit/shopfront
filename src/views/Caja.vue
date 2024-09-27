<template>
  <v-container>
    <template>
      <v-card class="mb-4">
        <v-toolbar flat>
          <v-toolbar-title> CAJAS </v-toolbar-title>
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
          <v-dialog v-model="dialog" max-width="300px">
            <v-spacer></v-spacer>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="user.user.rol === 'administrador'"
                color="success"
                class="ml-2"
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
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="record.nombre"
                      label="Nombre"
                      outlined
                      dense
                    ></v-text-field>
                    <v-text-field
                      v-model="record.numero_caja"
                      label="Numero caja"
                      outlined
                      dense
                    ></v-text-field>
                    <v-select
                          label="Usuario"
                          :items="usuarios"
                          item-text="nombre"
                          item-value="id_usuario"
                          v-model="record.id_usuario"
                          dense
                          outlined
                        >
                        </v-select>
                    <v-select
                      v-if="!this.record.id_caja"
                      v-model="record.estado"
                      :items="estado"
                      label="estado"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="close"> Cancelar </v-btn>
                <v-btn color="success" text @click="GuardarCaja">
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
                <v-btn color="success" text @click="EliminarConfirm">
                  Eliminar
                </v-btn>
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
        :items="cajas"
        :headers="headers"
        :search="search"
        :key="cajas.id_caja"
        :items-per-page="5"
      >
        <template v-slot:[`item.estado`]="{ item }">
          <v-chip :color="getColor(item.estado)" dark>
            {{ item.estado }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn v-if="item.usuario === user.user.nombre" icon color="success" class="mr-2" to="/arqueo">
            <v-icon>
              mdi-cash-register
              </v-icon> 
          </v-btn>
          <v-icon
            v-if="user.user.rol === 'administrador'"
            color="info"
            class="mr-2"
            @click="EditarDialog(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            v-if="user.user.rol === 'administrador'"
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
import ArqueoDialog from "../components/Arqueo.vue";

export default {
  components: {
    arqueoDialog: ArqueoDialog,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    id: null,
    recordDefault: {},
    record: {},
    itemArqueos: {},
    search: "",
    dialogs: {
      dialog: false,
    },
    caja:[],
    estado: ["abierta", "cerrada"],
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Numero", value: "numero_caja" },
      { text: "Usuario", value: "usuario" },
      { text: "Estado", value: "estado" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("LoginModule", ["user"]),
    ...mapState("UsuarioModule", ["usuarios"]),
    ...mapState("CajaModule", ["cajas", "arqueos"]),
    titulo() {
      return this.editedIndex === -1 ? "Nueva Caja" : "Editar Caja";
    },
  },
  mounted() {
    this.ObtenerUsuarios(this.user.user.id_empresa);
    this.ObtenerCajas(this.user.user.id_empresa);
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
    ...mapActions("UsuarioModule", ["ObtenerUsuarios"]),
    ...mapActions("CajaModule", [
      "ObtenerCajas",
      "RegistrarCaja",
      "EditarCaja",
      "EliminarCaja",
      "ObtenerArqueos"
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
    AbrirAqueo(item) {
      this.caja = item;
      this.dialogs.dialog = true;
      this.ObtenerArqueos(this.caja.id_caja)
    },
    GuardarCaja() {
      if (this.record.id_caja) {
        console.log("editar");
        this.EditarCaja(this.record);
      } else {
        console.log(this.record);
        this.RegistrarCaja(this.record);
      }
      this.close();
      this.ObtenerCajas(this.user.user.id_empresa);
    },

    EditarDialog(item) {
      this.editedIndex = this.cajas.indexOf(item);
      this.record.id_caja = item.id_caja;
      this.record.nombre = item.nombre;
      this.record.numero_caja = item.numero_caja;
      this.dialog = true;
    },
    EliminarDialog(item) {
      this.id = item.id_caja;
      this.dialogDelete = true;
    },

    EliminarConfirm() {
      this.EliminarCaja(this.id);
      this.closeEliminar();
      this.ObtenerCajas(this.user.user.id_empresa);
    },
    getColor(estado) {
      if (estado == "cerrada") return "red";
      else return "green";
    },
  },
};
</script>