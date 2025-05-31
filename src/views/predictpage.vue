<template>
  <div class="predict-wrapper">
    <Sidebar />

    <div class="predict-page font-poppins text-white bg-[#3e3e3e] min-h-screen p-8">
      <div class="cardheader"></div>

      <div class="top-title">Top Predict Result</div>

      <div v-if="!hasPredictionData" class="info-message text-center mt-8">
        Tidak ada hasil prediksi terbaru. Silakan buat prediksi baru di Dashboard.
      </div>

      <div v-else>
        <div class="content-no-main-card">
          <div class="top-results-grid">
            <div class="result-card card-dark-bg">
              <h2 class="card-titlesv">Severity Result</h2>
              <div class="gauge-chart-container">
                <GaugeChart v-if="severity !== null" :value="severity" />
                <p class="gauge-text-result">Result of severity is</p>
                <p class="gauge-text-label cursor-pointer" @click="showPopup = true; currentPopupSeverity = severity;">
                  {{ severityLabel }}
                </p>
              </div>
            </div>

            <div class="result-card card-dark-bg">
              <h2 class="card-title">Location Result</h2>
              <img v-if="mapImage" :src="mapImage" :alt="displayLocation + ' Map'" class="map-img" />
              <p class="location-label">{{ displayLocation }}</p>
            </div>
          </div>

          <div class="bottom-info-grid">
            <div class="result-card-small card-dark-bg">
              <h2 class="bottom-title">Predict Date</h2>
              <p class="bottom-value">{{ predictDate }}</p>
            </div>
            <div class="result-card-small card-dark-bg">
              <h2 class="bottom-title">Alarm ID Result</h2>
              <p class="bottom-value">{{ alarmId }}</p>
            </div>
          </div>
        </div>

        <div class="export-container">
          <button class="export-button" @click="exportLatestPredictResult">Export Latest Result</button>
          <p v-if="exportMessage" :class="exportMessageClass" class="mt-2 text-center">{{ exportMessage }}</p>
        </div>
      </div>

      <transition name="fade">
        <div v-if="showPopup" class="popup-overlay" @click.self="showPopup = false">
          <div class="popup-card">
            <h2 class="popup-title">{{ severityInfo(currentPopupSeverity).title }} Severity</h2>
            <p class="popup-message" style="white-space: pre-line">{{ severityInfo(currentPopupSeverity).message }}</p>
            <button class="popup-close" @click="showPopup = false">Close</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import GaugeChart from '@/components/GaugeChart.vue';
import Sidebar from '@/components/sidebar.vue';

const router = useRouter();

const severity = ref(null);
const severityLabel = ref('');
const location = ref('');
const predictDate = ref('');
const alarmId = ref('');
const showPopup = ref(false);
const currentPopupSeverity = ref(null);

const exportMessage = ref('');
const exportMessageClass = ref('');

const hasPredictionData = computed(() => severity.value !== null);

const siteNames = [
  "Banggai", "Bau-Bau", "Kendari", "Manado", "Sofifi", "Luwuk", "Long Bagun",
  "Tobelo", "Ternate", "Tentena", "Salakan", "Sanana", "Sendawar", "Taliabu",
  "Bungku", "Ondong", "Morotai", "Melonguane", "Lakudo", "Buranga", "Petasia",
  "Raha", "Sawerigadi", "Tahuna", "Tidore", "Wanggudu", "Wawonii"
];

function extractLocationNameFromList(fullLocationString) {
  if (!fullLocationString) return 'Unknown Location';

  const lowerCaseFullString = fullLocationString.toLowerCase();

  for (const site of siteNames) {
    if (lowerCaseFullString.includes(site.toLowerCase())) {
      return site;
    }
  }
  return 'Unknown Location';
}

const displayLocation = computed(() => {
  return extractLocationNameFromList(location.value);
});


function mapSeverity(val) {
  const severityMap = ['Minor', 'Major', 'Warning', 'Critical'];
  const idx = parseInt(val);
  return severityMap[idx] || 'Unknown';
}

const mapImage = computed(() => {
  const extractedName = extractLocationNameFromList(location.value);
  if (!extractedName || extractedName === 'Unknown Location') return '';

  try {
    return new URL(`../assets/maps/${extractedName}.png`, import.meta.url).href;
  } catch (e) {
    console.error(`Error loading map image for ${extractedName}. File might not exist.`, e);
    return '';
  }
});

const severityInfo = (severityValue) => {
  const label = mapSeverity(severityValue);
  const infoMap = {
    Minor: {
      title: "Minor",
      message: "Jenis: Alarm ringan, tidak berdampak langsung ke layanan.\nRekomendasi: Lakukan pemeriksaan rutin."
    },
    Major: {
      title: "Major",
      message: "Gangguan signifikan, berdampak pada perangkat.\nContoh: FAN_FAIL, BD_STATUS.\nRekomendasi: Periksa modul perangkat keras segera."
    },
    Warning: {
      title: "Warning",
      message: "Peringatan awal kondisi abnormal.\nContoh: TEMP_WARN, BAT_WARN.\nRekomendasi: Pantau lebih lanjut, siapkan tindakan preventif."
    },
    Critical: {
      title: "Critical",
      message: "Alarm darurat, berdampak langsung pada layanan.\nContoh: ETH_LINK_DOWN, BUS_ERR.\nRekomendasi: Lakukan penanganan segera!"
    }
  };
  return infoMap[label] || { title: "Unknown", message: "Tidak ada informasi." };
};

