<template>
  <!-- BARRA DE TITULO -->
  <div>
    <v-card class="mb-4">
      <template>
        <v-toolbar flat>
          <v-toolbar-title class="mx-2">
            <v-row>
              <div class="col-md-5 mt-1">
                <v-icon>mdi-package-variant</v-icon>
                Registrar venta
              </div>
              <div class="col-md-2 mt-1">
                <v-text-field
                  append-icon="mdi-calendar"
                  v-model="record.fecha"
                  dense
                  outlined
                  hide-details
          
                >
                </v-text-field>
              </div>
              <div class="col-md-2 mt-1">
                <v-select
                  label="Comprobante"
                  :items="comprobantes"
                  v-model="record.tipo_comprobante"
                  dense
                  outlined
                  hide-details
                  v-on:change="GenerarNumero"
                >
                </v-select>
              </div>
              <div class="col-md-1 mt-1">
                <v-text-field
                  label="serie"
                  v-model="numero.serie"
                  dense
                  outlined
                  hide-details
                >
                </v-text-field>
              </div>
              <div class="col-md-2 mt-1">
                <v-text-field
                  label="correlativo"
                  v-model="numero.correlativo"
                  dense
                  outlined
                  hide-details
                >
                </v-text-field>
              </div>
            </v-row>
          </v-toolbar-title>
        </v-toolbar>
      </template>
    </v-card>
    <!-- CABECERA DEL COMPROBANTES -->
    <v-card>
      <v-row class="mx-2">
        <div class="col-md-1">
          <v-btn color="info" @click.stop="BuscarCliente">
            <v-icon>mdi-account-search</v-icon>
          </v-btn>
          <v-dialog v-model="dialogCliente" max-width="750">
            <v-card class="mt-1">
              <v-toolbar flat>
                <v-toolbar-title> Clientes </v-toolbar-title>
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
                :items="clientes"
                :headers="hCliente"
                :search="search"
                :items-per-page="5"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon color="info" @click="SeleccionarCliente(item)">
                    mdi-checkbox-multiple-marked
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>
        </div>
        <div class="col-md-5">
          <v-text-field
            label="Cliente"
            v-model="cliente.nombre"
            dense
            outlined
            hide-details
            readonly
            filled
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="Documento"
            v-model="cliente.num_doc"
            dense
            outlined
            hide-details
            readonly
            filled
          >
          </v-text-field>
        </div>
        <div class="col-md-1">
          <v-text-field
            label="Sexo"
            v-model="cliente.sexo"
            dense
            outlined
            hide-details
            readonly
            filled
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="Telefono"
            v-model="cliente.telefono"
            dense
            outlined
            hide-details
            readonly
            filled
          >
          </v-text-field>
        </div>
        <div class="col-md-1">
          <v-btn color="info" slot="activator" @click="dialogs.dialog = true">
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-btn>
          <app-dialog :dialogs="dialogs"></app-dialog>
        </div>
      </v-row>
      <v-row class="mx-2">
        <div class="col-md-1">
          <v-btn color="info" @click.stop="dialogProducto = true">
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-btn>
          <v-dialog v-model="dialogProducto" max-width="750">
            <v-card class="mt-1">
              <v-toolbar flat>
                <v-toolbar-title> CATALOGO </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-book-open-page-variant"
                  label="Buscar"
                  hide-details
                  outlined
                  dense
                ></v-text-field>
              </v-toolbar>
              <v-data-table
                :items="catalogo"
                :headers="hCatalago"
                :search="search"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon color="info" @click="SeleccionarProducto(item)">
                    mdi-checkbox-multiple-marked
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="Codigo"
            v-model="item.codigo"
            dense
            outlined
            hide-details
            filled
            readonly
          >
          </v-text-field>
        </div>
        <div class="col-md-5">
          <v-text-field
            label="Producto"
            v-model="item.nombre"
            dense
            outlined
            hide-details
            filled
            readonly
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="Unid-Sunat"
            v-model="item.codigosunat"
            dense
            outlined
            hide-details
            filled
            readonly
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="Unidad"
            v-model="item.unidad"
            dense
            outlined
            hide-details
            filled
            readonly
          >
          </v-text-field>
        </div>
        
      </v-row>
      <v-row class="mx-2">
        <div class="col-md-1"></div>
        <div class="col-md-6">
          <v-text-field
            label="Descripcion"
            v-model="item.descripcion"
            filled
            readonly
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="Precio venta (S/.)"
            v-model="item.precio_venta"
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="Cantidad"
            v-model="item.cantidad"
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </div>
        
        <div class="col-md-1">
          <v-btn @click="AgregarDetalles" color="success">
            <v-icon>mdi-playlist-plus</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-card>
    <!-- DETALLES Y TOTALES -->
    <v-row>
      <div class="col-md-9">
        <v-card class="mt-4">
          <v-data-table :items="record.detalles" :headers="headers">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon color="red" @click="QuitarDetalle(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </div>
      <div class="col-md-3">
        <v-card class="mt-4 pt-2 pb-2 px-3">
          <v-row>
            <div class="col-5 text-right mt-4">
              <p for="">SubTotal:</p>
              <p for="">IGV:</p>
              <p for="">Total:</p>
            </div>
            <div class="col-7">
              <v-text-field
                class="ma-1"
                v-model="totales.subtotal"
                filled
                readonly
                dense
                outlined
                hide-details
              >
              </v-text-field>
              <v-text-field
                class="ma-1"
                v-model="totales.igv"
                readonly
                filled
                dense
                outlined
                hide-details
              >
              </v-text-field>
              <v-text-field
                class="ma-1"
                v-model="totales.total"
                readonly
                filled
                dense
                outlined
                hide-details
              >
              </v-text-field>
            </div>
          </v-row>
        </v-card>
        <v-row class="mt-1">
          <v-col cols="3">
            <v-btn small color="red" dark @click="CancelarVenta">
              <v-icon>mdi-archive-cancel</v-icon>
              Cancelar
            </v-btn>
          </v-col>
          <v-col cols="3" offset="3">
            <v-btn small color="success" @click="GuardarVenta">
              <v-icon>mdi-content-save-all</v-icon>
              Procesar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Dialog from "../components/FormCliente.vue";

