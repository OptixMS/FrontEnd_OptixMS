<template>
    <div class="login-page-container font-poppins">
      <!-- Icon Back -->
      <router-link to="/" class="back-button">
        <img src="@/assets/img/back.png" alt="Back" class="sizeback" />
      </router-link>
  
      <!-- Card utama -->
      <div class="login-card-wrapper relative">
        <!-- Card ilustrasi: posisi absolute dan menimpa sisi kiri form -->
        <div class="illustration-card absolute z-20 left-[-140px] top-1/2 -translate-y-1/2">
          <img src="@/assets/img/SignUpLogin.png" alt="Login Illustration" class="icon" />
        </div>
  
        <!-- Card Form Login -->
        <div class="form-section relative z-10">
          <div class="form-wrapper mx-auto">
            <h2 class="form-title">Login</h2>
            <form @submit.prevent="login" class="space-y-6">
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
                <label class="form-label">Password</label>
                <input
                  v-model="password"
                  type="password"
                  placeholder="Enter password"
                  class="input-field"
                />
              </div>
              <button type="submit" class="login-button">Login</button>
            </form>
            <div class="action-links text-sm text-white">
              <router-link to="/register" class="create">Create an account</router-link>
              <router-link to="/forgot" class="forgot">Forgot Password?</router-link>
            </div>
            <p v-if="error" class="error-message">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { postRequest } from '../api.js';
  
  const router = useRouter();
  const username = ref('');
  const password = ref(''); // Perbaikan sebelumnya: hapus .value di sini
  const error = ref('');
  
  const login = async () => {
    error.value = '';
    try {
      const data = await postRequest('/api/login', {
        username: username.value,
        password: password.value,
      });
  
      // Jika `postRequest` tidak melempar error, berarti responsnya 2xx (sukses)
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        router.push('/dashboard');
      } else {
        // Ini sebenarnya tidak akan terpanggil jika !res.ok di api.js sudah melempar error
        // Tapi untuk jaga-jaga jika ada kasus 2xx tapi success: false dari backend
        error.value = data.message || 'Login gagal (respons sukses tapi logika gagal).';
      }
    } catch (err) {
      // err sekarang bisa berisi { status, message } dari api.js,
      // atau objek error standar jika ada masalah jaringan.
      if (err.status) {
        // Error dari server (misalnya 401 Unauthorized, 400 Bad Request)
        error.value = err.message;
        console.error('Login error from server:', err.status, err.message);
      } else {
        // Masalah koneksi jaringan atau error lain saat menyiapkan request
        error.value = 'Gagal koneksi ke server atau terjadi kesalahan jaringan.';
        console.error('Login network/preparation error:', err);
      }
    }
  };
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
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  margin-top: -20px;
  margin-left: 330px;
  text-align: center;
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

.error-message {
  color: red;
  margin-left: 240px;
  margin-top: 0.5rem;
}


.login-button:hover {
  opacity: 0.9;
}

  </style>
    