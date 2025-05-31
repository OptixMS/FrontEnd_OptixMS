<template>
  <div class="login-page-container font-poppins">
    <router-link to="/login" class="back-button">
      <img src="@/assets/img/back.png" alt="Back" class="sizeback" />
    </router-link>

    <div class="login-card-wrapper relative">
      <div class="illustration-card absolute z-20 left-[-140px] top-1/2 -translate-y-1/2">
        <img src="@/assets/img/SignUpLogin.png" alt="Login Illustration" class="icon" />
      </div>

      <div class="form-section relative z-10">
        <div class="form-wrapper mx-auto">
          <h2 class="form-title">Forgot Password</h2>
          <form @submit.prevent="submitForgot" class="space-y-6">
            <div>
              <label class="form-label">Email</label>
              <input
                v-model="email" 
                type="email" 
                placeholder="Enter email"
                class="input-field"
              />
            </div>
            <button type="submit" class="login-button">Submit</button>
            
            <p v-if="loading" class="info-message">Mengirim...</p>
            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// State reaktif
const email = ref('');
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const router = useRouter();

// URL dasar API Anda
const baseUrl = import.meta.env.VITE_API_URL;

// Fungsi untuk menangani pengiriman permintaan lupa password
async function submitForgot() {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  if (!email.value) {
    errorMessage.value = "Email tidak boleh kosong.";
    loading.value = false;
    return;
  }

  try {
    const res = await fetch(`${baseUrl}/api/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }), // Mengirim nilai email dari input
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      let displayMessage = 'Gagal mengirim email reset password.';
      if (errorData && errorData.message) {
        displayMessage = errorData.message;
      } else if (res.statusText) {
        displayMessage = res.statusText;
      }
      throw { status: res.status, message: displayMessage };
    }

    const data = await res.json();

    if (data.success) {
      successMessage.value = "Berhasil.";
      email.value = ''; // Kosongkan input email setelah berhasil
    } else {
      errorMessage.value = data.message || "Gagal.";
    }
  } catch (err) {
    console.error('Error submitForgot:', err);
    let displayMessage = 'Terjadi kesalahan saat menghubungi server.';
    if (err.status) {
      displayMessage = `Error ${err.status}: ${err.message}`;
      if (err.status === 400 || err.status === 404) { // Menangani Bad Request atau Not Found (Email tidak terdaftar)
        displayMessage = err.message; // Gunakan pesan dari backend
      }
    } else if (err.message && err.message.includes("Failed to fetch")) {
      displayMessage = 'Terjadi kesalahan jaringan. Mohon periksa koneksi Anda.';
    }
    errorMessage.value = displayMessage;
  } finally {
    loading.value = false;
  }
}
</script>

  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.create {
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 12.8px;
  text-decoration: underline;
  margin: 0;
}

.forgot {
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 12.8px;
  text-decoration: underline;
  margin-left: 2rem;
}

/* Container flex untuk create dan forgot */
.action-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0 15rem; /* beri padding horizontal untuk jarak dari tepi */
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
}

.login-page-container {
  height: 100vh;
  width: 100%;
  background: linear-gradient(90deg, #00879E 0%, #005B6B 48.26%, #003038 97.15%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.sizeback {
  height: 30px;
  margin-left: 2rem;
}

.icon {
  height: 350px;
}

.back-button {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 30;
}

.login-card-wrapper {
  position: relative;
  width: 700px;
  min-height: 400px;
}

.illustration-card {
  background: linear-gradient(180deg, #00879E 44.5%, #003038 100%);
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
  width: 400px;
  height: 400px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.form-section {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(132.28799438476562px);
  border: 1px solid white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  width: 650px;
  height: 320px;
  margin-left: auto;
  margin-top: 30px;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 10;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.form-wrapper {
  max-width: 360px;
  margin: 0 auto;
  padding: 1rem 0;
}

.form-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  margin-top: -20px;
  margin-left: 235px;
  text-align: left;
}

.form-label {
  color: white;
  margin-bottom: 0.25rem;
  margin-left: 240px;
  display: block;
}

.input-field {
  width: 72%;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  padding: 0.5rem 0;
  outline: none;
  font-size: 1rem;
  margin-left: 240px;
  margin-bottom: 0.5rem;
}

.input-field::placeholder {
  color: #ccc;
}

.info-message {
  color: #00879E;
  margin-top: 1rem;
  padding-left: 15rem;
  font-size: 1.1rem;
}

.success-message {
  color: #ffffff;
  margin-top: 1rem;
  padding-left: 15rem;
  font-size: 1.1rem;
}

.error-message {
  color: #f8ac57;
  margin-top: 1rem;
  padding-left: 15rem;
  font-size: 1.1rem;
}

.text-red-400 {
  color: #f87171; /* Contoh warna merah, sesuaikan */
}
.text-green-400 {
  color: #34d399; /* Contoh warna hijau, sesuaikan */
}

/* Perbaikan button login: tanpa box-shadow hitam */
.login-button {
  width: 73%;
  background: linear-gradient(180deg, #00879E 0%, #003038 100%);
  color: white;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none; /* Hapus border */
  transition: opacity 0.3s ease;
  margin-top: 1rem;
  margin-left: 240px;
}

.login-button:hover {
  opacity: 0.9;
}

  </style>
    