import { defineStore } from "pinia";
import Swal from "sweetalert";
import swal from "sweetalert";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    products: [],
    loading: false,
    lastOrderNumber: 0,
    deletedOrders: [],
    snackbar: {
      show: false,
      text: "",
      color: "success",
    },
  }),

  getters: {
    nextOrderId: (state) => {
      const next = state.lastOrderNumber + 1;
      return `ORD-${String(next).padStart(3, "0")}`;
    },
  },

  actions: {
    setProducts(products) {
      this.products = products;
      this.syncStock();
    },

    syncStock() {
      this.orders.forEach((order) => {
        const product = this.products.find((p) => p.id === order.productId);
        if (product) {
          product.stock = Math.max(0, product.stock - order.qty);
        }
      });
    },

    decreaseStock(productId, qty) {
      const p = this.products.find((p) => p.id === productId);
      if (p) p.stock = Math.max(0, p.stock - qty);
    },

    increaseStock(productId, qty) {
      const p = this.products.find((p) => p.id === productId);
      if (p) p.stock += qty;
    },

    addOrder(order) {
      this.lastOrderNumber++;
      this.orders.push({
        ...order,
        id: `ORD-${String(this.lastOrderNumber).padStart(3, "0")}`,
      });
      this.decreaseStock(order.productId, order.qty);
      this.showNotify("Order succeaafully created.!");
    },

    updateOrder(id, newData) {
      const old = this.orders.find((o) => o.id === id);
      if (!old) return;

      const diff = newData.qty - old.qty;
      if (diff > 0) this.decreaseStock(old.productId, diff);
      if (diff < 0) this.increaseStock(old.productId, Math.abs(diff));

      Object.assign(old, newData);
      this.showNotify("Order succeaafully updeted.!");
    },

    deleteOrder(id) {
      const index = this.orders.findIndex((o) => o.id === id);
      if (index !== -1) {
        const order = this.orders[index];

        this.increaseStock(order.productId, order.qty);

        this.deletedOrders.push({
          ...order,
          deletedAt: new Date().toISOString(),
        });

        this.orders.splice(index, 1);
      }
      this.showNotify("The order has been moved to the trash.", "warning");
    },

    async restoreOrder(id) {
      const willRestore = await swal({
        title: "Confirm recovery?",
        text: `Do you want to recover order ${id} is it righ?`,
        icon: "info",
        buttons: {
          cancel: "Cancel",
          confirm: {
            text: "Confirm!",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      });

      if (willRestore) {
        const index = this.deletedOrders.findIndex((o) => o.id === id);
        if (index !== -1) {
          const order = this.deletedOrders[index];
          this.orders.push(order);
          this.decreaseStock(order.productId, order.qty);
          this.deletedOrders.splice(index, 1);

          swal("Recover successful!", `Order ${id} `, "success");
        }
      }
    }, //กู้คืน

    async removePermanent(id) {
      const isConfirmed = await swal({
        title: "Confirm Permnently item delete?",
        text: `Do you want to delete the entry with the ID : ${id} is it righ? (This action is irreversible)`,
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancel",
            visible: true,
            closeModal: true,
          },
          confirm: {
            text: "Confirm Delete!",
            value: true,
            visible: true,
            className: "red",
            closeModal: true,
          },
        },
        dangerMode: true,
      });

      if (isConfirmed) {
        this.deletedOrders = this.deletedOrders.filter(
          (order) => order.id !== id,
        );
        swal(
          "Data successful!",
          `The entry with code : ${id} has been permanently delete from the system`,
          "success",
        );
      }
    }, //ลบถาวร1ายการ

    async clearDeletedHistory() {
      const willDelete = await Swal({
        title: "Confirm Permnently delete?",
        text: "All deleted history will be lost and cannot be recover!",
        icon: "warning",
        buttons: {
          cancel: "Cancl",
          confirm: {
            text: "Confirm!",
            value: true,
            visible: true,
            className: "red",
            closeModal: true,
          },
        },
        dangerMode: true,
      });

      if (willDelete) {
        this.deletedOrders = [];

        swal("Delete successful!", "success");
      }
    }, //ลบถาวรทั้งตาราง
    
    showNotify(text, color = "success") {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },

  persist: {
    key: "app_orders",
    storage: localStorage,
    paths: ["orders", "products", "deletedOrders", "lastOrderNumber"],
  },
});
