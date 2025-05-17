<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController);

export default {
  name: "PieChart",
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.setupChart();
  },
  methods: {
    setupChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");

      // Buat gradasi orange
      const gradientOrange = ctx.createLinearGradient(0, 0, 0, 400);
      gradientOrange.addColorStop(0, "#F8AC57");
      gradientOrange.addColorStop(1, "#BE753E");

      // Buat gradasi biru
      const gradientBlue = ctx.createLinearGradient(0, 0, 0, 400);
      gradientBlue.addColorStop(0, "#00727E");
      gradientBlue.addColorStop(1, "#003038");

      const data = {
        labels: ["Terminal Point", "Interconnection Point"],
        datasets: [
          {
            data: [17, 10],
            backgroundColor: [gradientOrange, gradientBlue],
            borderWidth: 0, // hilangkan border putih
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      };

      // Inisialisasi chart
      this.chart = new ChartJS(ctx, {
        type: "pie",
        data: data,
        options: options,
      });
    },
  },
};
</script>
