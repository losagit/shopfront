<template>
  <v-container>
    <v-card class="mb-4">
      <template>
        <v-toolbar flat>
          <v-icon>mdi-cart</v-icon>
          <v-toolbar-title class="mx-2"> COMPRAS</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar compra"
                single-line
                hide-details
                outlined
                dense
              >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="success" dark class="mx-2" to="/nuevacompra">
            <v-icon>mdi-playlist-plus</v-icon>
            Nueva compra
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </template>
    </v-card>
    <v-card>
      <v-data-table
        :items="compras"
        :headers="headers"
        :search="search"
        :key="compras.id_compra"
        :items-per-page="5"
      >
      <template v-slot:[`item.estado`]="{ item }">
          <v-chip :color="getColor(item.estado)" dark>
            {{ item.estado }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            v-if="item.estado !== 'Anulado'"
            color="red lighten-2"
            class="mr-2"
            @click="AnularDialog(item)"
          >
            mdi-note-remove
          </v-icon>
          <v-icon color="info" @click="Imprimirpdf(item)"> mdi-printer</v-icon>
        </template>
      </v-data-table>
    </v-card>
        <v-dialog v-model="dialogAnular" max-width="350px">
      <v-card>
        <v-card-title>Anular Compra</v-card-title>
        <v-card-text> Estas seguro que desea anular esta venta? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeAnular">Cancelar</v-btn>
          <v-btn color="success" text @click="AnularConfirm">Anular</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    search:"",
    dialogDelete: false,
    dialogAnular: false,
    editedIndex: -1,
    id: null,
    record: {
      codigo: "",
      nombre: "",
      descripcion: "",
      categoria: "",
      unidad: "",
    },
    search: "",
    headers: [
      { text: "Fecha", value: "fecha" },
      { text: "Tipo", value: "tipo_comprobate" },
      { text: "Numero", value: "numero" },
      { text: "Monto(S/.)", value: "total" },
      { text: "Ruc", value: "ruc" },
      { text: "Proveedor", value: "proveedor" },
      { text: "Personal", value: "usuario" },
      { text: "Estado", value: "estado" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("CompraModule", ["compras"]),
    ...mapState("LoginModule", ["user"]),
  },
  mounted() {
    this.ObtenerCompras(this.user.user.id_empresa);
  },
  methods: {
    ...mapActions("CompraModule", ["ObtenerCompras", "GenerarPdfCompra","AnularCompra"]),
    closeAnular() {
      this.dialogAnular = false;
    },
    AnularDialog(item) {
      this.id = item.id_compra;
      this.dialogAnular = true;
    },
    AnularConfirm() {
      this.AnularCompra(this.id);
      this.closeAnular();
      this.ObtenerCompras(this.user.user.id_empresa);
    },
    Imprimirpdf(item) {
      this.GenerarPdfCompra(item.id_compra);
    },
    getColor(estado) {
      if (estado === "Registrado") return "info";
      else return "red";
    },
  },
};
</script>