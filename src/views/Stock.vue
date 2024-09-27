<template>
  <v-container fluid>
    <v-card class="mb-4">
      <template>
        <v-toolbar flat>
          <v-btn color="success" dark class="mb-2" to="/nuevaventa">
            <v-icon>mdi-receipt</v-icon>
            Nueva Venta
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title> STOCK DE PRODUCTOS </v-toolbar-title>
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
        </v-toolbar>
        <v-divider></v-divider>
      </template>
    </v-card>
    <v-card>
      <v-data-table
        :items="stock"
        :headers="headers"
        :search="search"
        :key="stock.id_producto"
        :items-per-page="5"
      >
        
        <template v-slot:[`item.stock`]="{ item }">
          <v-chip :color="getColor(item.stock)" dark>
            {{ item.stock }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Stock",
  data: () => ({
    search: "",
    headers: [
      { text: "Codigo", value: "codigo" },
      { text: "Nombre", value: "nombre" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Stock", value: "stock" },
    ],
  }),
  computed: {
    ...mapState("ProductoModule", ["stock"]),
    ...mapState("LoginModule", ["user"]),
  },
  mounted() {
    this.ObtenerStock(this.user.user.id_empresa);
  },
  methods: {
    ...mapActions("ProductoModule", ["ObtenerStock"]),
    getColor(stock) {
      if (stock < 5) return "red";
      else return "blue";
    },
  },
};
</script>