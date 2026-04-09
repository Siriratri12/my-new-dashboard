1//////////////////////////////
<template>
  <v-dialog :value="show" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text class="pt-4 text-center">
        LOADING...
        <v-progress-linear indeterminate color="white" class="mt-3" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingComponent',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>
