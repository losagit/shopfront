<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-card class="white--text pt-3" color="#1F7087" height="100%">
          <span class="mx-3">Total ventas: </span>
          <v-card-text class="white--text text-center">
            <h1 class="mt-2 mb-2 mx-2">S/. {{ ventadia.Ventas_dia }}</h1>
            <hr />
            <span class="mt-2 mb-2">al dia</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="white--text pt-3" color="#957244" height="100%">
          <span class="mx-3">Total ventas: </span>
          <v-card-text class="white--text text-center">
            <h1 class="mt-2 mb-2 mx-2">S/. {{ ventames.Ventas_mes }}</h1>
            <hr />
            <span class="mt-2 mb-2">al mes: {{ mes }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="white--text pt-3" color="#952675" height="100%">
          <span class="mx-3">Total compras: </span>
          <v-card-text class="white--text text-center">
            <h1 class="mt-2 mb-2 mx-2">S/. {{ compradia.Compras_dia }}</h1>
            <hr />
            <span class="mt-2 mb-2">al dia</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="white--text pt-3" color="#952176" height="100%">
          <span class="mx-3">Total compras: </span>
          <v-card-text class="white--text text-center">
            <h1 class="mt-2 mb-2 mx-2">S/. {{ comprames.Compras_mes }}</h1>
            <hr />
            <span class="mt-2 mb-2">al mes: {{ mes }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-btn
          class="white--text"
          color="#1F7087"
          height="100%"
          width="100%"
          to="/nuevaventa"
        >
          <v-card-text class="white--text text-center">
            <v-icon class="white--text">mdi-sale</v-icon>
            <h3 class="mt-2 mb-2 mx-2">Venta directa</h3>
          </v-card-text>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          class="white--text"
          color="#1F7087"
          height="100%"
          width="100%"
          to="/nuevacompra"
        >
          <v-card-text class="white--text text-center">
            <v-icon class="white--text">mdi-package-variant</v-icon>
            <h3 class="mt-2 mb-2 mx-2">compra directa</h3>
          </v-card-text>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          class="white--text"
          color="#1F7087"
          height="100%"
          width="100%"
          to="/stock"
        >
          <v-card-text class="white--text text-center">
            <v-icon class="white--text">mdi-stack-overflow</v-icon>
            <h3 class="mt-2 mb-2 mx-2">Stock y precios</h3>
          </v-card-text>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          class="white--text"
          color="#1F7087"
          height="100%"
          width="100%"
          to=""
        >
          <v-card-text class="white--text text-center">
            <v-icon class="white--text">mdi-sale</v-icon>
            <h3 class="mt-2 mb-2 mx-2">Comparar precios</h3>
          </v-card-text>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    mes: "",
  }),
  computed: {
    ...mapState("InicioModule", [
      "ventadia",
      "ventames",
      "compradia",
      "comprames",
      "dataventas",
      "datacompras",
    ]),
    ...mapState("LoginModule", ["user"]),
  },
  mounted() {
    this.ObtenerVentasDia(this.user.user.id_usuario);
    this.ObtenerVentasMes(this.user.user.id_usuario);
    this.ObtenerComprasDia(this.user.user.id_usuario);
    this.ObtenerComprasMes(this.user.user.id_usuario);

    this.GraficoVentasMes(this.user.user.id_empresa);
    this.GraficoComprasMes(this.user.user.id_empresa);

    this.getMes();
  },
  methods: {
    ...mapActions("InicioModule", [
      "ObtenerVentasDia",
      "ObtenerVentasMes",
      "ObtenerComprasDia",
      "ObtenerComprasMes",
      "GraficoVentasMes",
      "GraficoComprasMes",
    ]),
    getMes() {
      const date = new Date();
      this.mes = date.toLocaleString("default", { month: "long" });
    },
  },
};
</script>