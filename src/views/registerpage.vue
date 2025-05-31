<template>
  <div class="register-page-container font-poppins">
    <!-- Icon Back -->
    <router-link to="/" class="back-button">
      <img src="@/assets/img/back.png" alt="Back" class="sizeback" />
    </router-link>

    <!-- Card utama -->
    <div class="register-card-wrapper relative">
      <!-- Card Form Register -->
      <div class="form-section relative z-10">
        <div class="form-wrapper mx-auto">
          <h2 class="form-title">Sign Up</h2>
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div>
              <label class="form-label">Username</label>
              <input
                v-model="username"
                type="text"
                placeholder="Enter username"
                class="input-field"
              />
            </div>
            <div>
              <label class="form-label">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="Enter email"
                class="input-field"
              />
            </div>
            <div>
              <label class="form-label">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="Enter password"
                class="input-field"
              />
            </div>
            <button type="submit" class="register-button">Register</button>
          </form>
          <router-link to="/login"><p class="text-center text-sm text-white mt-4">
            Already have an account?
          </p></router-link>
          <div v-if="error" class="text-center text-red-300 mt-2 text-sm">{{ error }}</div>
        </div>
      </div>

      <!-- Card Ilustrasi di kanan -->
      <div class="illustration-card absolute z-20 right-[-140px] top-1/2 -translate-y-1/2">
        <img src="@/assets/img/SignUpLogin.png" alt="Register Illustration" class="icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postRequest } from '../api.js'; // Impor postRequest dari api.js

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const handleRegister = async () => {
  error.value = ''; // Reset pesan error setiap kali percobaan registrasi

  // Validasi sederhana di sisi frontend
  if (!username.value || !email.value || !password.value) {
    error.value = 'Semua field wajib diisi.';
    return; // Hentikan eksekusi jika validasi gagal
  }

  try {
    // Panggil postRequest dari api.js
    // Endpoint register di account.js Anda adalah '/register'.
    // Karena di app.js Anda menggunakan app.use('/api/account', accountRoutes);
    // Maka path lengkapnya adalah '/api/account/register'.
    // Di sini kita hanya perlu menulis '/account/register' karena api.js sudah menangani baseURL.
    const response = await postRequest('/api/register', {
      username: username.value,
      email: email.value,
      password: password.value
    });

    // Jika postRequest tidak melempar error, berarti responsnya 2xx (sukses)
    // Respons dari backend: { success: true, message: 'Registrasi berhasil.' }
    if (response.success) {
      alert('Registrasi berhasil! Silakan login.'); // Beri feedback ke user
      router.push('/login'); // Arahkan ke halaman login
    } else {
      // Ini akan tertangkap jika backend merespons 2xx tapi dengan success: false,
      // misal karena ada validasi khusus yang tidak melempar status error 4xx.
      // Namun, backend account.js Anda seharusnya sudah melempar 400 jika username sudah ada.
      error.value = response.message || 'Registrasi gagal.';
    }
  } catch (err) {
    // Catch ini akan menangani error yang dilempar dari `api.js`
    // (baik dari server 4xx/5xx, maupun masalah jaringan).
    if (err.status) {
      // Error dari server (misalnya 400 Bad Request: Username sudah digunakan.)
      error.value = err.message;
      console.error('Register error from server:', err.status, err.message);
    } else {
      // Masalah koneksi jaringan atau error lain saat menyiapkan request
      error.value = 'Gagal terhubung ke server atau terjadi kesalahan jaringan.';
      console.error('Register network/preparation error:', err);
    }
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.register-page-container {
  height: 100vh;
  width: 100%;
  background: linear-gradient(90deg, #D07F30 0%, #D38B32 48.26%, #E5A65D 97.15%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
}

.sizeback {
  height: 30px;
  margin-left: 2rem;
}

.back-button {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 30;
}

.register-card-wrapper {
  position: relative;
  width: 700px;
  min-height: 400px;
}

.illustration-card {
  background: linear-gradient(180deg, #E5A65D 44.5%, #D07F30 100%);
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  margin-right: 3rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.icon {
  height: 350px;
  width: auto;
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
  max-width: 100%;       /* hilangkan batas max */
  width: 100%;           /* isi seluruh lebar container */
  margin-left: 0;        /* pastikan tidak auto-center */
  padding-left: 0.4rem;  /* tambahkan jarak kiri */
  padding-right: 1.5rem; /* opsional: jaga kesimetrisan */
}


.form-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  margin-top: -10px;
  margin-left: 3.6rem;
}


.form-label {
  color: white;
  margin-bottom: 0.25rem;
  display: block;
}

.input-field {
  width: 35%;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  padding: 0.5rem 0;
  outline: none;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-right: 500px;
}

.input-field::placeholder {
  color: #eee;
}

.text-center {
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 12.8px;
  text-decoration: underline;
  margin-right: 27rem;
}

.register-button {
  width: 35%;
  background: linear-gradient(180deg, #E7A048 0%, #C87E2F 100%);
  color: white;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  transition: opacity 0.3s ease;
  margin-top: 1rem;
  margin-right: 20rem;
}

.register-button:hover {
  opacity: 0.3s ease;
}

@media (max-width: 768px) {
  .illustration-card {
    width: 90%;
    height: auto;
  }

  .form-section {
    width: 100%;
    padding: 1.5rem;
  }

  .register-card-wrapper {
    flex-direction: column;
    align-items: center;
  }
}
</style>
