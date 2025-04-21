<template>
    <Pie :data="chartData" :options="chartOptions" />
  </template>
  
  <script>
  import { Pie } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
  export default {
    name: "PieChart",
    components: {
      Pie,
    },
    data() {
      return {
        chartData: {
          labels: ["Access Point Fibre", "Interconnection Point"],
          datasets: [
            {
              data: [17, 10],
              backgroundColor: [
                "linear-gradient(180deg, #F8AC57 0%, #BE753E 100%)",
                "linear-gradient(180deg, #00727E 0%, #003038 100%)",
              ],
              backgroundColor: ["#F8AC57", "#00727E"],
            },
          ],
        },
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      };
    },
  };
  </script>
  