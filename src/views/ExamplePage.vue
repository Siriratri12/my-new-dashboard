<template>
  <v-container fluid fill-height>
    <v-card height="100%" width="100%" style="position: relative; border-radius: 15px">
      test
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      namePage: this.$route.name,
      routePage: this.$route.path,

    };
  }, //data

  created() {},
  async mounted() { },
  computed: {},

  methods: {

  },
};
</script>
