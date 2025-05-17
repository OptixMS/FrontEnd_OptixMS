<template>
  <div class="site-device-page font-poppins text-white">
    <!-- Header -->
    <div class="cardheader">
      <router-link to="/dashboard">
        <img src="@/assets/img/back.png" alt="Back" class="back-button" />
      </router-link>
    </div>

    <div class="container">
      <!-- Section Title -->
      <div class="section-title">About Site Device</div>

      <!-- Chart & Legend -->
      <div class="card chart-section">
        <div class="legend">
          <div class="legend-item">
            <div class="circle bg-blue"></div>
            <span>Interconnection Point</span>
          </div>
          <div class="legend-item">
            <div class="circle bg-orange"></div>
            <span>Terminal Point</span>
          </div>
        </div>

        <div class="chart sizemap">
          <PieChart />
        </div>

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

      <!-- Device Tables -->
      <div
        v-for="(table, index) in deviceTables"
        :key="index"
        class="card"
      >
        <h2 class="table-title">{{ table.title }}</h2>
        <table class="device-table">
          <thead>
            <tr>
              <th class="rounded-tl">Device</th>
              <th>Type</th>
              <th class="rounded-tr">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in table.rows" :key="i">
              <td>{{ row.device }}</td>
              <td>{{ row.type }}</td>
              <td>{{ row.location }}</td>
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
  components: { PieChart },
  data() {
    return {
      deviceTables: [
        {
          title: "P4 Detail",
          rows: [
            { device: "Microwave", type: "OptiX RTN 980L", location: "Long Bagun, Sendawar" },
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800", location: "Long Bagun, Sendawar" },
            { device: "8 Repeater", type: "OptiX OSN 980L", location: "Between Long Bagun and Sendawar" }
          ]
        },
        {
          title: "P5 Detail",
          rows: [
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800 U16", location: "Tentena & Bungku" },
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800", location: "Kendari, Petasia, & Wanggudu" }
          ]
        },
        {
          title: "P6 Detail",
          rows: [
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800", location: "Buranga, Bau-Bau, Lakudo, Wawonii, Sawerigadi, & Raha" }
          ]
        },
        {
          title: "P7 Detail",
          rows: [
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800 U16L", location: "Luwuk" },
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800", location: "Banggai, Sanana, Salakan, & Taliabu" }
          ]
        },
        {
          title: "P8 Detail",
          rows: [
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800 U16", location: "Ondong" },
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800", location: "Manado, Tobelo, Morotai, & Tahuna" }
          ]
        },
        {
          title: "P8A Detail",
          rows: [
            { device: "Optical Terminal Multiplexer (OTM)", type: "OptiX OSN 9800 U16", location: "Sofifi, Ternate, & Tidore" }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.site-device-page {
  background-color: #4f4f4f;
  min-height: 100vh;
  padding: 2rem 4vw;
  box-sizing: border-box;
  color: white;
  overflow-x: hidden;
  padding: 0 4vw 4rem;
}

.cardheader {
  background-color: #4f4f4f;
  padding: 1rem 3rem;
  height: 76px;
  width: calc(100% + 10vw); /* 8vw untuk mengimbangi padding kiri + kanan parent */
  margin-left: -4vw; /* kompensasi padding parent agar sejajar kiri */
  margin-right: -4vw; /* opsional: kalau butuh konsisten ke kanan */
  border-bottom: 1.3px solid rgba(62, 62, 62, 0.9); /* hanya bawah dan 90% opacity */
  margin-bottom: 2rem;
  opacity: 0.9;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;
  overflow-x: hidden;
}

.back-button {
  height: 35px;
  cursor: pointer;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1rem;
}

/* Section Title */
.section-title {
  background-color: #2f2f2f;
  border-radius: 0.75rem;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

/* Card Container */
.card {
  background-color: #2f2f2f;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* Legend & Chart */
.chart-section {
  flex-direction: column;
}

@media (min-width: 1024px) {
  .chart-section {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

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

.circle,
.circlesite {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

.bg-blue,
.bg-blues {
  background: linear-gradient(to bottom, #00727E, #003038);
}

.bg-orange,
.bg-oranges {
  background: linear-gradient(to bottom, #F8AC57, #BE753E);
}

.count-label {
  font-size: 1.125rem;
  font-weight: 600;
}

.sizemap {
  width: 250px;
  height: 250px;
  margin-right: 8rem;
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
  table-layout: fixed;
}

.device-table th,
.device-table td {
  padding: 0.75rem 1rem;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
}

.device-table th:nth-child(1),
.device-table td:nth-child(1) {
  width: 35%;
}

device-table th:nth-child(2),
.device-table td:nth-child(2) {
  width: 30%;
}

.device-table th:nth-child(3),
.device-table td:nth-child(3) {
  width: 35%;
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

/* Optional: hide for small screen if ever needed */
@media (max-width: 1023px) {
  body {
    display: none;
  }
}
</style>
