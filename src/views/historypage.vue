<template>
  <div class="history-wrapper">
    <Sidebar />

    <div class="history-page font-poppins text-white">
      <div class="cardheader"></div>

      <div class="main-container">
        <div class="history-table">
          <div class="table-title">Predict History</div>
          
          <div v-if="loading" class="info-message text-center mt-4">Memuat riwayat prediksi...</div>
          <div v-if="error" class="error-message text-center mt-4">{{ error }}</div>

          <div v-else-if="!historyData.length" class="info-message text-center mt-4">
            Tidak ada riwayat prediksi ditemukan untuk pengguna ini.
          </div>

          <div v-else class="table-rows">
            <div
              v-for="(entry, index) in historyData"
              :key="index"
              class="table-row"
              @click="selectHistory(entry)"
            >
              <span class="col-number">{{ index + 1 }}</span>
              <span class="col-date">{{ entry.predict_date }}</span>
              <span class="col-severity">Severity: {{ mapSeverity(entry.severity) }}</span>
            </div>
          </div>
        </div>

        <div class="side-panel">
          <button class="action-button" @click="deleteAllHistory">Delete all history</button>
          <button class="action-button" @click="exportHistory">Export History</button> <p v-if="deleteMessage" :class="deleteMessageClass" class="mt-2 text-center">{{ deleteMessage }}</p>
          <p v-if="exportMessage" :class="exportMessageClass" class="mt-2 text-center">{{ exportMessage }}</p> <div class="placeholder-box">
            <div v-if="selectedHistory">
              <p><strong>Date:</strong> {{ selectedHistory.predict_date }}</p>
              <p><strong>Severity:</strong> {{ mapSeverity(selectedHistory.severity) }}</p>
              <p><strong>Location:</strong> {{ selectedHistory.location }}</p>
              <p><strong>Alarm ID:</strong> {{ selectedHistory.alarm_id }}</p>
              <p><strong>Description:</strong> {{ selectedHistory.alarm_description || 'N/A' }}</p>
              <p><strong>Alarm Source:</strong> {{ selectedHistory.alarm_source || 'N/A' }}</p>
            </div>
            <div v-else style="opacity: 0.5; font-style: italic;">
              Click on a row to preview history.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';

const historyData = ref([]);
const selectedHistory = ref(null);
const loading = ref(false);
const error = ref('');

const deleteMessage = ref('');
const deleteMessageClass = ref('');
const exportMessage = ref('');
const exportMessageClass = ref('');

const router = useRouter();
const baseUrl = import.meta.env.VITE_API_URL;

function mapSeverity(val) {
  const severityMap = ['Minor', 'Major', 'Warning', 'Critical'];
  const idx = parseInt(val);
  return severityMap[idx] || 'Unknown';
}

function selectHistory(entry) {
  selectedHistory.value = entry;
}

async function fetchHistory() {
  loading.value = true;
  error.value = '';

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token || !username) {
    error.value = 'Anda belum login. Mengarahkan ke halaman login...';
    setTimeout(() => { router.push('/login'); }, 1500);
    loading.value = false;
    return;
  }

  try {
    const res = await fetch(`${baseUrl}/api/history`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw { status: res.status, message: errorData.message || res.statusText || 'Gagal mengambil riwayat prediksi dari server.' };
    }

    const responseJson = await res.json();

    if (responseJson.success && Array.isArray(responseJson.data)) {
      historyData.value = responseJson.data.map(item => ({
        predict_date: item.tanggal,
        severity: item.severity,
        location: item.location,
        alarm_id: item["Alarm ID"],
        alarm_description: item.alarm_description,
        alarm_source: item["Alarm Source"],
      }));
    } else {
      error.value = responseJson.message || 'Format data riwayat tidak valid dari backend.';
    }

  } catch (err) {
    console.error('❌ Error fetching history:', err);
    if (err.status) {
      error.value = `Error ${err.status}: ${err.message}`;
      if (err.status === 401 || err.status === 403) {
        error.value = 'Sesi Anda tidak valid. Mengarahkan ke halaman login...';
        setTimeout(() => { router.push('/login'); }, 1500);
      } else if (err.status === 404) {
        error.value = 'Endpoint riwayat tidak ditemukan di server. Pastikan backend terkonfigurasi dengan benar.';
      }
    } else {
      error.value = 'Terjadi kesalahan jaringan. Mohon periksa koneksi Anda.';
    }
  } finally {
    loading.value = false;
  }
}

