1////////////////////////
<template>
  <v-dialog v-model="internalValue" max-width="600px">
    <v-card :loading="loading">
      <v-card-title class="headline grey lighten-2">
        Product Detail
        <v-spacer></v-spacer>
        <v-btn icon @click="internalValue = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>

      <v-card-text v-if="product" class="pa-4">
        <v-row>
          <v-col cols="12" md="5">
            <v-img :src="product.thumbnail" height="200" contain class="grey lighten-4"></v-img>
          </v-col>
          <v-col cols="12" md="7">
            <h2 class="primary--text">{{ product.title }}</h2>
            <p class="text-subtitle-1"><strong>Brand:</strong> {{ product.brand }}</p>
            <p>{{ product.description }}</p>
            <div class="text-h5 green--text">${{ product.price }}</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="internalValue = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '@/plugins/axios'

export default {
  name: 'ProductDetailDialog',
  props: {
    value: Boolean,
    productId: [Number, String]
  },
  data: () => ({
    product: null,
    loading: false
  }),
  computed: {
    internalValue: {
      get() { return this.value },
      set(val) { this.$emit('input', val) }
    }
  },
  watch: {
    async productId(newId) {
      if (newId && this.value) {
        await this.fetchProductDetail(newId)
      }
    },
    async value(isOpen) {
      if (isOpen && this.productId) {
        await this.fetchProductDetail(this.productId)
      }
    }
  },
  methods: {
    async fetchProductDetail(id) {
      this.loading = true
      try {
        const res = await api.get(`/products/${id}`)
        this.product = res.data
      } catch (err) {
        console.error('Fetch Detail Error:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>