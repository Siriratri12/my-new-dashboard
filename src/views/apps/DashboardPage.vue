1 /////////////////////////////////
<!-- <template>
  <v-card class="pa-4" flat>
    <ProductTable @create-order="openCreateOrder" />
    <OrderTable />
    <OrderDialog v-model="orderDialog" mode="create" :product="selectedProduct" @save="handleSaveOrder" />
    <ReportView :product-list="items"/>
  </v-card>
</template>

<script>
import ProductTable from '../../components/app/example/ProductTable.vue'
import OrderTable from '../../components/app/example/OrderTablePage.vue'
import OrderDialog from '../../components/app/example/OrderDialog.vue'
import ReportView from '@/components/app/example/ReportView.vue'
import { useOrderStore } from '@/stores/orderStore'

export default {
  name: 'DashboardPage',
  components: { ProductTable, OrderTable, OrderDialog, ReportView },
  data() {
    return {
      orderDialog: false,
      selectedProduct: null
    }
  },
  setup() {
    const orderStore = useOrderStore()
    return { orderStore }
  },
  methods: {
    openCreateOrder(product) {
      this.selectedProduct = product
      this.orderDialog = true
    },
    handleSaveOrder(order) {
      this.orderStore.addOrder(order)
    }
  }
}
</script> -->

3 ///////////////////////////////////

<template>
  <v-card class="pa-4" flat>
    <ProductTable @create-order="openCreateOrder" @products-loaded="onProductsLoaded" />
    <v-divider class="my-4"></v-divider>
    <OrderTable />
    <v-divider class="my-4"></v-divider>
    <DeletedOrders />
    <v-divider class="my-4"></v-divider>
    <OrderDialog v-model="orderDialog" mode="create" :product="selectedProduct" @save="handleSaveOrder" />
    <v-divider class="my-4"></v-divider>
    <ReportView :product-list="orderStore.products" />
    <v-snackbar v-model="orderStore.snackbar.show" :color="orderStore.snackbar.color" timeout="3000" bottom right>
      {{ orderStore.snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="orderStore.snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import ProductTable from '../../components/app/example/ProductTable.vue'
import OrderTable from '../../components/app/example/OrderTablePage.vue'
import OrderDialog from '../../components/app/example/OrderDialog.vue'
import ReportView from '@/components/app/example/ReportView.vue'
import { useOrderStore } from '@/stores/orderStore'
import DeletedOrders from '@/components/app/example/DeletedOrders.vue'

export default {
  components: { ProductTable, OrderTable, OrderDialog, ReportView, DeletedOrders },

  data() {
    return {
      orderDialog: false,
      selectedProduct: null
    }
  },

  setup() {
    const orderStore = useOrderStore()
    return { orderStore }
  },

  methods: {
    openCreateOrder(product) {
      this.selectedProduct = product
      this.orderDialog = true
    },

    onProductsLoaded(products) {
      this.orderStore.setProducts(products)
    },

    handleSaveOrder(order) {
      this.orderStore.addOrder(order)
    }
  }
}
</script>

2 //////////////////////////////

<!-- <template>
  <v-card class="pa-4" flat>
    <ProductTable 
      :search-val="search" 
      :dates-val="dates"
      @update:search="search = $event"
      @update:dates="dates = $event"
      @create-order="openCreateOrder" 
      @products-loaded="onProductsLoaded" 
    />

    <OrderTable 
      :search-filter="search" 
      :date-filter="dates"
    />
    
    <DeletedOrders />
    
    <OrderDialog 
      v-model="orderDialog" 
      mode="create" 
      :product="selectedProduct" 
      @save="handleSaveOrder" 
    />
    
    <ReportView :product-list="orderStore.products" />
  </v-card>
</template>

<script>
import ProductTable from '../../components/app/example/ProductTable.vue'
import OrderTable from '../../components/app/example/OrderTablePage.vue'
import OrderDialog from '../../components/app/example/OrderDialog.vue'
import ReportView from '@/components/app/example/ReportView.vue'
import DeletedOrders from '@/components/app/example/DeletedOrders.vue'
import { useOrderStore } from '@/stores/orderStore'

export default {
  components: { ProductTable, OrderTable, OrderDialog, ReportView, DeletedOrders },
  data() {
    return {
      orderDialog: false,
      selectedProduct: null,
      // เก็บสถานะการกรองไว้ที่นี่
      search: '',
      dates: []
    }
  },
  setup() {
    const orderStore = useOrderStore()
    return { orderStore }
  },
  methods: {
    openCreateOrder(product) {
      this.selectedProduct = product
      this.orderDialog = true
    },
    onProductsLoaded(products) {
      this.orderStore.setProducts(products)
    },
    handleSaveOrder(order) {
      this.orderStore.addOrder(order)
    }
  }
}
</script> -->
