<template>
  <!-- BARRA DE TITULO -->
  <div>
    <v-card class="mb-4">
      <template>
        <v-toolbar flat>
          <v-toolbar-title class="mx-2">
            <v-row>
              <div class="col-md-5">
                <v-icon>mdi-package-variant</v-icon>
                Registrar compra
              </div>
              <div class="col-md-2">
                <v-text-field
                  append-icon="mdi-calendar"
                  v-model="record.fecha"
                  dense
                  outlined
                  hide-details
                >
                </v-text-field>
              </div>
              <div class="col-md-2">
                <v-select
                  label="Comprobante"
                  :items="comprobantes"
                  v-model="record.tipo_comprobante"
                  dense
                  outlined
                  hide-details
                >
                </v-select>
              </div>
              <div class="col-md-1">
                <v-text-field
                  label="serie"
                  v-model="record.serie"
                  dense
                  outlined
                  hide-details
                >
                </v-text-field>
              </div>
              <div class="col-md-2">
                <v-text-field
                  label="correlativo"
                  v-model="record.correlativo"
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
          <v-btn color="info" @click.stop="BuscarProveedor">
            <v-icon>mdi-truck-delivery</v-icon>
          </v-btn>
          <v-dialog v-model="dialogProveedor" max-width="750">
            <v-card class="mt-1">
              <v-toolbar flat>
                <v-toolbar-title> PROVEEDORES </v-toolbar-title>
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
                :items="proveedores"
                :headers="hProveedor"
                :search="search"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon color="info" @click="SeleccionarProveedor(item)">
                    mdi-checkbox-multiple-marked
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>
        </div>
        <div class="col-md-4">
          <v-text-field
            label="Proveedor"
            v-model="proveedor.razon_social"
            dense
            outlined
            hide-details
            filled
            readonly
            required
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="ruc"
            v-model="proveedor.ruc"
            filled
            readonly
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </div>
        <div class="col-md-4">
          <v-text-field
            label="Direccion"
            v-model="proveedor.direccion"
            filled
            readonly
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </div>
        <div class="col-md-1">
          <v-btn color="info" slot="activator" @click="dialogs.dialog = true">
            <v-icon>mdi-truck-plus</v-icon>
          </v-btn>
          <app-dialog :dialogs="dialogs"></app-dialog>
        </div>
      </v-row>
      <v-row class="mx-2">
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
        <div class="col-md-3">
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
      </v-row>
      <v-row class="mx-2">
        <div class="col-md-1">
          <v-btn color="info" @click.stop="dialogUnidad = true">
            <v-icon>mdi-tape-measure</v-icon>
          </v-btn>
          <v-dialog v-model="dialogUnidad" max-width="550">
            <v-card class="mt-1">
              <v-toolbar flat>
                <v-toolbar-title> UNIDADES DE MEDIDA </v-toolbar-title>
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
                :items="unidades"
                :headers="hUnidades"
                :search="search"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon color="info" @click="SeleccionarUnidad(item)">
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
        <div class="col-md-2">
          <v-text-field
            label="Precio total"
            v-model="item.precio_compra"
            dense
            outlined
            hide-details
          >
          </v-text-field>
        </div>
        <div class="col-md-2">
          <v-text-field
            label="Precio venta"
            v-model="item.precio_venta"
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
          <v-col cols="6">
            <v-btn small color="red" dark @click="CancelarCompra">
              <v-icon>mdi-archive-cancel</v-icon>
              Cancelar
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              small
              color="success"
              @click="GuardarCompra"
              ref="btnGuardar"
            >
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
import Dialog from "../components/FormProveedor.vue";
export default {
  components: {
    appDialog: Dialog,
  },
  data: () => ({
    search: null,
    dialogProducto: false,
    dialogUnidad: false,
    dialogProveedor: false,
    dialogs: {
      dialog: false,
    },
    proveedor: [],
    comprobantes: ["Factura", "Boleta"],
    hProducto: [
      { text: "Producto", value: "nombre" },
      { text: "Desricpion", value: "descripcion" },
      { text: "Select", value: "actions", sortable: false },
    ],
    hUnidades: [
      { text: "Unidad", value: "nombre" },
      { text: "codigo", value: "codigo" },
      { text: "C/U", value: "cantidad_unidad" },
      { text: "Select", value: "actions", sortable: false },
    ],
    hProveedor: [
      { text: "Proveedor", value: "razon_social" },
      { text: "Ruc", value: "ruc" },
      { text: "Direccion", value: "direccion" },
      { text: "Select", value: "actions", sortable: false },
    ],
    headers: [
      { text: "cantidad", value: "cantidad" },
      { text: "Unidad", value: "codigosunat" },
      { text: "Producto", value: "nombre" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Precio", value: "precio_unitario" },
      { text: "Total", value: "precio_compra" },
      { text: "Quitar", value: "actions", sortable: false },
    ],
    record: {
      fecha: new Date().toISOString().slice(0, 10),
      tipo_comprobante: null,
      serie: null,
      correlativo: null,
      id_proveedor: null,
      id_usuario: null,
      total: null,
      estado: "Registrado",
      detalles: [],
    },
    itemDefault: {},
    item: {
      nombre: null,
      descripcion: null,
      unidad: null,
      codigosunat: null,
      cantidad: null,
      precio_unitario: 0,
      precio_compra: null,
      precio_venta: null,
    },
    totales: {
      subtotal: 0,
      igv: 0,
      total: 0,
    },
  }),
  computed: {
    ...mapState("ProductoModule", ["productos"]),
    ...mapState("ProveedorModule", ["proveedores"]),
    ...mapState("UnidadModule", ["unidades"]),
    ...mapState("LoginModule", ["user"]),
  },
  mounted() {
    this.ObtenerProductos(this.user.user.id_empresa);
    this.ObtenerProveedores(this.user.user.id_empresa);
    this.ObtenerUnidades(this.user.user.id_empresa);
  },

  methods: {
    ...mapActions("ProductoModule", ["ObtenerProductos"]),
    ...mapActions("ProveedorModule", ["ObtenerProveedores"]),
    ...mapActions("UnidadModule", ["ObtenerUnidades"]),
    ...mapActions("CompraModule", ["ProcesarCompra", "ImprimirCompra"]),
    SeleccionarProducto(item) {
      this.item.id_producto = item.id_producto;
      this.item.codigo = item.codigo;
      this.item.nombre = item.nombre;
      this.item.descripcion = item.descripcion;
      this.dialogProducto = false;
    },
    SeleccionarUnidad(item) {
      this.item.id_unidad = item.id_unidad;
      this.item.unidad = item.nombre;
      this.item.codigosunat = item.codigo;
      this.dialogUnidad = false;
    },
    SeleccionarProveedor(item) {
      this.proveedor = Object.assign({}, item);
      this.dialogProveedor = false;
    },
    BuscarProveedor() {
      this.dialogProveedor = true;
      this.ObtenerProveedores(this.user.user.id_empresa);
    },
    limpiar() {
      this.$nextTick(() => {
        this.item = Object.assign({}, this.itemDefault);
        this.editedIndex = -1;
      });
    },
    calcularAgregar() {
      this.item.precio_unitario = Number(this.item.precio_compra / this.item.cantidad).toFixed(1);
      this.totales.total += Number(this.item.precio_compra);
      this.totales.igv = Number(this.totales.total * 0.18).toFixed(1);
      this.totales.subtotal = Number(this.totales.total - this.totales.igv).toFixed(1);
    },
    calcularQuitar() {
      this.totales.total -= Number(this.item.precio_compra);
      this.totales.igv = Number(this.totales.total * 0.18).toFixed(1);
      this.totales.subtotal = Number(
        this.totales.total - this.totales.igv
      ).toFixed(1);
    },
    AgregarDetalles() {
      this.calcularAgregar();
      this.record.detalles.push(this.item);
      this.limpiar();
    },
    QuitarDetalle(item) {
      let index = this.record.detalles.indexOf(item);
      this.record.detalles.splice(index, 1);
      this.calcularQuitar();
    },
    CancelarCompra() {
      this.$router.push("/compras");
    },
    Anular() {},
    async GuardarCompra() {
      this.record.id_proveedor = this.proveedor.id_proveedor;
      this.record.id_usuario = this.user.user.id_usuario;
      this.record.total = this.totales.total;
      console.log(this.record);
      /* this.ProcesarCompra(this.record);
      await this.ImprimirCompra();
      this.$router.push("/compras"); */
    },
  },
};
</script>