async function exportLatestPredictResult() {
  exportMessage.value = '';
  exportMessageClass.value = '';

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username'); // Mengambil username dari localStorage

  // ✅ PENTING: Periksa user secara eksplisit di sini
  if (!user || user === 'undefined' || !token || token === 'undefined') {
    exportMessage.value = 'Anda belum login atau sesi tidak valid. Mohon login untuk export.';
    exportMessageClass.value = 'error-message';
    setTimeout(() => { router.push('/login'); }, 1500);
    return;
  }

  const latestPredictionData = localStorage.getItem('latestPrediction');
  const allPredictionRows = localStorage.getItem('predictionResults');

  if (!latestPredictionData || !hasPredictionData.value || !allPredictionRows) {
    exportMessage.value = 'Tidak ada hasil prediksi terbaru yang bisa diexport.';
    exportMessageClass.value = 'info-message';
    return;
  }

  try {
    exportMessage.value = 'Mempersiapkan export hasil prediksi terkini...';
    exportMessageClass.value = 'info-message';

    const baseUrl = import.meta.env.VITE_API_URL;
    const parsedAllRows = JSON.parse(allPredictionRows);

    const dataToSend = {
      prediction_results: parsedAllRows,
      prediction_date: predictDate.value
    };

    console.log('DEBUG: Data yang dikirim ke backend untuk export predict:', dataToSend);
    console.log('DEBUG: URL Export Predict:', `${baseUrl}/api/${user}/exportpredict`); // Log URL final

    // ✅ PERBAIKAN PENTING DI URL INI: MENGGUNAKAN user (username) DARI localStorage
    const response = await fetch(`${baseUrl}/api/${user}/exportpredict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      let errorMessage = 'Gagal mengekspor data.';
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      } else if (response.statusText) {
        errorMessage = response.statusText;
      }
      throw { status: response.status, message: errorMessage };
    }

    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'latest_prediction_export.csv';
    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
      const filenameMatch = contentDisposition.match(/filename="([^"]*)"/);
      if (filenameMatch && filenameMatch[1]) {
        filename = decodeURIComponent(filenameMatch[1]);
      }
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    exportMessage.value = 'File berhasil diunduh!';
    exportMessageClass.value = 'success-message';

  } catch (err) {
    console.error('❌ Error saat export prediksi terkini:', err);
    let displayMessage = 'Gagal melakukan export prediksi terkini.';
    if (err.status) {
      displayMessage = `Error ${err.status}: ${err.message}`;
      if (err.status === 401 || err.status === 403) {
        displayMessage = 'Sesi Anda tidak valid. Mohon login kembali.';
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        router.push('/login');
      } else if (err.status === 400) {
        displayMessage = `Permintaan export tidak valid: ${err.message}.`;
      }
    } else if (err.message && err.message.includes("Failed to fetch")) {
      displayMessage = 'Terjadi kesalahan jaringan saat export prediksi terkini. Mohon periksa koneksi Anda.';
    } else {
      displayMessage = 'Terjadi kesalahan saat membuat prediksi.';
    }
    exportMessage.value = displayMessage;
    exportMessageClass.value = 'error-message';
  }
}

onMounted(() => {
  const storedLatestPrediction = localStorage.getItem('latestPrediction');
  if (storedLatestPrediction) {
    try {
      const parsedData = JSON.parse(storedLatestPrediction);
      if (parsedData) {
        severity.value = parsedData.severity;
        severityLabel.value = mapSeverity(parsedData.severity);
        location.value = parsedData.location;
        predictDate.value = parsedData.predict_date;
        alarmId.value = parsedData.alarm_id;
      }
    } catch (e) {
      console.error("Error parsing latestPrediction from localStorage:", e);
      severity.value = null;
    }
  } else {
    severity.value = null;
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.predict-wrapper {
  display: flex;
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
  margin-left: 64px;
  width: calc(100% - 64px);
}

.cardheader {
  background-color: #4f4f4f;
  padding: 1rem 3rem;
  height: 76px;
  width: calc(100% + 10vw);
  margin-left: -4vw;
  margin-right: -4vw;
  border-bottom: 2px solid rgba(62, 62, 62, 0.9);
  margin-bottom: 2rem;
  opacity: 0.9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow-x: hidden;
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1rem;
}

.content-no-main-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 795px;
  margin: 0 auto;
}

.top-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
}

.result-card {
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  min-height: 20rem;
}

.card-dark-bg {
    background-color: #2f2f2f !important;
}

.card-titlesv {
  font-weight: 700;
  margin-bottom: 5.3rem;
  font-size: 1.2rem;
  margin-top: -0.1rem;
}

.gauge-chart-container {
  margin-top: -30px;
  margin-bottom: -10px;
}

.gauge-text-result {
  font-size: 1rem;
  margin-top: 0.5rem;
}

.gauge-text-label {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: underline;
  margin-top: 3rem;
}

.card-title {
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.2rem;
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
  margin-top: 0.5rem;
}

.bottom-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
}

.result-card-small {
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100px;
}

.bottom-title {
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0rem; /* diperkecil dari 0.5rem */
}

.bottom-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: -0.1rem;
  text-decoration: underline;
}

.export-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-card {
  background: linear-gradient(to right, #f6ad55, #ed8936);
  color: #222;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.popup-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.popup-message {
  font-size: 1.4rem;
  margin-bottom: 2rem;
}

.popup-close {
  background: #2a2a2a;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

/* Transisi */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Styling untuk pesan */
.info-message {
  color: #00879E;
}

.error-message {
  color: #f8ac57;
}

.success-message {
  color: #4CAF50;
}
</style>