<template>
  <div class="min-h-screen w-full font-poppins bg-[#4f4f4f] py-6 text-white overflow-hidden">
    <div class="cardheader">
      <img src="@/assets/img/optimsnew.png" alt="OptixMS Logo" class="logo" />
      <img @click="goToProfile" src="@/assets/img/profils.png" alt="Profile" class="icon-profile" />
    </div>

    <div class="dashboard-layout">
      <div class="dashboard-column">
        <div @click="goToTemperature" class="card cardtemperature cursor-pointer">
          <h2 class="card-title">Site Temperature</h2>
          <img src="@/assets/img/temperatur.png" alt="Temperature Icon" class="size" />
        </div>

        <div @click="goToSite" class="card cardsite cursor-pointer">
          <h2 class="card-titlesite">Site Device</h2>
          <img src="@/assets/img/device.png" alt="Device" class="size" />
        </div>
      </div>

      <div class="dashboard-column center-col">
        <div class="card cardwelcome">
          <h2 class="card-title-welcome">
            Welcome, {{ username }}!
            <span v-if="showWave" class="wave-emoji">👋</span>
          </h2>
        </div>

        <div @click="goToMaps" class="card cardmaps cursor-pointer">
          <h2 class="card-titlemaps">Map of Site</h2>
          <img src="@/assets/img/mapDashboard.png" alt="Map" class="sizemap" />
        </div>

        <div
          class="cardpredict"
          style="background: linear-gradient(90deg, #00697C 0%, #FFAB5B 100%);"
        >
          <div class="predict-container">

            <div class="form-left">
              <div class="form-group">
                <label for="fileInput" class="floating-label">Input File</label>
                <input
                  id="fileInput"
                  type="file"
                  class="custom-input input-file"
                  @change="handleFileChange"
                />
              </div>

              <div class="form-group">
                <input
                  id="dateInput"
                  type="date"
                  class="custom-input input-date"
                  v-model="selectedDate"
                  :min="minDate"
                  :max="maxDate"
                />
                <label for="dateInput" class="floating-label">Input Date</label>
              </div>
            </div>

            <div class="form-right">
              <button @click="handlePredict" class="predict-button cursor-pointer">
                Predict Now
              </button>
            </div>
          </div>
          <p v-if="predictionMessage" :class="predictionMessageClass" class="mt-4 text-center">{{ predictionMessage }}</p>
        </div>
      </div>

      <div class="dashboard-column">
        <div @click="goToAbout" class="card cardabout cursor-pointer">
          <h2 class="card-titleabout">About & Credit</h2>
          <img src="@/assets/img/aboutLogo.png" alt="About" class="size" />
        </div>

        <div @click="goToHistory" class="card cardhistory cursor-pointer">
          <h2 class="card-titlehistory">History</h2>
          <img src="@/assets/img/history.png" alt="History" class="size" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const selectedDate = ref('')
const selectedFile = ref(null)
const showWave = ref(false)
const predictionMessage = ref('');
const predictionMessageClass = ref('');
const router = useRouter()

// State untuk feedback API Dashboard
const loadingDashboard = ref(true); // State loading untuk data dashboard
const errorDashboard = ref('');    // State error untuk data dashboard

const baseUrl = import.meta.env.VITE_API_URL
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

onMounted(async () => { // Ubah jadi async di sini
  // Tetap ambil username dari localStorage dulu untuk tampilan awal cepat
  username.value = localStorage.getItem('username') || 'User'; 
  setTimeout(() => (showWave.value = true), 100);

  // Panggil fungsi untuk mengambil data dashboard dari backend
  await fetchDashboardData(); 
});

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

// Fungsi untuk memformat tanggal ke YYYY-MM-DD untuk input HTML type="date"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Fungsi untuk memformat tanggal ke DD-MM-YY (sesuai pesan error backend)
const formatToDdDashMmDashYy = (dateStringYyyyMmDd) => {
  if (!dateStringYyyyMmDd) return '';
  const [year, month, day] = dateStringYyyyMmDd.split('-');
  const shortYear = year.substring(0); // Ambil 2 digit terakhir tahun
  return `${day}-${month}-${shortYear}`; // Format DD-MM-YY
}

const minDate = formatDate(today)
const maxDate = formatDate(tomorrow)

