<template>
  <v-card>
    <v-card-title>
      <template>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon>mdi-package-variant</v-icon>
            Arqueo de caja
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="200px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" class="ml-2" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-playlist-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title> Abrir Caja </v-card-title>
              <v-card-text>
                <v-text-field
                  label="monto inicial"
                  v-model="record.monto_inicial"
                  dense
                  outlined
                  hide-details
                >
                </v-text-field>

                <v-text-field
                  label="Total Ventas"
                  class="mt-2"
                  v-model="record.total_ventas"
                  dense
                  outlined
                  hide-details
                >
                </v-text-field>
                <v-text-field
                  label="monto final"
                  class="mt-2"
                  v-model="record.monto_final"
                  dense
                  outlined
                  hide-details
                >
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-col cols="7" offset="5">
                  <v-btn v-if="caja[0].estado === 'cerrada'" color="success" @click="AbrirCaja"> Abrir </v-btn>
                  <v-btn v-else color="warning" @click="CerrarCaja"> Cerrar </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-text-field
            label="Caja"
            v-model="user.user.caja"
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            label="Usuario"
            v-model="user.user.nombre"
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Rol"
            v-model="user.user.rol"
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            append-icon="mdi-calendar"
            v-model="record.fecha"
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <div class="col-md-12">
          <v-card>
            <v-data-table :items="arqueos" :headers="headers">
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon v-if="item.monto_final === null" color="info" @click="MostrarArqueo(item)">
                  mdi-eye
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    dialog: false,
    recordDefault: {},
    record: {
      monto_inicial: null,
      total_ventas: null,
      monto_final: null,
      fecha: new Date().toISOString().slice(0, 10),
      id_caja: null,
    },
    headers: [
      { text: "Fecha", value: "fecha" },
      { text: "Monto inicial", value: "monto_inicial" },
      { text: "Total ventas", value: "total_ventas" },
      { text: "Monto final", value: "monto_final" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("LoginModule", ["user"]),
    ...mapState("CajaModule", ["caja","arqueos"]),
    ...mapState("InicioModule", ["ventadia"]),
  },
  mounted() {
    this.ObtenerArqueos(this.user.user.id_caja);
    this.ObtenerVentasDia(this.user.user.id_usuario);
    this.ObtenerCajaId(this.user.user.id_caja);
  },
  methods: {
    ...mapActions("CajaModule", ["ObtenerCajaId","ObtenerArqueos", "RegistrarApertura","EditarCierre"]),
    ...mapActions("InicioModule", ["ObtenerVentasDia"]),

    AbrirCaja() {
      this.record.id_caja = this.user.user.id_caja;
      this.RegistrarApertura(this.record);
      this.ObtenerArqueos(this.user.user.id_caja);
      this.dialog = false;
      this.$router.push("/cajas");
    },
    CerrarCaja() {
      console.log(this.record);
      this.EditarCierre(this.record);
      this.ObtenerArqueos(this.user.user.id_caja);
      this.dialog = false;
      this.$router.push("/cajas");
    },
    MostrarArqueo(item) {
      this.editedIndex = this.arqueos.indexOf(item);
      this.record.id_arqueo = item.id_arqueo;
      this.record.id_caja = item.id_caja;
      this.record.monto_inicial = item.monto_inicial;
      this.record.total_ventas = this.ventadia.Ventas_dia;
      this.dialog = true;
    },
    Mostrar(){
      console.log(this.caja);
    }
  },
};
</script>