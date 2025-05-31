<template>
  <div class="temperature-wrapper">
    <Sidebar />
    <div class="temperature-container font-poppins">
      <div class="cardheader"></div>

      <div class="cardtitle">
        <h1 class="titletemps">Site Temperature</h1>
      </div>

      <div v-if="loading" class="info-message">Memuat data suhu situs...</div>
      <div v-if="error" class="error-message">{{ error }}</div>

      <div v-if="!loading && !error && sites.length" class="card-grid">
        <div
          v-for="site in sites"
          :key="site.name"
          class="cardtemperature"
        >
          <img :src="getTemperatureIcon(site.temp)" alt="Temperature Icon" class="sizeicon" />
          <div class="cardtemps">{{ site.name }}</div>
          <div class="cardtemps">{{ site.temp }}°C</div>
        </div>
      </div>
      <div v-else-if="!loading && !error && !sites.length" class="info-message">
        Tidak ada data suhu situs yang tersedia.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/sidebar.vue';

const sites = ref([]);
const loading = ref(false);
const error = ref('');

// URL dasar API Anda
const baseUrl = import.meta.env.VITE_API_URL;

// ✅ Path ke icon suhu
const tempIconBlue = new URL('@/assets/img/temperatur-blue.png', import.meta.url).href; // Asumsi ada gambar ini
const tempIconOrange = new URL('@/assets/img/temperatur-orange.png', import.meta.url).href; // Asumsi ada gambar ini

// ✅ Fungsi untuk mendapatkan icon berdasarkan suhu
function getTemperatureIcon(temperature) {
  // Pastikan temperature adalah angka
  const temp = parseFloat(temperature);
  if (isNaN(temp)) {
    return new URL('@/assets/img/temperatur.png', import.meta.url).href; // Default jika bukan angka
  }

  if (temp <= 25) {
    return tempIconBlue;
  } else {
    return tempIconOrange;
  }
}

async function fetchSiteTemperature() {
  loading.value = true;
  error.value = '';

  try {
    const res = await fetch(`${baseUrl}/api/sitetemperature`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw { status: res.status, message: errorData.message || res.statusText || 'Gagal mengambil data suhu situs dari server.' };
    }

    const responseJson = await res.json();

    if (responseJson && Array.isArray(responseJson.data)) {
      sites.value = responseJson.data.map(locationData => {
        const tempValue = locationData.suhu && locationData.suhu.length > 0
                          ? locationData.suhu[0].suhu_celcius
                          : 'N/A';

        return {
          name: locationData.lokasi,
          temp: tempValue
        };
      });
    } else {
      throw { message: responseJson.message || 'Format data suhu situs tidak valid dari backend.' };
    }

  } catch (err) {
    console.error('Error fetching site temperature:', err);
    if (err.status) {
      error.value = `Error ${err.status}: ${err.message}`;
    } else {
      error.value = 'Terjadi kesalahan jaringan saat memuat suhu situs. Mohon periksa koneksi Anda.';
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchSiteTemperature();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

@media (max-width: 1023px) {
}

.temperature-wrapper {
  display: flex;
}

.temperature-container {
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
  border-bottom: 1.3px solid rgba(62, 62, 62, 0.9);
  margin-bottom: 2rem;
  opacity: 0.9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow-x: hidden;
}

.back {
  height: 35px;
  cursor: pointer;
  margin-left: 1rem;
}

.cardtitle {
  background-color: #2f2f2f;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  height: 50px;
  width: 97%;
  margin: 20px auto;
  border-radius: 1rem;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.titletemps {
  background-color: #2f2f2f;
  border-radius: 0.75rem;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cardtemperature {
  background-color: #2f2f2f;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sizeicon {
  height: 130px; /* Ukuran ikon tetap */
}

.cardtemps {
  color: #fffefe;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

.info-message {
  color: #ffffff;
  margin-top: 1rem;
  font-size: 1.1rem;
  text-align: center;
}

.error-message {
  color: #f8ac57;
  margin-top: 1rem;
  font-size: 1.1rem;
  text-align: center;
}
</style>