// Fungsi untuk mengambil data dashboard dari backend
async function fetchDashboardData() {
  loadingDashboard.value = true;
  errorDashboard.value = '';

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username'); // Ambil username dari localStorage

  if (!token || !user) {
    errorDashboard.value = 'Anda belum login. Mengarahkan ke halaman login...';
    setTimeout(() => router.push('/login'), 1500);
    loadingDashboard.value = false;
    return;
  }

  try {
    // Panggil API GET Dashboard
    const response = await fetch(`${baseUrl}/api/${user}/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      let errorMessage = 'Gagal mengambil data dashboard.';
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      } else if (response.statusText) {
        errorMessage = response.statusText;
      }
      throw { status: response.status, message: errorMessage };
    }

    const result = await response.json();
    console.log('✅ Data Dashboard diterima:', result);

    if (result.success) {
      username.value = result.data.username || 'User'; // Perbarui username di UI dengan data dari backend
      // Anda bisa menyimpan data lain dari result.data jika ada (misal: result.data.email)
    } else {
      errorDashboard.value = result.message || 'Gagal memuat data dashboard. Sesi mungkin tidak valid.';
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      setTimeout(() => router.push('/login'), 1500);
    }

  } catch (err) {
    console.error('❌ Error fetching dashboard data:', err);
    let displayMessage = 'Terjadi kesalahan jaringan saat memuat dashboard.';
    if (err.status) {
      displayMessage = `Error ${err.status}: ${err.message}`;
      if (err.status === 401 || err.status === 403) {
        displayMessage = 'Sesi Anda tidak valid. Mohon login kembali.';
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setTimeout(() => router.push('/login'), 1500);
      } else if (err.status === 404) {
          displayMessage = 'Endpoint Dashboard tidak ditemukan di server. Periksa konfigurasi backend.';
      }
    }
    errorDashboard.value = displayMessage;
  } finally {
    loadingDashboard.value = false;
  }
}

// Fungsi untuk mengirim prediksi
const handlePredict = async () => {
  predictionMessage.value = '';
  predictionMessageClass.value = '';

  if (!selectedFile.value) {
    predictionMessage.value = 'Mohon pilih file CSV terlebih dahulu.';
    predictionMessageClass.value = 'error-message';
    return;
  }
  if (!selectedDate.value) {
    predictionMessage.value = 'Mohon pilih tanggal prediksi terlebih dahulu.';
    predictionMessageClass.value = 'error-message';
    return;
  }

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username');

  if (!token || !user) {
    predictionMessage.value = 'Anda belum login. Mengarahkan ke halaman login...';
    predictionMessageClass.value = 'error-message';
    router.push('/login');
    return;
  }

  // Lakukan format tanggal di sini ke DD-MM-YY
  const formattedDateForBackend = formatToDdDashMmDashYy(selectedDate.value);

  const formData = new FormData();
  formData.append('csv_file', selectedFile.value);
  formData.append('tanggal', formattedDateForBackend); // Mengirim tanggal dalam format DD-MM-YY

  try {
    predictionMessage.value = 'Mengunggah file dan membuat prediksi...';
    predictionMessageClass.value = 'info-message';

    // 1. Upload ke PostgreSQL (menggunakan fetch API)
    const uploadRes = await fetch(`${baseUrl}/api/uploadcsv`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!uploadRes.ok) {
      const errorData = await uploadRes.json().catch(() => ({}));
      throw { status: uploadRes.status, message: errorData.message || uploadRes.statusText || 'Gagal mengunggah file CSV.' };
    }
    const uploadResult = await uploadRes.json();
    console.log('✅ Upload CSV ke PostgreSQL berhasil:', uploadResult.message);

    // 2. Kirim ke Flask untuk prediksi (menggunakan fetch API)
    const predictRes = await fetch(`${baseUrl}/api/${user}/predict`, { // Path ini sudah benar: /api/{username}/predict
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData, // Kirim FormData yang sama
    });

    if (!predictRes.ok) {
      const errorData = await predictRes.json().catch(() => ({}));
      throw { status: predictRes.status, message: errorData.message || predictRes.statusText || 'Gagal membuat prediksi.' };
    }
    const predictResult = await predictRes.json();
    console.log('✅ Prediksi dari Flask berhasil:', predictResult);

    // Simpan hasil prediksi ke localStorage
    if (predictResult.success && predictResult.rows && predictResult.rows.length > 0) {
      const latestRow = predictResult.rows[0];

      localStorage.setItem('latestPrediction', JSON.stringify({
        severity: latestRow['Predicted Severity'],
        location: latestRow['Location Info'],
        predict_date: predictResult.tanggal || selectedDate.value,
        alarm_id: latestRow['Alarm ID']
      }));

      localStorage.setItem('predictionResults', JSON.stringify(predictResult.rows));

      predictionMessage.value = 'Prediksi berhasil dibuat!';
      predictionMessageClass.value = 'success-message';
      router.push('/predict');

    } else {
      predictionMessage.value = predictResult.message || 'Prediksi gagal. Tidak ada hasil yang dikembalikan.';
      predictionMessageClass.value = 'error-message';
    }

  } catch (err) {
    console.error('❌ Error saat prediksi:', err);
    let displayMessage = 'Terjadi kesalahan saat melakukan prediksi.';
    if (err.status) {
      displayMessage = `Error ${err.status}: ${err.message}`;
      if (err.status === 400) {
          const backendErrorMsg = err.message || '';
          if (backendErrorMsg.includes("Format tanggal tidak valid")) { // Asumsi pesan error dari backend
              displayMessage = "Format tanggal salah. Pastikan format DD-MM-YY.";
          } else {
              displayMessage = `Input tidak valid: ${backendErrorMsg}`;
          }
      } else if (err.status === 401 || err.status === 403) {
          displayMessage = 'Sesi Anda habis atau tidak valid. Mohon login kembali.';
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          router.push('/dashboard');
      }
    } else if (err.message && err.message.includes("Failed to fetch")) {
       displayMessage = 'Terjadi kesalahan jaringan. Mohon periksa koneksi Anda.';
    } else {
      displayMessage = 'Terjadi kesalahan saat membuat prediksi.';
    }
    predictionMessage.value = displayMessage;
    predictionMessageClass.value = 'error-message';
  }
};

const goToTemperature = () => router.push('/temperature')
const goToAbout = () => router.push('/about')
const goToMaps = () => router.push('/maps')
const goToSite = () => router.push('/site')
const goToHistory = () => router.push('/history')
const goToProfile = () => router.push('/profile')
const goToPredict = () => router.push('/predict')
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.min-h-screen {
  overflow-x: hidden;
}

.cardheader {
  position: relative;
  left: 0;
  right: 0;
  width: 100vw;
  max-width: 100vw;
  height: 76px;
  background-color: #4f4f4f;
  padding: 1rem 3.2rem;
  margin: 0 auto 2rem auto;
  border-bottom: 2px solid rgba(62, 62, 62, 0.9);
  opacity: 0.9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.logo {
  height: 40px;
}

.icon-profile {
  height: 35px;
  cursor: pointer;
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr 260px;
  column-gap: 2rem;
  padding: 0 3.5rem;
  align-items: start;
  max-width: 100%;
  overflow-x: hidden;
  /* Tambahan: Pastikan tinggi kolom juga diatur jika ada masalah alignment */
  align-items: stretch; /* Membuat semua kolom memiliki tinggi yang sama dengan yang tertinggi */
}

.dashboard-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin: 0;
}

.dashboard-column.left-col,
.dashboard-column.right-col {
  flex: 0 0 auto; /* Gunakan flex-basis untuk lebar tetap */
  width: 240px; /* Fallback */
}

.dashboard-column.center-col {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;
}

.card {
  background-color: #2f2f2f !important;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: left;
  position: relative;
  margin-bottom: -0.5rem; /* Mungkin ini penyebab jarak terlalu dekat antar card */
  width: 100%; /* Pastikan card mengisi lebar column */
}

.card h2 {
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  margin: 0;
  position: absolute; /* Tetap absolute untuk judul di dalam card icon */
  top: 1rem;
  left: 1.5rem;
}

.cardtemperature,
.cardsite,
.cardabout,
.cardhistory {
  height: 230px; /* Ketinggian tetap untuk card icon */
  width: 230px; /* Lebar tetap untuk card icon */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Pastikan card ini tidak ada max-width tambahan */
}

.cardwelcome h2,
.cardmaps h2 {
  position: static !important;
}

.cardwelcome {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  margin-bottom: -1rem;
}

.cardmaps {
  width: 100% !important;
  min-width: 320px;
  max-width: unset;
  height: auto;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: -1rem;
}

.cardpredict {
  background: linear-gradient(90deg, #00697C 0%, #FFAB5B 100%);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  width: 100% !important;
  max-width: 100% !important;
  min-width: 320px;
  gap: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.cardpredict .flex {
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.predict-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  /* Perbaikan untuk responsivitas flex */
  flex-wrap: wrap; /* Izinkan wrapping pada layar kecil */
}

.form-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 66%;
  /* Perbaikan responsivitas */
  min-width: 180px; /* Minimal lebar agar input tidak terlalu sempit */
  flex-grow: 1; /* Izinkan tumbuh */
}

.form-right {
  align-self: flex-start;
  /* Perbaikan responsivitas */
  flex-grow: 1; /* Izinkan tumbuh */
  min-width: 100px; /* Minimal lebar tombol */
  display: flex;
  justify-content: flex-end; /* Pusatkan tombol ke kanan jika lebar cukup */
}

/* Responsive adjustment for .predict-container children */
@media (max-width: 600px) { /* Adjust breakpoint as needed */
  .predict-container {
    flex-direction: column;
    align-items: center;
  }
  .form-left, .form-right {
    width: 100%;
    min-width: unset;
    align-items: center; /* Pusatkan elemen di dalam form-left/right */
    text-align: center; /* Untuk input file text */
  }
  .form-right {
    justify-content: center; /* Pusatkan tombol secara horizontal */
  }
}


.size {
  height: 160px;
  margin-bottom: -18px;
}

.sizemap {
  width: 100% !important;
  height: auto;
  max-width: 100% !important;
  max-height: 300px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}

.card-title-welcome {
  text-align: center;
  margin: 0 auto;
  font-size: 23.5px !important;
  font-weight: 600;
}

.wave-emoji {
  display: inline-block;
  animation: wave-animation 2s ease-in-out;
  transform-origin: 70% 70%;
  height: 32px;
}

@keyframes wave-animation {
  0%, 60%, 100% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(14deg);
  }

  20% {
    transform: rotate(-8deg);
  }

  30% {
    transform: rotate(14deg);
  }

  40% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(10deg);
  }
}

.card-titlemaps {
  position: static !important;
  text-align: center;
  margin: 0 auto 1rem auto;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  margin-bottom: 1rem;
}

.predict-button {
  background-color: #2f2f2f;
  color: white;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 1rem;
  height: 55px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  margin-top: 15px;
}

.form-group {
  position: relative;
  max-width: 240px; /* Tetapkan max-width untuk form-group */
  width: 100%; /* Pastikan mengisi lebar parent-nya */
  box-sizing: border-box;
}

.floating-label {
  position: absolute;
  top: -9px;
  left: 12px;
  background-color: #2f2f2f;
  padding: 1px 6px;
  font-weight: 600;
  font-size: 0.65rem;
  color: white;
  border-radius: 4px 4px 0 0;
}

.custom-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #2f2f2f;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  box-sizing: border-box;
  appearance: none;
  outline: none;
}

.input-file {
  padding: 0.4rem 1rem !important;
  height: 38px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #2f2f2f;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  box-sizing: border-box;
  appearance: none;
  outline: none;
}

.input-file::-webkit-file-upload-button {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.input-date::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.input-date {
  background-color: #2f2f2f;
  color: white;
  border-radius: 8px;
  padding: 0.5rem;
  border: none;
}

@media (max-width: 768px) {
  .dashboard-layout {
    grid-template-columns: 1fr; /* Ubah ke satu kolom */
    padding: 0 1rem;
    gap: 1.5rem; /* Tambahkan gap antar kolom */
  }

  .dashboard-column {
    width: 100%;
    align-items: center;
  }

  .dashboard-column.left-col,
  .dashboard-column.right-col {
    flex: 0 0 auto;
    width: 100%; /* Lebarkan kolom kiri/kanan di mobile */
  }

  .dashboard-column.center-col {
    width: 100%;
    padding: 0;
  }

  .card {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .cardtemperature,
  .cardsite,
  .cardabout,
  .cardhistory {
    width: 100%; /* Lebarkan card icon di mobile */
    height: auto; /* Tinggi menyesuaikan konten */
    padding: 1.5rem;
  }

  .cardwelcome {
    height: auto;
  }

  .cardmaps .sizemap {
    width: 100%;
    height: auto;
  }

  /* Responsive for predict card inputs */
  .predict-container {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .form-left {
    width: 100%;
    max-width: 280px; /* Batasi lebar form di mobile agar tidak terlalu lebar */
    align-items: center;
  }

  .form-right {
    width: 100%;
    justify-content: center;
  }

  .form-group {
    max-width: 100%; /* Form group memenuhi lebar form-left */
  }
}

@media (max-width: 1024px) {
  /* Aturan ini akan menimpa 768px jika layar di antara 768px dan 1024px */
  /* Namun, karena kita sudah mengatur untuk 768px ke bawah,
     aturan di sini bisa jadi duplikat atau perlu disesuaikan ulang */
  .dashboard-layout {
    display: flex; /* Ganti grid menjadi flex */
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .dashboard-column {
    width: 100%;
    align-items: center;
  }

  .dashboard-column.center-col {
    width: 100%;
    padding: 0;
  }

  .card {
    width: 100%;
    max-width: 100%;
  }

  .cardmaps .sizemap {
    width: 100%;
    height: auto;
  }
}
</style>