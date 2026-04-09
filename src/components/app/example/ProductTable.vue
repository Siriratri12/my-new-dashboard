<template>
  <v-card class="pa-4" flat>
    <v-row>
      <v-col cols="12">
        <h2 class="headline font-weight-bold mb-4 primary--text">
          <v-icon color="primary" class="mr-2">mdi-archive</v-icon>
          Product Management
        </h2>
      </v-col>
    </v-row>

    <FilterPanel
      search-label="Search Product Name"
      :search-items="productTitles"
      :categories="categories"
      @filter-change="updateFilters"
    />

    <v-btn color="primary" class="mb-4" @click="fetchProducts">
      <v-icon left>mdi-refresh</v-icon> Refresh Data
    </v-btn>

    <v-data-table :headers="headers" :items="filteredItems" class="elevation-1">
      <template #[`item.price`]="{ item }">
        <strong>${{ item.price }}</strong>
      </template>
      <template #[`item.rating`]="{ item }">
        <v-chip small :color="item.rating > 4.5 ? 'purple' : 'pink'" dark>
          {{ item.rating }} ★★
        </v-chip>
      </template>
      <template #[`item.action`]="{ item }">
        <v-btn
          icon
          small
          color="primary"
          @click="createOrder(item)"
          class="mr-1"
        >
          <v-icon small>mdi-archive-plus</v-icon>
        </v-btn>
        <v-btn icon small color="info" @click="viewDetail(item)">
          <v-icon small>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <LoadingComponent :show="loading" />
    <ProductDetailDialog
      v-model="detailDialog"
      :product-id="selectedProductId"
    />
  </v-card>
</template>

<script>
import api from "@/plugins/axios";
import { mapActions, mapState } from "pinia";
import { useOrderStore } from "@/stores/orderStore";
import LoadingComponent from "./LoadingComponent.vue";
import ProductDetailDialog from "./ProductDetailDialog.vue";
import FilterPanel from "./FilterPanel.vue";

export default {
  name: "ProductTable",
  components: { LoadingComponent, ProductDetailDialog, FilterPanel },
  data: () => ({
    loading: false,
    detailDialog: false,
    selectedProductId: null,
    activeFilters: { search: "", category: null },
    headers: [
      { text: "Title", value: "title" },
      { text: "Category", value: "category" },
      { text: "Price", value: "price", align: "end" },
      { text: "Stock", value: "stock", align: "center" },
      { text: "Rating", value: "rating", align: "center" },
      { text: "Action", value: "action", sortable: false },
    ],
  }),
  computed: {
    ...mapState(useOrderStore, ["products"]),
    categories() {
      return [...new Set(this.products.map((i) => i.category))];
    },
    filteredItems() {
      let result = [...this.products];
      const { search, category } = this.activeFilters;

      if (search) {
        result = result.filter((i) =>
          i.title.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (category) {
        result = result.filter((i) => i.category === category);
      }
      return result;
    },
    productTitles() {
      return this.products.map((p) => p.title);
    },
  },
  methods: {
    ...mapActions(useOrderStore, ["setProducts"]),
    updateFilters(newFilters) {
      this.activeFilters = newFilters;
    },
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await api.get("/products?limit=100");
        this.setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    viewDetail(item) {
      this.selectedProductId = item.id;
      this.detailDialog = true;
    },
    createOrder(item) {
      this.$emit("create-order", item);
    },
  },
  mounted() {
    if (this.products.length === 0) this.fetchProducts();
  },
};
</script>
