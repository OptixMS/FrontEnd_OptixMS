<template>
  <div class="predict-page font-poppins">
    <!-- Header -->
    <div class="cardheader">
      <router-link to="/dashboard">
        <img src="@/assets/img/back.png" alt="Back" class="icon-button" />
      </router-link>
    </div>

    <!-- Title -->
    <div class="top-title">Top Predict Result</div>

    <!-- Main Grid -->
    <div class="result-grid">
      <!-- Severity Result -->
      <div class="card">
        <h2 class="card-titlesv">Severity Result</h2>
        <div class="gauge-chart">
           <GaugeChart :value="3" />
      <p>Result of severity is</p>
      <p class="severity-label">Major</p>
      </div>
    </div>

      <!-- Location Result -->
      <div class="card">
        <h2 class="card-title">Location Result</h2>
        <img src="@/assets/img/mapsres.png" alt="Map" class="map-img" />
        <p class="location-label">Manado</p>
      </div>
    </div>

    <!-- Bottom Grid Info -->
    <div class="bottom-grid">
      <div class="cardbottom">
        <h2 class="bottom-title">Predict Date</h2>
        <p class="bottom-value">15 May 2025</p>
      </div>
      <div class="cardbottom">
        <h2 class="bottom-title">Alarm ID Result</h2>
        <p class="bottom-value">Relay Alarm Minor</p>
      </div>
    </div>

    <!-- Export Button -->
    <div class="export-container">
      <button class="export-button">Export All Result</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import GaugeChart from '@/components/GaugeChart.vue'

const severity = ref(0)
const severityLabel = ref('')
const location = ref('')
const predictDate = ref('')
const alarmId = ref('')

const route = useRoute()

// Dapatkan data hasil prediksi
onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/predict/latest`)
    const data = response.data

    severity.value = data.severity // asumsi angka 0–3
    severityLabel.value = mapSeverity(data.severity)
    location.value = data.location
    predictDate.value = data.date
    alarmId.value = data.alarm_id
  } catch (err) {
    console.error('Gagal ambil data prediksi:', err)
  }
})

function mapSeverity(val) {
  return ['Minor', 'Major', 'Warning', 'Critical'][val] || 'Unknown'
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.predict-page {
  min-height: 100vh;
  width: 100%;
  background-color: #4f4f4f;
  color: white;
  padding: 2rem 4vw;
  box-sizing: border-box;
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

.icon-button {
  height: 35px;
  cursor: pointer;
}

.top-title {
  background: linear-gradient(to right, #f6ad55, #ed8936);
  color: black;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  border-radius: 8px;
  margin: 0 auto 1.5rem;
  max-width: 795px;

  /* Flexbox untuk vertikal center */
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2.5rem; /* atau sesuaikan tinggi yang pas */
  padding: 0 1rem; /* buang vertical padding */
}


.result-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.card {
  background-color: #2f2f2f;
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 350px;
  height: 20rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  margin-bottom: -0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cardbottom {
  background-color: #2f2f2f;
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 360px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertikal tengah */
  align-items: center;
  padding: 1.25rem; /* Sesuaikan jika perlu */
  height: 70px; /* Atur tinggi jika belum */
}

.card-titlesv {
  font-weight: 700;
  margin-bottom: 5.3rem;
  font-size: 1.2rem;
  margin-top: -0.1rem;
}

.card-title {
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.gauge-chart {
  margin-top: -40px;
  margin-bottom: -10px;
}

.gauge-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10rem; /* Besar angka */
  font-weight: bold;
  color: white;
}

.gauge-svg {
  width: 200px;
  height: 100px;
}

.gauge-wrapper {
  position: relative;
  width: 150px;
  height: 75px;
  overflow: hidden;
}

.gauge-base {
  position: absolute;
  width: 100%;
  height: 100%;
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
  background-color: #3e3e3e; /* background gauge */
}

.gauge-fill {
  position: absolute;
  width: 100%;
  height: 100%;
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
  background: linear-gradient(to right, #f6ad55, #ed8936);
  clip-path: inset(0 50% 0 0); /* adjust 50% to control fill */
}


.severity-label {
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: underline;
  margin-top: 3rem;
}

.map-img {
  width: 104%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
  margin-bottom: 0.5rem;
}

.location-label {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: underline;
  margin-top: 0;
}

.bottom-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.bottom-title {
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: -0.8rem; /* diperkecil dari 0.5rem */
}

.bottom-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-decoration: underline;
}

.export-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.export-button {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  background: linear-gradient(to right, #00727E, #003038);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}
</style>
