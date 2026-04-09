1///////////////////////////////////
<template>
    <v-card class="pa-4" flat>
    <v-row class="mb-4">
      <v-col cols="12">
        <h2 class="headline font-weight-bold mb-4 primary--text">
          <v-icon color="primary" class="mr-2">mdi-chart-areaspline</v-icon>
          Business Intelligence Report
        </h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg elevation-2" color="blue darken-2" dark>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="white--text opacity-70">ACTIVE ORDERS</v-list-item-subtitle>
              <v-list-item-title class="text-h4 font-weight-bold">{{ activeOrdersCount }}</v-list-item-title>
              <v-list-item-subtitle class="white--text">Excluding Cancelled</v-list-item-subtitle>
            </v-list-item-content>
            <v-icon size="48" style="opacity: 0.5">mdi-cart-check</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg elevation-2" color="green darken-2" dark>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="white--text opacity-70">TOTAL REVENUE</v-list-item-subtitle>
              <v-list-item-title class="text-h4 font-weight-bold">฿{{ totalRevenue.toLocaleString()
              }}</v-list-item-title>
              <v-list-item-subtitle class="white--text">Net Revenue</v-list-item-subtitle>
            </v-list-item-content>
            <v-icon size="48" style="opacity: 0.5">mdi-cash-multiple</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg elevation-2" color="purple darken-2" dark>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="white--text opacity-70">TOP CATEGORY</v-list-item-subtitle>
              <v-list-item-title class="text-h5 font-weight-bold">{{ topCategory.name }}</v-list-item-title>
              <v-list-item-subtitle class="white--text">{{ topCategory.count }} Orders</v-list-item-subtitle>
            </v-list-item-content>
            <v-icon size="48" style="opacity: 0.5">mdi-tag-heart</v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg elevation-2" :color="lowStockCount > 0 ? 'orange darken-3' : 'teal darken-2'" dark>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle class="white--text opacity-70">LOW ITEMS</v-list-item-subtitle>
              <v-list-item-title class="text-h4 font-weight-bold">{{ lowStockCount }}</v-list-item-title>
              <v-list-item-subtitle class="white--text">Stock less than 10 units</v-list-item-subtitle>
            </v-list-item-content>
            <v-icon size="48" style="opacity: 0.5">mdi-alert-circle</v-icon>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="rounded-lg elevation-2">
          <v-card-title class="grey lighten-4 font-weight-bold">
            <v-icon left color="primary">mdi-table-summarize</v-icon>
            Sales Performance by Category
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table :headers="headers" :items="categorySummary" hide-default-footer class="elevation-0">
            <template #[`item.revenue`]="{ item }">
              <v-list-item-title class="font-weight-bold green--text text--darken-3">
                ฿{{ item.revenue.toLocaleString() }}
              </v-list-item-title>
            </template>
            <template #[`item.orderCount`]="{ item }">
              <v-chip small color="blue lighten-5" class="blue--text font-weight-bold">
                {{ item.orderCount }} Orders
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    </v-card>
</template>

<script>
import { useOrderStore } from '@/stores/orderStore'

export default {
  name: 'ReportView',
  props: {
    productList: { type: Array, default: () => [] }
  },
  data: () => ({
    headers: [
      { text: 'Category', value: 'category', class: 'font-weight-bold' },
      { text: 'Total Orders', value: 'orderCount', align: 'center', class: 'font-weight-bold' },
      { text: 'Net Revenue', value: 'revenue', align: 'end', class: 'font-weight-bold' },
    ]
  }),
  computed: {
    orderStore() { return useOrderStore() },
    orders() { return this.orderStore.orders || [] },

    activeOrdersCount() {
      return this.orders.filter(o => o.status !== 'Cancelled').length
    },

    totalRevenue() {
      return this.orders
        .filter(o => o.status !== 'Cancelled')
        .reduce((sum, o) => sum + (o.qty * (o.unitPrice || 0)), 0)
    },

    lowStockItemsList() {
      const threshold = 10;
      return this.productList.filter(p => p.stock < threshold);
    },

    lowStockCount() {
      return this.lowStockItemsList.length;
    },

    categorySummary() {
      const summaryMap = {};

      this.orders.forEach(o => {
        const catName = o.category || 'Uncategorized';

        if (!summaryMap[catName]) {
          summaryMap[catName] = { category: catName, orderCount: 0, revenue: 0 };
        }

        summaryMap[catName].orderCount += 1;
        if (o.status !== 'Cancelled') {
          summaryMap[catName].revenue += (o.qty * (o.unitPrice || 0));
        }
      });

      return Object.values(summaryMap);
    },

    topCategory() {
      if (this.categorySummary.length === 0) return { name: '-', count: 0 }
      const sorted = [...this.categorySummary].sort((a, b) => b.orderCount - a.orderCount)
      return { name: sorted[0].category, count: sorted[0].count || sorted[0].orderCount }
    }
  }
}
</script>