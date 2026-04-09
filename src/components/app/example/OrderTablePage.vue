<template>
  <v-card class="pa-4" flat>
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2 class="headline font-weight-bold primary--text">
          <v-icon color="primary" class="mr-2">mdi-cart</v-icon>
          Order Management
        </h2>
      </v-col>
      <v-col cols="12" md="6" class="text-right">
        <v-btn
          color="grey darken-3"
          dark
          class="mr-2"
          @click="exportCSV"
          :disabled="filteredOrders.length === 0"
        >
          <v-icon left>mdi-file-delimited</v-icon> CSV
        </v-btn>
        <v-btn
          color="green darken-2"
          dark
          @click="exportExcel"
          :disabled="filteredOrders.length === 0"
        >
          <v-icon left>mdi-file-excel</v-icon> Excel
        </v-btn>
      </v-col>
    </v-row>

    <FilterPanel
      search-label="Search Order No. / Product Name"
      :search-items="orderSearchList"
      show-status
      @filter-change="updateFilters"
    />

    <v-data-table
      :headers="headers"
      :items="filteredOrders"
      :loading="loading"
      class="elevation-1 border-top mt-4"
    >
      <template #[`item.orderedAt`]="{ item }">{{
        formatDate(item.orderedAt)
      }}</template>
      <template #[`item.total`]="{ item }"
        ><strong
          >${{ (item.qty * item.unitPrice).toLocaleString() }}</strong
        ></template
      >
      <template #[`item.status`]="{ item }">
        <v-chip small :color="getStatusColor(item.status)" dark>{{
          item.status
        }}</v-chip>
      </template>
      <template #[`item.action`]="{ item }">
        <v-btn icon color="primary" small @click="openEditDialog(item)"
          ><v-icon small>mdi-pencil</v-icon></v-btn
        >
        <v-btn icon color="error" small @click="confirmDelete(item.id)"
          ><v-icon small>mdi-delete</v-icon></v-btn
        >
      </template>
    </v-data-table>

    <OrderDialog
      v-model="dialogVisible"
      :mode="dialogMode"
      :order="selectedOrder"
      @save="handleSaveOrder"
    />
    <LoadingComponent :show="loading" />
  </v-card>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useOrderStore } from "@/stores/orderStore";
import OrderDialog from "./OrderDialog.vue";
import LoadingComponent from "./LoadingComponent.vue";
import FilterPanel from "./FilterPanel.vue";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import Swal from "sweetalert";

export default {
  components: { OrderDialog, LoadingComponent, FilterPanel },
  data: () => ({
    loading: false,
    dialogVisible: false,
    dialogMode: "create",
    selectedOrder: {},
    activeFilters: { search: "", status: "All", dates: [] },
    headers: [
      { text: "Order No.", value: "id" },
      { text: "Order Date", value: "orderedAt" },
      { text: "Product", value: "productName" },
      { text: "Qty", value: "qty", align: "center" },
      { text: "Price", value: "unitPrice", align: "end" },
      { text: "Total", value: "total", align: "end" },
      { text: "Status", value: "status", align: "center" },
      { text: "Action", value: "action", sortable: false, align: "center" },
    ],
  }),
  computed: {
    ...mapState(useOrderStore, ["orders", "products"]),
    ordersWithProduct() {
      return this.orders.map((o) => {
        const p = this.products.find((prod) => prod.id === o.productId);
        return {
          ...o,
          productName: p?.title || "-",
          category: p?.category || "-",
        };
      });
    },
    filteredOrders() {
      let result = [...this.ordersWithProduct];
      const { search, status, dates } = this.activeFilters;

      if (search) {
        const s = search.toLowerCase();
        result = result.filter(
          (o) =>
            o.id.toLowerCase().includes(s) ||
            o.productName.toLowerCase().includes(s),
        );
      }
      if (status && status !== "All") {
        result = result.filter((o) => o.status === status);
      }
      if (dates && dates.length === 2) {
        const [start, end] = [...dates].sort();
        result = result.filter((o) => {
          const orderDate = dayjs(o.orderedAt).format("YYYY-MM-DD");
          return orderDate >= start && orderDate <= end;
        });
      }
      return result;
    },
    orderSearchList() {
      const ids = this.orders.map((o) => o.id);
      const names = this.ordersWithProduct.map((o) => o.productName);
      return [...new Set([...ids, ...names])];
    },
    orderStore() {
      return useOrderStore();
    },
  },
  methods: {
    ...mapActions(useOrderStore, ["deleteOrder", "updateOrder", "addOrder"]),

    updateFilters(newFilters) {
      this.activeFilters = newFilters;
    },

    formatDate(date) {
      return date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-";
    },

    getStatusColor(s) {
      const colors = {
        Pending: "orange",
        Shipped: "blue",
        Delivered: "green",
        Cancelled: "red",
      };
      return colors[s] || "grey";
    },

    prepareExportData() {
      return this.filteredOrders.map((o) => ({
        "Order No.": o.id,
        "Order Date": dayjs(o.orderedAt).format("YYYY-MM-DD HH:mm"),
        "Product Name": o.productName,
        Category: o.category,
        Quantity: o.qty,
        "Unit Price": o.unitPrice,
        "Total Amount": o.qty * o.unitPrice,
        Status: o.status,
      }));
    },

    exportCSV() {
      const data = this.prepareExportData();
      if (!data.length) return alert("No information available");
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((item) =>
        Object.values(item)
          .map((val) => `"${val}"`)
          .join(","),
      );
      const csvContent = "\uFEFF" + [headers, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `orders_${dayjs().format("YYYYMMDD")}. csv`;
      link.click();
      this.orderStore.showNotify(
        "The CSV file has been downloaded successfully",
        "success",
      );
    },

    exportExcel() {
      const data = this.prepareExportData();
      if (!data.length) return alert("No information available");

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Orders");
      XLSX.writeFile(wb, `orders_report_${dayjs().format("YYYYMMDD")}.xlsx`);
      this.orderStore.showNotify(
        "The Excel file has been downloaded successfully",
        "success",
      );
    },

    // confirmDelete(id) {
    //   if (confirm('Delete Order ' + id + '?')) this.deleteOrder(id)
    // },

    async confirmDelete(id) {
      const willDelete = await Swal({
        title: "ConfirmDelete?",
        text: `Do you want to delete the item : ${id} is it righ?`,
        icon: "warning",
        buttons: {
          cancel: "Cancel",
          confirm: {
            text: "Confirm!",
            value: true,
            className: "red",
          },
        },
        dangerMode: true,
      });

      if (willDelete) {
        this.deleteOrder(id);
        Swal(
          "Delete successful!",
          "The order has been moved to the trash",
          "success",
        );
      }
    },

    openEditDialog(item) {
      this.dialogMode = "edit";
      this.selectedOrder = { ...item };
      this.dialogVisible = true;
    },

    handleSaveOrder(payload) {
      if (this.dialogMode === "create") this.addOrder(payload);
      else this.updateOrder(payload.id, payload);
    },
  },
};
</script>
