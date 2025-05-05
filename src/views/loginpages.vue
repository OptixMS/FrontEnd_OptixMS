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
            <form @submit.prevent="handleLogin" class="space-y-6">
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
              <a href="#" class="forgot">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        this.$router.push('/dashboard');
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.create,
.forgot {
  font-family: 'Poppins', sans-serif;
  color: white;
  font-size: 12px;
  /* Reset margin supaya sejajar */
  margin: 0;
  margin-left: 200px;
}

/* Container flex untuk create dan forgot */
.action-links {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
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

.login-button:hover {
  opacity: 0.9;
}

  </style>
    