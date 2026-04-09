<template>
  <v-container fluid fill-height>
    <v-card
      width="50%"
      style="position: relative; border-radius: 15px"
      class="d-flex align-center justify-center pa-4 mx-auto"
    >
      <div class="text-center">
        <p class="font  font-weight-bold ">
          404
        </p>
        <p>
          Page not found
        </p>
        <br />
        <v-btn
          align="center"
          color="primary"
          width="200"
          outlined
          rounded
          @click="gotoHome()"
          >Back</v-btn
        >
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.font {
  font-size: 150px;
  color: gray;
}
</style>
