<template>
  <v-container fluid fill-height>
    <v-card height="100%" width="100%" style="position: relative; border-radius: 15px">
      Dialog

      ------

    <v-dialog
      v-model="dialog"
      width="500"
    >
    

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      namePage: this.$route.name,
      routePage: this.$route.path,

      dialog: true,

    };
  }, //data

  created() {},
  async mounted() { },
  computed: {},

  methods: {

  },
};
</script>
