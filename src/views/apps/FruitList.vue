<template>
  <v-container>
    <h2 class="mb-4">รายการผลไม้</h2>

    <v-simple-table>
      <thead>
        <tr>
          <th>ชื่อผลไม้</th>
          <th>รายละเอียด</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="fruit in fruits" :key="fruit.id">
          <td>{{ fruit.name }}</td>
          <td>
            <v-btn small color="primary" @click="openDialog(fruit)">
              รายละเอียด
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <FruitDialog
      :show="dialog"
      :fruit="selectedFruit"
      @close="dialog = false"
    />
  </v-container>
</template>

<script>
import FruitDialog from "@/components/app/example/FruitDialog.vue";
import { fruits } from "@/data/fruit.js";

export default {
  components: { FruitDialog },

  data() {
    return {
      dialog: false,
      selectedFruit: null,
      fruits,
    };
  },

  methods: {
    openDialog(fruit) {
      this.selectedFruit = fruit;
      this.dialog = true;
    }
  }
};
</script>
