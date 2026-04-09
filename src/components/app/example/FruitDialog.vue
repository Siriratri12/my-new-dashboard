<template>
  <v-dialog v-model="internalShow" max-width="450">
    <v-card>

      <v-img
        v-if="fruit?.img"
        :src="fruit.img"
        height="200px"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <v-card-title>{{ fruit?.name }}</v-card-title>
      </v-img>

      <v-card-text>
        <br />
        <br />
        <strong>สี:</strong> {{ fruit?.color }}
        <br />
        <br />
        <strong>รายละเอียด:</strong> {{ fruit?.desc }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text color="red" @click="closeDialog">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean,
    fruit: Object,
  },

  data() {
    return {
      internalShow: this.show,
    };
  },

  watch: {
    show(val) {
      this.internalShow = val;
    },
    internalShow(val) {
      if (!val) this.$emit("close");
    }
  },

  methods: {
    closeDialog() {
      this.internalShow = false;
    }
  }
};
</script>

