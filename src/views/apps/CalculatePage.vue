<template>
  <v-card elevation="2" class="my-5 mx-10">

    <pre class="pa-4">
      ค่า A = {{ a || 0 }}, ค่า B = {{ b || 0 }}
      ผลรวม (แสดงหลังจากคลิก) = {{ resultSum }}
    </pre>

    <v-dialog v-model="dialog" width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-5" color="primary" dark v-bind="attrs" v-on="on" @click="calculateSum">
          คำนวณผลรวม (Click Me)
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 primary lighten-2 white--text">
          ผลลัพธ์การคำนวณ
        </v-card-title>

        <v-card-text class="pt-4" id>
          <p>ค่า A: {{ a || 0 }}</p>
          <p>ค่า B: {{ b || 0 }}</p>
          <v-divider class="my-3"></v-divider>
          <p class="text-h6">ผลรวม: {{ resultSum }}</p>

          

          


        </v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-form @submit.prevent="calculateSum" class="pa-4">
      <v-text-field label="a" v-model.number="a" maxlength="7" @input="print('a', a)" counter outlined
        :rules="[rules.number]" hint="ใส่ตัวเลขสำหรับค่า A" persistent-hint></v-text-field>

      <v-text-field label="b" v-model.number="b" maxlength="7" @input="print('b', b)" counter outlined
        :rules="[rules.number]" hint="ใส่ตัวเลขสำหรับค่า B" persistent-hint></v-text-field>
    </v-form>

    <v-row>
            <v-col><v-data-table :headers="headers" :items="items" class="elevation-1">
          </v-data-table></v-col>
          </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'FormCalculationPage',
  data() {
    return {
      namePage: this.$route.name,
      routePage: this.$route.path,

      dialog: false,

      // Input models
      a: null,
      b: null,

      resultSum: 0,

      rules: {
        // number: v => (!!v && !isNaN(parseFloat(v))) || 'กรุณาใส่ตัวเลขเท่านั้น',
        number(v) {
          // eslint-disable-next-line no-debugger
          debugger
          return (!!v && !isNaN(parseFloat(v))) || 'กรุณาใส่ตัวเลขเท่านั้น';
        }
      },

      headers: [
        { text: 'วันที่', value: 'date' },
        { text: 'อุณหภูมิ (°C)', value: 'temperature' },
        { text: 'ความชื้น (%)', value: 'humidity' },
        { text: 'สถานะ', value: 'status' }
      ],
      items: [
        { date: '2025-01-01', temperature: 30, humidity: 55, status: 'ปกติ' },
        { date: '2025-01-02', temperature: 32, humidity: 60, status: 'ร้อน' },
        { date: '2025-01-03', temperature: 28, humidity: 50, status: 'เย็น' },
        { date: '2025-01-04', temperature: 31, humidity: 58, status: 'ปกติ' },
        { date: '2025-01-05', temperature: 33, humidity: 62, status: 'ร้อน' }
      ]

    };
  },

  mounted() { },
  computed: {
  },

  methods: {

    calculateSum() {
      const numA = parseFloat(this.a) || 0;
      const numB = parseFloat(this.b) || 0;

      this.resultSum = numA + numB;//คำนวณ

      this.dialog = true;
    },

    print(label, value) {
      console.log(`${label} ==> `, value);
    },
  },
};
</script>