async function deleteAllHistory() {
  deleteMessage.value = '';
  deleteMessageClass.value = '';

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token || !username) {
    deleteMessage.value = 'Anda belum login. Mohon login untuk menghapus riwayat.';
    deleteMessageClass.value = 'error-message';
    setTimeout(() => { router.push('/login'); }, 1500);
    return;
  }

  if (!confirm('Apakah Anda yakin ingin menghapus SEMUA riwayat prediksi? Tindakan ini tidak dapat dibatalkan.')) {
    deleteMessage.value = 'Penghapusan riwayat dibatalkan.';
    deleteMessageClass.value = 'info-message';
    return;
  }

  try {
    deleteMessage.value = 'Menghapus riwayat...';
    deleteMessageClass.value = 'info-message';

    const res = await fetch(`${baseUrl}/api/${username}/deletehistory`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw { status: res.status, message: errorData.message || res.statusText || 'Gagal menghapus riwayat.' };
    }

    const responseJson = await res.json();

    if (responseJson.success) {
      deleteMessage.value = 'Semua riwayat berhasil dihapus!';
      deleteMessageClass.value = 'success-message';
      selectedHistory.value = null;
      fetchHistory();
    } else {
      deleteMessage.value = responseJson.message || 'Gagal menghapus riwayat. Respons sukses tapi logika gagal.';
      deleteMessageClass.value = 'error-message';
    }

  } catch (err) {
    console.error('❌ Error deleting history:', err);
    let displayMessage = 'Terjadi kesalahan saat menghapus riwayat.';
    if (err.status) {
      displayMessage = `Error ${err.status}: ${err.message}`;
      if (err.status === 401 || err.status === 403) {
        displayMessage = 'Sesi Anda tidak valid. Mohon login kembali.';
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        router.push('/login');
      } else if (err.status === 404) {
        displayMessage = 'Endpoint penghapusan riwayat tidak ditemukan di server.';
      }
    } else {
      displayMessage = 'Terjadi kesalahan jaringan. Mohon periksa koneksi Anda.';
    }
    deleteMessage.value = displayMessage;
    deleteMessageClass.value = 'error-message';
  }
}

// ✅ FUNGSI BARU UNTUK EXPORT HISTORY (METODE GET)
async function exportHistory() {
  exportMessage.value = '';
  exportMessageClass.value = '';

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token || !username) {
    exportMessage.value = 'Anda belum login. Mohon login untuk export.';
    exportMessageClass.value = 'error-message';
    setTimeout(() => { router.push('/login'); }, 1500);
    return;
  }

  try {
    exportMessage.value = 'Mempersiapkan export...';
    exportMessageClass.value = 'info-message';

    const baseUrl = import.meta.env.VITE_API_URL;
    // ✅ Menggunakan endpoint yang benar untuk export history (GET)
    const response = await fetch(`${baseUrl}/api/${username}/exporthasil`, { 
      method: 'GET', // ✅ Metode GET
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'application/json' // Biasanya tidak perlu untuk GET yang mengembalikan file
      },
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
    let filename = 'history_export.csv'; // Default filename
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
    console.error('❌ Error saat export history:', err);
    let displayMessage = 'Gagal melakukan export history.';
    if (err.status) {
      displayMessage = `Error ${err.status}: ${err.message}`;
      if (err.status === 401 || err.status === 403) {
        displayMessage = 'Sesi Anda tidak valid. Mohon login kembali.';
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        router.push('/login');
      }
    } else if (err.message && err.message.includes("Failed to fetch")) {
      displayMessage = 'Terjadi kesalahan jaringan saat export history. Mohon periksa koneksi Anda.';
    }
    exportMessage.value = displayMessage;
    exportMessageClass.value = 'error-message';
  }
}

onMounted(() => {
  fetchHistory();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.history-wrapper {
  display: flex;
}

.history-page {
  background-color: #4f4f4f;
  min-height: 100vh;
  padding: 0 4vw 4rem;
  box-sizing: border-box;
  overflow-x: hidden;
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

.back-button {
  height: 35px;
  cursor: pointer;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .main-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

/* History Table */
.history-table {
  flex: 1;
  background-color: #2f2f2f;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

.table-title {
  background-color: #2f2f2f;
  color: #ffffff;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.table-rows {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.table-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1.7rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-items: center;
}

.table-row:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
}

.col-number {
  width: 2rem;
  color: #ffffff;
  flex-shrink: 0;
}

.col-date {
  flex: 1;
  color: #ffffff;
  min-width: 120px;
  text-align: left;
}

.col-severity {
  text-align: right;
  color: #ffffff;
  min-width: 100px;
  flex-shrink: 0;
}

/* Side Panel */
.side-panel {
  width: 100%;
  max-width: 280px;
  background: linear-gradient(to bottom, #00879E 0%, #005B6B 48.26%, #003038 97.15%);
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
}

.action-button {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  background: linear-gradient(to bottom, #F8AC57, #BE753E);
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.placeholder-box {
  border: 1px solid white;
  border-radius: 0.5rem;
  height: 15.5rem;
  color: white;
  padding: 1rem;
  font-size: 0.95rem;
  overflow-y: auto;
}

/* Styling untuk pesan loading/error/delete */
.info-message {
  color: #ffffff;
}

.error-message {
  color: #f8ac57;
}

.success-message {
  color: #ffffff;
}
</style>