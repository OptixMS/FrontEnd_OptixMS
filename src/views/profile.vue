<template>
  <div class="profile-container font-poppins">
    <div class="cardheader">
      <router-link to="/dashboard">
        <img src="@/assets/img/back.png" alt="Back" class="icon-back" />
      </router-link>
    </div>

    <div class="content-wrapper">
      <div class="avatar-wrapper">
        <img src="@/assets/img/profils.png" alt="Profile Icon" class="profile-icon" />
      </div>

      <div v-if="loading" class="info-message">Memuat data profil...</div>
      <div v-if="error" class="error-message">{{ error }}</div>

      <div v-if="!loading && !error" class="form-section">
        <div class="form-group">
          <label class="form-label">Name:</label>
          <input type="text" class="form-input" :value="userData.username" readonly />
        </div>

        <div class="form-group">
          <label class="form-label">Password:</label>
          <input type="password" class="form-input" value="*********" readonly />
        </div>

        <div class="form-group">
          <label class="form-label">Email:</label>
          <input type="email" class="form-input" :value="userData.email" readonly />
        </div>
      </div>

      <div class="button-group">
        <router-link to="/edit"><button class="btn btn-edit">Edit Profile</button></router-link>
        <button class="btn btn-logout" @click="logout">Logout</button> </div>
      <p v-if="logoutMessage" :class="logoutMessageClass" class="mt-2 text-center">{{ logoutMessage }}</p> </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userData = ref({ username: '', email: '' });
const loading = ref(false);
const error = ref('');
const logoutMessage = ref(''); // ✅ State untuk pesan logout
const logoutMessageClass = ref(''); // ✅ State untuk styling pesan logout
const router = useRouter();

const baseUrl = import.meta.env.VITE_API_URL;

async function fetchProfile() {
  loading.value = true;
  error.value = '';

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token || !username) {
    error.value = 'Anda belum login. Mengarahkan ke halaman login...';
    router.push('/login');
    loading.value = false;
    return;
  }

  try {
    // Pastikan URL endpoint sesuai dengan struktur backend Anda: /api/account/profile/:username
    // Perhatikan: endpoint Anda di account.js adalah /profile/:username, jadi base path /api sudah cukup
    const res = await fetch(`${baseUrl}/api/profile/${username}`, { // ✅ URL disesuaikan
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
    });

    const data = await res.json();

    if (res.ok && data.success) {
      userData.value = data.data;
    } else {
      error.value = data.message || 'Gagal mengambil data profil. Mohon coba lagi.';
      router.push('/login'); // Jika API mengindikasikan kesalahan, anggap sesi tidak valid
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan jaringan. Mohon periksa koneksi Anda.';
    console.error('Error fetching profile:', err);
    router.push('/profile'); // Jika terjadi kesalahan jaringan, arahkan ke login
  } finally {
    loading.value = false;
  }
}

// ✅ FUNGSI LOGOUT YANG MEMANGGIL BACKEND
async function logout() {
  logoutMessage.value = '';
  logoutMessageClass.value = '';

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Ambil username, meskipun endpoint logout tidak pakai

  if (!token || !username) {
    // Jika tidak ada token, langsung logout dari frontend saja
    console.warn('Tidak ada token ditemukan, langsung logout lokal.');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    router.push('/');
    return;
  }

  try {
    logoutMessage.value = 'Melakukan logout...';
    logoutMessageClass.value = 'info-message';

    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/api/logout`, { // ✅ Endpoint POST /api/logout
      method: 'POST', // ✅ Metode POST
      headers: {
        'Authorization': `Bearer ${token}`, // Mengirim token di header
        'Content-Type': 'application/json' // Sebagai praktik baik
      },
      body: JSON.stringify({}) // Body kosong jika backend tidak mengharapkan data
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      let errorMessage = 'Gagal logout dari server.';
      if (errorData && errorData.message) {
          errorMessage = errorData.message;
      } else if (response.statusText) {
          errorMessage = response.statusText;
      }
      throw { status: response.status, message: errorMessage };
    }

    const result = await response.json();
    if (result.success) {
      logoutMessage.value = 'Logout berhasil!';
      logoutMessageClass.value = 'success-message';
    } else {
      logoutMessage.value = result.message || 'Logout gagal dari server.';
      logoutMessageClass.value = 'error-message';
    }

  } catch (err) {
    console.error('❌ Error saat logout:', err);
    let displayMessage = 'Terjadi kesalahan jaringan saat logout.';
    if (err.status) {
      displayMessage = `Error ${err.status}: ${err.message}`;
      if (err.status === 401 || err.status === 403) {
        displayMessage = 'Sesi tidak valid. Melakukan logout lokal.';
      }
    } else if (err.message && err.message.includes("Failed to fetch")) {
      displayMessage = 'Tidak dapat terhubung ke server logout. Melakukan logout lokal.';
    }
    logoutMessage.value = displayMessage;
    logoutMessageClass.value = 'error-message';
  } finally {
    // Selalu hapus token dari localStorage dan redirect setelah mencoba logout dari backend
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setTimeout(() => {
      router.push('/'); // Redirect ke halaman utama setelah logout
    }, 1000); // Beri sedikit waktu untuk pesan terlihat
  }
}

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.profile-container {
  min-height: 100vh;
  width: 100%;
  background-color: #4f4f4f;
  color: white;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}

.cardheader {
  position: relative;
  left: 0;
  right: 0;
  width: 100vw;
  max-width: 100vw;
  height: 76px;
  background-color: #4f4f4f;
  padding: 1rem 3rem;
  margin: 0 auto 2rem auto;
  border-bottom: 1.3px solid rgba(62, 62, 62, 0.9);
  opacity: 0.9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}

.icon-back {
  height: 30px;
  cursor: pointer;
  padding-bottom: 0rem;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.avatar-wrapper {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.profile-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: -1rem;
}

.form-section {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  margin-top: -0.2rem;
  color: white;
}

.form-input {
  background-color: #2f2f2f;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.25rem;
  color: white;
  box-shadow: inset 0 0 0 1px #444;
}

.form-input[readonly] {
  cursor: default;
}

.button-group {
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  margin-bottom: 3rem;
}

.btn:hover {
  transform: scale(1.05);
}

.btn-edit {
  background: linear-gradient(180deg, #00879E 0%, #003038 100%);
  color: white;
}

.btn-logout {
  background: linear-gradient(to right, #f8ac57, #be753e);
  color: white;
}

/* Responsive spacing */
@media (max-width: 768px) {
  .form-section {
    width: 90%;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .button-group {
    flex-direction: column;
    gap: 1rem;
  }
}

.info-message {
  color: #ffffff;
  margin-top: 1rem;
  font-size: 1.1rem;
}

.error-message {
  color: #f8ac57;
  margin-top: 1rem;
  font-size: 1.1rem;
}

.success-message {
  color: #ffffff;
  margin-top: 1rem;
  font-size: 1.1rem;
}
</style>