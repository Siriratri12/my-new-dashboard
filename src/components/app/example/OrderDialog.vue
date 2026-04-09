2////////////////////////////
<template>
  <v-dialog :value="value" @input="$emit('input', false)" max-width="500px" persistent>
    <v-card>
      <v-card-title class="headline blue darken-2 white--text">
        <v-icon left dark>mdi-cart-edit</v-icon>
        {{ mode === 'create' ? 'Create New Order' : 'Edit Order' }}
      </v-card-title>

      <v-card-text class="pt-6">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="formData.id" label="Order Number" outlined dense disabled
                  prepend-inner-icon="mdi-tag"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="formData.productName" label="Product Name" outlined dense disabled
                  prepend-inner-icon="mdi-package-variant"></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model.number="formData.qty" label="Quantity" type="number" outlined dense
                  :rules="qtyRules" :hint="mode === 'create' ? `Available stock: ${currentStock}` : ''"
                  persistent-hint></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field :value="totalPrice" label="Total Price" outlined dense readonly prefix="฿"></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select v-model="formData.status" :items="['Pending', 'Shipped', 'Delivered', 'Cancelled']"
                  label="Status" outlined dense :rules="[v => !!v || 'Please select a status']"
                  prepend-inner-icon="mdi-list-status"></v-select>
              </v-col>

              <v-col cols="12" v-if="formData.status === 'Cancelled'">
                <v-textarea v-model="formData.cancelReason" label="Reason for Cancellation" outlined dense rows="2"
                  prepend-inner-icon="mdi-comment-question" placeholder="Specity the reason for cancellation"
                  :rules="cancelRules"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('input', false)">Cancel</v-btn>
        <v-btn color="primary" @click="save" :disabled="!valid">
          {{ mode === 'create' ? 'Confirm Create' : 'Save Changes' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useOrderStore } from '@/stores/orderStore'

export default {
  props: {
    value: Boolean,
    mode: { type: String, default: 'create' },
    order: { type: Object, default: () => ({}) },
    product: { type: Object, default: () => ({}) }
  },
  data: () => ({
    valid: true,
    formData: {
      id: '',
      productId: null,
      productName: '',
      qty: 1,
      unitPrice: 0,
      stock: 0,
      status: 'Pending',
      cancelReason: '',
      orderedAt: '',
      category: ''
    }
  }),
  computed: {
    orderStore() {
      return useOrderStore()
    },
    nextOrderId() {
      return this.orderStore.nextOrderId
    },
    currentStock() {
      // debugger
      return this.mode === 'create'
        ? (this.product?.stock || 0)
        : (this.order.stock || 0)
    },
    totalPrice() {
      return (this.formData.qty || 0) * (this.formData.unitPrice || 0)
    },
    qtyRules() {
      return [
        v => !!v || 'Please specify the quantity.',
        v => v >= 1 || 'The quantity must be at least 1.',
        v => v <= this.currentStock || 'Dont have enough stock.'
      ]
    },
    cancelRules() {
      return [
        v => {
          if (this.formData.status === 'Cancelled' && (!v || !v.trim())) {
            return 'Specity the reason for cancellation'
          }
          return true
        }
      ]
    }
  },
  watch: {
    value(val) {
      if (!val) return

      if (this.mode === 'edit') {
        this.formData = JSON.parse(JSON.stringify(this.order))
      } else {
        // debugger
        this.formData = {
          id: this.nextOrderId,
          productId: this.product.id,
          productName: this.product.title,
          category: this.product.category,
          qty: 1,
          unitPrice: this.product.price,
          stock: this.product.stock,
          status: 'Pending',
          orderedAt: new Date().toISOString()
        }
      }
    }
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) return
      this.$emit('save', { ...this.formData })
      this.$emit('input', false)
    }
  },

}
</script>

