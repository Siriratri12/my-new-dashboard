<template>
  <v-card class="pa-4">
    <canvas
      ref="carCanvas"
      width="400"
      height="200"
      style="border:1px solid #ccc; cursor:pointer;"
      @click="toggleWheel"
    ></canvas>
  </v-card>
</template>

<script>
export default {
  name: "ChildCarComponent",

  props: {
    color: {
      type: String,
      required: true
    },
    wheelsColor: {
      type: String,
      required: true
    },
    carName: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      wheelRotation: 0,
      isRunning: false,
      intervalId: null
    };
  },

  mounted() {
    this.drawCar();
  },

  methods: {
    toggleWheel() {
      if (!this.isRunning) {
        this.startWheel();
      } else {
        this.stopWheel();
      }
    },

    startWheel() {
      this.isRunning = true;
      this.$emit("wheelStatus", "running"); // ส่ง status ไป parent

      this.intervalId = setInterval(() => {
        this.wheelRotation += 0.2;
        this.drawCar();
      }, 30);
    },

    stopWheel() {
      this.isRunning = false;
      this.$emit("wheelStatus", "stop"); // ส่ง status ไป parent

      clearInterval(this.intervalId);
      this.intervalId = null;
    },

    drawCar() {
      const canvas = this.$refs.carCanvas;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ตัวถังรถ
      ctx.fillStyle = this.color;
      ctx.fillRect(80, 80, 240, 40);  // ฐาน
      ctx.fillRect(130, 50, 140, 40); // หลังคา

      // ชื่อบนตัวถัง
      ctx.fillStyle = "#ffffff";
      ctx.font = "18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(this.carName, 200, 105);

      // วาดล้อ
      this.drawWheel(ctx, 150, 130, 20, this.wheelRotation);
      this.drawWheel(ctx, 260, 130, 20, this.wheelRotation);
    },

    drawWheel(ctx, x, y, radius, rotation) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.beginPath();
      ctx.fillStyle = this.wheelsColor;
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      // วาดซี่ล้อเพื่อเห็นการหมุน
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.stroke();
        ctx.rotate((Math.PI * 2) / 3);
      }

      ctx.restore();
    }
  }
};
</script>
