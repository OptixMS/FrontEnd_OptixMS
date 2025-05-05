<template>
  <div class="site-device-page font-poppins text-white">
    <div class="cardheader">
    <!-- Back Button -->
    <router-link to="/dashboard" class="back-button">
      <img src="@/assets/img/back.png" alt="Back" class="back-button" />
    </router-link>
    </div>

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
            <div class="circlesite bg-blues"></div>
            <span class="count-label">10 Site</span>
          </div>
          <div class="legend-item">
            <div class="circlesite bg-oranges"></div>
            <span class="count-label">17 Site</span>
          </div>
        </div>
      </div>

      <!-- Device Table P4 -->
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
            <tr>
              <td>8 Repeater</td>
              <td>OptiX OSN 980L</td>
              <td>All Site in P4</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Device Table P5 -->
      <div class="card">
        <h2 class="table-title">P5 Detail</h2>
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
              <td>Optical Terminal Multiplexer (OTM)</td>
              <td>OptiX OSN 9800 U16</td>
              <td>Tentena & Bungku</td>
            </tr>
            <tr>
              <td>Optical Terminal Multiplexer (OTM)</td>
              <td>OptiX OSN 9800</td>
              <td>Kendari, Petasia, & Wanggudu</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Device Table P6 -->
      <div class="card">
        <h2 class="table-title">P6 Detail</h2>
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
              <td>Optical Terminal Multiplexer (OTM)</td>
              <td>OptiX OSN 9800</td>
              <td>Buranga, Bau-Bau, Lakudo, Wawonii, Sawerigadi, & Raha</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Device Table P7 -->
      <div class="card">
        <h2 class="table-title">P7 Detail</h2>
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
              <td>Optical Terminal Multiplexer (OTM)</td>
              <td>OptiX RTN 980L</td>
              <td>Luwuk</td>
            </tr>
            <tr>
              <td>Optical Terminal Multiplexer (OTM)</td>
              <td>OptiX OSN 9800</td>
              <td>Banggai, Sanana, Salakan, & Taliabu</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Device Table P8 -->
      <div class="card">
        <h2 class="table-title">P8 Detail</h2>
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

      <!-- Device Table P8A -->
      <div class="card">
        <h2 class="table-title">P8A Detail</h2>
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

.cardheader {
  background-color: #3a3a3a;
  border-radius: 0;
  padding: 1rem 2rem; /* padding horizontal */
  height: 50px;
  width: 1120px;
  box-shadow: inset 0 0 0 1px #292929;
  opacity: 0.9;
  margin-left: -20px;
  margin-bottom: -25px;
  margin-top: -35px;
  display: flex;
  flex-direction: row; /* ini diubah ke row! */
  align-items: center;
  justify-content: space-between;
  }

.site-device-page {
  background-color: #3a3a3a;
  min-height: 100vh;
  padding: 2rem 1rem;
  position: relative;
}

.back-button {
  height: 40px;
  margin-left: 1rem;
  margin-bottom: 0rem;
  margin-top: 0rem;
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
  background-color: #2f2f2f;
  color:#ffffff;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.25rem;
  width: 1013px;
  margin-left: 2.6rem;
}

/* Card styling */
.card {
  background-color: #2f2f2f;
  color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 1000px;
  margin-left: 2.6rem;
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
  margin-left: 3.5rem;
  
}

.circle {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
}

.circlesite { /* for site */
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  margin-left: -10rem;
}

.bg-blue {
  background: linear-gradient(to bottom, #00727E, #003038);
}

.bg-orange {
  background: linear-gradient(to bottom, #F8AC57, #BE753E);
}

.bg-blues { /* for site */
  background: linear-gradient(to bottom, #00727E, #003038);
  margin-right: 1rem;
}

.bg-oranges { /* for site */
  background: linear-gradient(to bottom, #F8AC57, #BE753E);
  margin-right: 1rem;
}

.count-label {
  font-size: 1.125rem;
  font-weight: 600;
}

/* Chart size */
.sizemap {
  width: 250px;
  height: 250px;
  margin-left: -10rem;
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
