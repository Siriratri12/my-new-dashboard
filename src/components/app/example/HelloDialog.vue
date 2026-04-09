<template>
  <v-dialog v-model="internalDialog" max-width="400">
    <v-card>
      <v-card-title class="headline">
        Welcome
      </v-card-title>

      <v-card-text>
        {{ message }}  
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  message: "HelloDialog",

  props: {
    value: { type: Boolean, default: false }, // รองรับ v-model
    message: { type: String, default: "" },
  },

  data() {
    return {
      internalDialog: this.value, // ทำตัวเชื่อม v-model (parent)
    };
  },

  watch: {
    value(val) {
      this.internalDialog = val;
    },
    internalDialog(val) {
      this.$emit("input", val); // ส่งกลับไป parent
    }
  },

  methods: {
    closeDialog() {
      this.internalDialog = false;
    },
  },
};
</script>
