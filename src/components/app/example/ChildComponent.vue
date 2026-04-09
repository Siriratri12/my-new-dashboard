<template>
  <v-card class="pa-4" style="background-color: coral;">
    <div>ข้อความจาก Parent: <strong>{{ message }}</strong></div>

    <v-text-field
      v-model="childInput"
      label="พิมพ์อะไรสักอย่าง"
    ></v-text-field>

    <v-btn color="primary" @click="sendToParent">
      ส่งข้อมูลกลับไป Parent
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "ChildComponent",

  props: {
    message: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      childInput: ""
    };
  },

  methods: {
    sendToParent() {
      // ส่ง event พร้อมข้อมูลกลับไป Parent
      this.$emit('child-send', this.childInput)
    }
  }
}
</script>
