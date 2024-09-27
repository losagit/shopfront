<template>
  <v-container>
    <v-card class="mb-4">
      <template>
        <v-toolbar flat>
          <v-icon>mdi-cart</v-icon>
          <v-toolbar-title class="mx-2"> VENTAS</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar venta"
            single-line
            hide-details
            outlined
            dense
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="success" dark class="mx-2" to="/nuevaventa">
            <v-icon>mdi-playlist-plus</v-icon>
            Nueva venta
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </template>
    </v-card>
    <v-card>
      <v-data-table
        :items="ventas"
        :headers="headers"
        :search="search"
        :key="ventas.id_venta"
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
          <v-icon color="info" @click="ImprimirPdf(item)"> mdi-printer</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogAnular" max-width="350px">
      <v-card>
        <v-card-title>Anular Venta</v-card-title>
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
    search: "",
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
      { text: "Tipo", value: "tipo_comprobante" },
      { text: "Numero", value: "numero" },
      { text: "Monto(S/.)", value: "total" },
      { text: "Documento", value: "num_doc" },
      { text: "Cliente", value: "cliente" },
      { text: "Vendedor", value: "vendedor" },
      { text: "Estado", value: "estado" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("VentaModule", ["ventas"]),
    ...mapState("LoginModule", ["user"]),
  },
  mounted() {
    this.ObtenerVentas(this.user.user.id_usuario);
  },
  methods: {
    ...mapActions("VentaModule", [
      "ObtenerVentas",
      "AnularVenta",
      "GenerarPdfVenta",
    ]),
    closeAnular() {
      this.dialogAnular = false;
    },
    AnularDialog(item) {
      this.id = item.id_venta;
      this.dialogAnular = true;
    },
    AnularConfirm() {
      this.AnularVenta(this.id);
      this.closeAnular();
      this.ObtenerVentas(this.user.user.id_usuario);
    },
    ImprimirPdf(item) {
      this.GenerarPdfVenta(item.id_venta);
    },
    getColor(estado) {
      if (estado === "Emitido") return "success";
      else if (estado === "Registrado") return "info";
      else return "red";
    },
  },
};
</script>