export default {
  components: {
    appDialog: Dialog,
  },
  data: () => ({
    search: null,
    dialogProducto: false,
    dialogUnidad: false,
    dialogCliente: false,
    dialogs: {
      dialog: false,
    },
    cliente: {},
    comprobantes: ["Boleta", "Factura"],
    sexo: ["M", "F"],
      tipoDoc: ["DNI", "Carnet de extrajeria"],
    hCatalago: [
      { text: "Codigo", value: "codigo" },
      { text: "Nombre", value: "producto" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Presentacion", value: "unidad" },
      { text: "Unidad Sunat", value: "codigosunat" },
      { text: "C/U", value: "cantidad_unidad" },
      { text: "Precio(S/.)", value: "precio_venta" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    hCliente: [
      { text: "Cliente", value: "nombre" },
      { text: "Documento", value: "num_doc" },
      { text: "Telefono", value: "telefono" },
      { text: "Select", value: "actions", sortable: false },
    ],
    headers: [
      { text: "Cantidad", value: "cantidad" },
      { text: "Unidad", value: "codigosunat" },
      { text: "Producto", value: "nombre" },
      { text: "Descripcion", value: "descripcion" },
      { text: "P/U", value: "precio_venta" },
      { text: "Total", value: "total" },
      { text: "Quitar", value: "actions", sortable: false },
    ],
    record: {
      fecha: new Date().toISOString().slice(0, 10),
      tipo_comprobante: "Boleta",
      serie: null,
      correlativo: null,
      id_cliente: null,
      id_usuario: null,
      total: null,
      estado:'Emitido',
      detalles: [],
    },
    itemDefault: {},
    item: {
      nombre: null,
      descripcion: null,
      codigosunat:null,
      unidad:null,
      cantidad: 0,
      total: null,
      precio_venta: 0,
    },
    totales: {
      subtotal: 0,
      igv: 0,
      total: 0,
    },
  }),
  computed: {
    ...mapState("ProductoModule", ["catalogo"]),
    ...mapState("ClienteModule", ["clientes"]),
    ...mapState("UnidadModule", ["unidades"]),
    ...mapState("LoginModule", ["user"]),
    ...mapState("VentaModule", ["numero"]),
  },
  mounted() {
    this.ObtenerCatalogo(this.user.user.id_empresa);
    this.ObtenerClientes(this.user.user.id_empresa);
    this.ObtenerUnidades(this.user.user.id_empresa);
    this.GenerarNumero();
  },
  methods: {
    ...mapActions("ProductoModule", ["ObtenerCatalogo"]),
    ...mapActions("UnidadModule", ["ObtenerUnidades"]),
    ...mapActions("ClienteModule", ["ObtenerClientes"]),
    ...mapActions("VentaModule", [
      "ProcesarVenta",
      "ObtenerNumero",
      "ImprimirVenta",
    ]),
    SeleccionarProducto(item) {
      console.log(item);
      this.item.id_producto = item.id_producto;
      this.item.codigo = item.codigo;
      this.item.nombre = item.producto;
      this.item.descripcion = item.descripcion;
      this.item.id_unidad = item.id_unidad;
      this.item.codigosunat = item.codigosunat;
      this.item.unidad = item.unidad;
      this.item.precio_venta = item.precio_venta
      this.dialogProducto = false;
    },
    BuscarCliente() {
      this.dialogCliente = true;
      this.ObtenerClientes(this.user.user.id_empresa);
    },
    SeleccionarCliente(item) {
      this.cliente = Object.assign({}, item);
      this.dialogCliente = false;
    },
    calcularAgregar() {
      this.item.total = this.item.cantidad * this.item.precio_venta;
      this.totales.total += this.item.total;
      this.totales.igv = Number(this.totales.total * 0.18).toFixed(1);
      this.totales.subtotal = Number(
        this.totales.total - this.totales.igv
      ).toFixed(1);
    },
    calcularQuitar() {
      this.totales.total -= this.item.total;
      this.totales.igv = Number(this.totales.total * 0.18).toFixed(1);
      this.totales.subtotal = Number(
        this.totales.total - this.totales.igv
      ).toFixed(1);
    },
    AgregarDetalles() {
      this.calcularAgregar();
      this.record.detalles.push(this.item);
    },
    QuitarDetalle(item) {
      let index = this.record.detalles.indexOf(item);
      this.record.detalles.splice(index, 1);
      this.calcularQuitar();
    },
    CancelarVenta() {
      this.$router.push("/ventas");
    },
    async GuardarVenta() {
      this.record.id_cliente = this.cliente.id_cliente;
      this.record.id_usuario = this.user.user.id_usuario;
      this.record.serie = this.numero.serie;
      this.record.correlativo = this.numero.correlativo;
      this.record.total = this.totales.total;
      this.ProcesarVenta(this.record);
      await this.ImprimirVenta(this.user.user.id_empresa);
      this.$router.push("/ventas");
    },
    async GenerarNumero() {
      console.log(this.record.fecha);
      let data = {
        tc: this.record.tipo_comprobante,
        sede: this.user.user.sede,
        id_usuario:this.user.user.id_usuario,
        id_empresa: this.user.user.id_empresa,
      };
      await this.ObtenerNumero(data);
    },
  },
};
</script>