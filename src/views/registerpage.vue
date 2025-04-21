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
            <p class="text-center text-sm text-white mt-4">
              Already have an account?
            </p>
          </div>
        </div>
  
        <!-- Card Ilustrasi di kanan -->
        <div class="illustration-card absolute z-20 right-[-140px] top-1/2 -translate-y-1/2">
          <img src="@/assets/img/SignUpLogin.png" alt="Register Illustration" class="w-[350px] md:w-[420px]" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    data() {
      return {
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      handleRegister() {
        // Sementara hanya arahkan ke login
        this.$router.push('/login');
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
  }
  
  .sizeback {
    height: 30px;
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
    background: #F3A350;
    border-radius: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
  }
  
  .form-section {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(132px);
    border: 1px solid white;
    border-radius: 1.5rem;
    padding: 2.5rem;
    width: 500px;
    height: 330px;
    margin-right: auto;
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
    text-align: center;
  }
  
  .form-label {
    color: white;
    margin-bottom: 0.25rem;
    margin-left: 100px;
    display: block;
  }
  
  .input-field {
    width: 60%;
    background: transparent;
    border: none;
    border-bottom: 1px solid white;
    color: white;
    padding: 0.5rem 0;
    outline: none;
    font-size: 1rem;
    margin-left: 100px;
  }
  
  .input-field::placeholder {
    color: #eee;
  }
  
  .register-button {
    width: 60%;
    background: linear-gradient(180deg, #E7A048 0%, #C87E2F 100%);
    color: white;
    font-weight: 600;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    transition: opacity 0.3s ease;
    margin-top: 1rem;
    margin-left: 100px;
  }
  
  .register-button:hover {
    opacity: 0.9;
  }
  </style>
  