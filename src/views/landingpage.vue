<template>
  <div class="landing-page">
    <!-- Background -->
    <div class="background-image"></div>

    <!-- Overlay untuk konten -->
    <div class="overlay">
      <!-- Header -->
      <div class="header">
        <img src="@/assets/img/logo.png" alt="OptixMS Logo" class="logo" />
        <div class="auth-buttons">
           <router-link to="/register" class="btn">Sign Up</router-link>
           <router-link to="/login" class="btn">Login</router-link>
        </div>
      </div>

      <!-- Main Content -->
      <div class="content">
        <h1 class="title">About<br />The Project</h1>
        <p class="description">
          Our project focuses on developing a predictive maintenance system for optical networks using machine learning. 
          By analyzing key network parameters, our system can detect potential failures before they occur, reducing downtime 
          and improving overall network reliability. This solution enables proactive maintenance, ensuring optimal performance 
          and efficiency for high-speed optical communication systems.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Saat ini landing page hanya navigasi, tidak butuh koneksi API
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Poppins&display=swap');

.landing-page {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.background-image {
  background-image: url('@/assets/img/LandingPage.png');
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
}

.overlay {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 40px; /* Atur ukuran logo */
  margin-left: 1rem; /* Geser ke kanan */
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: -1rem;
  border: none;
  background: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10.8px);
  -webkit-backdrop-filter: blur(10.8px);
  color: white;
  font-weight: 500;
  font-size: medium;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none; /* Hapus underline */
  font-family: 'Poppins', sans-serif; /* Pastikan pakai font yang sama */
  display: inline-block; /* Supaya tampil kayak tombol */
}

.btn:hover {
  opacity: 0.8;
}

.content {
  padding: 1rem 0 2rem 0; /* Naikkan sedikit kontennya */
}

.title {
  font-family: 'Inter', sans-serif;
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.2;
  padding-left: 3rem;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.description {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6; /* 1 baris = ±1.6em */
  max-width: 70%;
  padding-left: 3rem;
  margin-top: -1rem;
  text-align: justify;
  margin-bottom: 3rem;

  max-height: 9rem; /* 5 x 1.6rem = 8rem */
  overflow: hidden;
}
</style>