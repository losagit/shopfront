<template>
  <v-dialog v-model="dialogs.dialog" max-width="500px">
    <v-card>
      <form action="">
        <v-card-title>
          <span class="text-h5">Nuevo Proveedor</span>
        </v-card-title>
        <v-card-text>
          <v-container>
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
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="Cancelar"> Cancelar </v-btn>
          <v-btn color="success" text @click="GuardarProveedor()">
            Guardar
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["dialogs"],
  data() {
    return {
      recordDefault: {},
      record: {},
    };
  },
  computed: {
    ...mapState("LoginModule", ["user"]),
  },
  methods: {
    ...mapActions("ProveedorModule", ["RegistrarProveedor"]),
    limpiar() {
      this.$nextTick(() => {
        this.record = Object.assign({}, this.recordDefault);
      });
    },
    Cancelar() {
      this.dialogs.dialog = false;
      this.limpiar();
    },
    GuardarProveedor() {
      this.record.id_empresa = this.user.user.id_empresa;
      this.RegistrarProveedor(this.record);
      this.dialogs.dialog = false;
    },
  },
};
</script>