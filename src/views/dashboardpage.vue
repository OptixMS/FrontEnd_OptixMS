<template>
  <div class="min-h-screen w-full font-poppins bg-[#4f4f4f] py-6 text-white overflow-hidden">
    <!-- Header -->
    <div class="cardheader">
      <img src="@/assets/img/logo.png" alt="OptixMS Logo" class="logo" />
      <img @click="goToProfile" src="@/assets/img/profilenew.png" alt="Profile" class="icon-profile" />
    </div>

    <!-- 3 Kolom Layout -->
    <div class="dashboard-layout">
      <!-- Kolom Kiri -->
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

      <!-- Kolom Tengah -->
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
      <div class="flex flex-row items-center justify-between w-full p-4 gap-6">
    
      <!-- Kiri: Input File + Input Date -->
      <div class="flex flex-col gap-4 w-2/3">
      
            <!-- Upload File -->
            <div class="form-group">
                <label for="file" class="floating-label">Input File</label>
                <input id="file" type="file" class="custom-input input-file" />
            </div>

            <!-- Input Date -->
            <div class="form-group">
                <label for="date" class="floating-label">Input Date</label>
                <input id="date" type="date" class="custom-input input-date" />
            </div>
            </div>

            <!-- Kanan: Button Predict -->
            <div class>
            <button @click="goToPredict" class="predict-button cursor-pointer">
              Predict Now
            </button>
          </div>
        </div>
      </div>
    </div>


      <!-- Kolom Kanan -->
      <div class="dashboard-column">
        <div @click="goToAbout" class="card cardabout cursor-pointer">
          <h2 class="card-titleabout">About Palapa Ring</h2>
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
const router = useRouter()

onMounted(() => {
  username.value = localStorage.getItem('username') || 'User'
  setTimeout(() => (showWave.value = true), 100)
})

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const handlePredict = async () => {
  if (!selectedFile.value || !selectedDate.value) {
    alert('Mohon pilih file dan tanggal terlebih dahulu.');
    return;
  }

  const uploadForm = new FormData();
  uploadForm.append('csv_file', selectedFile.value);
  uploadForm.append('tanggal', selectedDate.value);

  const predictForm = new FormData();
  predictForm.append('csv_file', selectedFile.value);
  predictForm.append('tanggal', selectedDate.value);

  try {
    // 1. Upload ke PostgreSQL
    const uploadRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/uploadcsv`,
      uploadForm,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    console.log('✅ Upload success:', uploadRes.data.message);

    // 2. Kirim ke Flask untuk prediksi
    const predictRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/predict`,
      predictForm,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    console.log('✅ Prediksi berhasil:', predictRes.data);

    // 3. Simpan hasil ke localStorage dan redirect
    localStorage.setItem('predictionResults', JSON.stringify(predictRes.data.rows));
    router.push('/predict');
  } catch (err) {
    console.error('❌ Error saat prediksi:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Gagal melakukan prediksi. Cek file dan tanggal.');
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
  width: 100vw; /* gunakan viewport width */
  max-width: 100vw;
  height: 76px;
  background-color: #4f4f4f;
  padding: 1rem 3.2rem;
  margin: 0 auto 2rem auto;
  border-bottom: 2px solid rgba(62, 62, 62, 0.9); /* hanya bawah dan 90% opacity */
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
  column-gap: 2rem; /* ✅ Jarak kiri–tengah dan tengah–kanan sama */
  padding: 0 3.5rem;   /* ➕ Padding luar biar tak mentok */
  align-items: start;
  max-width: 100%;  /* ✅ Tambahkan ini */
  overflow-x: hidden; /* ✅ Supaya gak mental */
}




.dashboard-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin: 0; /* Penting: hapus margin manual */
}



.dashboard-column.left-col,
.dashboard-column.right-col {
  flex: 0 0 auto;
  width: 240px;
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

.dashboard-column:first-child {
}

.dashboard-column:last-child {
}


.center-col > .card {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}



.card {
  background-color: #2f2f2f !important; /* Warna sesuai permintaan */
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  text-align: left; /* Supaya title ke kiri */
  position: relative;
  margin-bottom: -0.5rem;
}

.card h2 {
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  margin: 0;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
}

.cardtemperature,
.cardsite,
.cardabout,
.cardhistory {
  height: 230px;
  width: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cardwelcome h2,
.cardmaps h2 {
  position: static !important;
}


.cardwelcome {
  display: flex;
  align-items: center;
  justify-content: center; /* biar isi card-nya center horizontal */
  height: auto;
  width: 100%;
  margin-bottom: -0.5rem;
}

.cardmaps {
  width: 100% !important;
  min-width: 320px;
  max-width: unset;
  height: auto;
  padding: 1.5rem 1rem; /* ✅ Tambah padding atas-bawah */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: -0.5rem;
}


.cardpredict {
  background: linear-gradient(90deg, #00697C 0%, #FFAB5B 100%);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  width: 100% !important;        /* ✅ Biar ngikutin parent kolom tengah */
  max-width: 100% !important;    /* ✅ Jangan ngerem lebar */
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

.predict-button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.size {
  height: 160px;
  margin-bottom: -18px;
}

.sizemap {
  width: 100% !important;
  height: auto;
  max-width: 100% !important;
  max-height: 300px; /* ⬅️ atur tinggi maksimum biar gak meledak */
  object-fit: contain; /* ⭐ penting: jaga proporsi gambar */
  display: block;
  margin: 0 auto;
  border-radius: 0.5rem;
  margin-top: 0.5rem; /* ✅ dorong ke bawah dalam flex-column */
}


.card-title-welcome {
  text-align: center;
  margin: 0 auto;
  font-size: 50px;
  font-weight: 600;
}


.wave-emoji {
  display: inline-block;
  animation: wave-animation 2s ease-in-out;
  transform-origin: 70% 70%;
}

@keyframes wave-animation {
  0%, 60%, 100% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
}

.card-titlemaps {
  position: static !important; /* override posisi absolute */
  text-align: center;
  margin: 0 auto 1rem auto; /* center horizontal dan kasih jarak bawah */
  font-size: 1rem;
  font-weight: 600;
  width: 100%; /* biar text-align center bekerja */
  margin-bottom: 1rem; /* ✅ Tambah jarak bawah */
}


.predict-button {
  background-color: #2f2f2f;
  color: white;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.form-group {
  position: relative;
  max-width: 240px;
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

.input-date::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
    align-items: center;
    padding: 0 1rem; /* ➕ Biar gak mentok */
  }

  .cardwelcome {
    height: auto;
  }

  .card {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box; /* Pastikan padding gak bikin overflow */
  }
}

@media (max-width: 1024px) {
  .dashboard-layout {
    display: flex;
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
