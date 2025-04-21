<template>
  <div class="about-container font-poppins">
    <!-- Header dengan icon back dan profile -->
    <div class="about-header">
      <router-link to="/dashboard" class="flex items-center">
        <img src="@/assets/img/back.png" alt="Back" class="icon-button" />
      </router-link>
      <img src="@/assets/img/iconProfile.png" alt="Profile" class="icon-profile" />
    </div>

    <div class="about-card">
      <!-- Judul -->
      <h1 class="about-title">About Center Palapa Ring</h1>

      <!-- Deskripsi -->
      <p class="about-description">
        Palapa Ring Tengah merupakan bagian dari Proyek KPBU (Kerjasama Pemerintah dengan Badan Usaha) dengan model
        kerjasama Bangun Milik Guna Serah (Build Own Operate Transfer/BOOT). Proyek ini mencakup pembangunan jaringan
        serat optik di wilayah Kalimantan, Sulawesi, dan Kepulauan Maluku Utara, dengan cakupan 17 kabupaten di wilayah
        tersebut.
      </p>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-item">
          <p class="progress-label">Kabel darat</p>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 42%">1.320,15 km</div>
          </div>
        </div>

        <div class="progress-item">
          <p class="progress-label">Kabel laut</p>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 58%">1.823,51 km</div>
          </div>
        </div>

        <div class="progress-item">
          <p class="progress-label">Total panjang kabel</p>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 100%">3.143,66 km</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.about-container {
  min-height: 100vh;
  background-color: #3a3939;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  color: white;
}

.about-header {
  width: 100%;
  max-width: 900px;
  background-color: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  padding: 0.75rem 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-button {
  height: 28px;
  cursor: pointer;
}

.icon-profile {
  height: 35px;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-card {
  background: linear-gradient(135deg, #006666, #0099cc);
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 900px;
}

.about-title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.about-description {
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 2.5rem;
  text-align: justify;
}

.progress-container {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(133.2px);
  border: 1px solid white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-item {
  display: flex;
  flex-direction: column;
}

.progress-label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.progress-bar-bg {
  background-color: #4b4b4b;
  border-radius: 9999px;
  height: 1.5rem;
  overflow: hidden;
}

.progress-bar-fill {
  background: linear-gradient(to right, #f6ad55, #ed8936);
  height: 100%;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
