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
            <router-link to="/login"> 
              <button type="submit" class="register-button">Register</button></router-link>
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

<script>
import axios from 'axios'

export default {
  name: "RegisterPage",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleRegister() {
      this.error = ''
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
          username: this.username,
          email: this.email,
          password: this.password
        })

        if (response.data.success) {
          this.$router.push('/login')
        } else {
          this.error = response.data.message || 'Registrasi gagal.'
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Gagal terhubung ke server.'
      }
    }
  }
}
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
