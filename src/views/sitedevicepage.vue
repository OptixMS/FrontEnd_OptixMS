<template>
  <div class="site-device-page font-poppins text-white">
    <!-- Back Button -->
    <router-link to="/dashboard" class="back-button">
      <img src="@/assets/img/back.png" alt="Back" class="w-6" />
    </router-link>

    <div class="container">
      <!-- Header -->
      <div class="section-title">About Site Device</div>

      <!-- Chart & Info Section -->
      <div class="card chart-section">
        <!-- Legend -->
        <div class="legend">
          <div class="legend-item">
            <div class="circle bg-blue"></div>
            <span>Interconnection Point</span>
          </div>
          <div class="legend-item">
            <div class="circle bg-orange"></div>
            <span>Access Point Fibre</span>
          </div>
        </div>

        <!-- Pie Chart -->
        <div class="chart sizemap">
          <PieChart />
        </div>

        <!-- Site Count -->
        <div class="site-count">
          <div class="legend-item">
            <div class="circle bg-blue"></div>
            <span class="count-label">10 Site</span>
          </div>
          <div class="legend-item">
            <div class="circle bg-orange"></div>
            <span class="count-label">17 Site</span>
          </div>
        </div>
      </div>

      <!-- Device Table -->
      <div class="card">
        <h2 class="table-title">P4 Detail</h2>
        <table class="device-table">
          <thead>
            <tr>
              <th class="rounded-tl">Device</th>
              <th>Type</th>
              <th class="rounded-tr">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Microwave</td>
              <td>OptiX RTN 980L</td>
              <td>Long Bagun, Sendawar</td>
            </tr>
            <tr>
              <td>Optical Terminal Multiplexer (OTM)</td>
              <td>OptiX OSN 9800</td>
              <td>Long Bagun, Sendawar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/chart.vue";

export default {
  name: "SiteDevicePage",
  components: {
    PieChart,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.site-device-page {
  background-color: #3a3a3a;
  min-height: 100vh;
  padding: 2rem 1rem;
  position: relative;
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 3rem;
}

/* Section title */
.section-title {
  background-color: #555;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.25rem;
}

/* Card styling */
.card {
  background-color: #444;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chart-section {
  flex-direction: column;
}

@media (min-width: 768px) {
  .chart-section {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

/* Legends */
.legend,
.site-count {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.circle {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
}

.bg-blue {
  background: linear-gradient(to bottom, #00727E, #003038);
}

.bg-orange {
  background: linear-gradient(to bottom, #F8AC57, #BE753E);
}

.count-label {
  font-size: 1.125rem;
  font-weight: 600;
}

/* Chart size */
.sizemap {
  width: 250px;
  height: 250px;
  margin: 0 auto;
}

/* Table */
.table-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.device-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.device-table th,
.device-table td {
  padding: 0.75rem 1rem;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
}

.device-table thead th {
  background-color: transparent;
  font-weight: 600;
}

.rounded-tl {
  border-top-left-radius: 0.5rem;
}

.rounded-tr {
  border-top-right-radius: 0.5rem;
}
</style>
