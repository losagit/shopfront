<template>
  <v-dialog v-model="dialogs.dialog" max-width="500px">
    <v-card>
      <form action="">
        <v-card-title>
          <span class="text-h5">Nuevo Cliente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
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
                  maxlength="11"
                  dense
                  outlined
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
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="Cancelar"> Cancelar </v-btn>
          <v-btn color="success" text @click="GuardarCliente()">
            Guardar
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions,mapState } from "vuex";

export default {
  props: ["dialogs"],
  data() {
    return {
      recordDefault: {},
      record: {},
      sexo: ["M", "F"],
      tipoDoc: ["DNI","RUC","Carnet de extrajeria"],
    };
  },
  computed:{
    ...mapState("LoginModule", ["user"]),
  },
  methods: {
    ...mapActions("ClienteModule", ["RegistrarCliente"]),
    limpiar() {
      this.$nextTick(() => {
        this.record = Object.assign({}, this.recordDefault);
      });
    },
    Cancelar() {
      this.dialogs.dialog = false;
      this.limpiar();
    },
    GuardarCliente() {
      this.record.id_empresa = this.user.user.id_empresa
      this.RegistrarCliente(this.record);
      this.dialogs.dialog = false;
    },
  },
};
</script>