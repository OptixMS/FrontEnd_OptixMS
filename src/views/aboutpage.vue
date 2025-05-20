<template>
  <div class="about-container font-poppins">
    <!-- Header -->
    <div class="cardheader">
      <router-link to="/dashboard" class="flex items-center">
        <img src="@/assets/img/back.png" alt="Back" class="icon-button" />
      </router-link>
    </div>

    <div class="about-card">
      <!-- Title -->
      <h1 class="about-title">About Center Palapa Ring</h1>

      <!-- Description -->
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
            <div
              class="progress-bar-fill"
              :style="animate ? 'width: 42%' : 'width: 0%'"
              >
            1.320,15 km
            </div>
          </div>
        </div>

        <div class="progress-item">
          <p class="progress-label">Kabel laut</p>
          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill"
              :style="animate ? 'width: 58%' : 'width: 0%'"
              >
              1.823,51 km
            </div>
          </div>
        </div>

        <div class="progress-item">
          <p class="progress-label">Total panjang kabel</p>
          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill"
              :style="animate ? 'width: 99%' : 'width: 0%'"
            >
              3.143,66 km
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      animate: false
    };
  },
  mounted() {
    // Trigger animation when component is mounted
    setTimeout(() => {
      this.animate = true;
    }, 300); // Delay sedikit agar smooth
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.about-container {
  min-height: 100vh;
  width: 100%;
  background-color: #4f4f4f;
  color: white;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}


/* Header */
.cardheader {
  position: relative;
  left: 0;
  right: 0;
  width: 100vw; /* gunakan viewport width */
  max-width: 100vw;
  height: 76px;
  background-color: #4f4f4f;
  padding: 1rem 3rem;
  margin: 0 auto 2rem auto;
  border-bottom: 2px solid rgba(62, 62, 62, 0.9); /* hanya bawah dan 90% opacity */
  opacity: 0.9;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}


.icon-button {
  height: 35px;
  cursor: pointer;
}

.icon-profile {
  height: 35px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* About Card */
.about-card {
  background: linear-gradient(135deg, #006666, #0099cc);
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  margin-bottom: 5rem;
  max-width: 900px;
  box-sizing: border-box;
  margin: 0 auto 3rem auto;
}

.about-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.about-description {
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 2.5rem;
  text-align: justify;
}

/* Progress Bars */
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
  transition: width 1.8s ease-in-out; /* ANIMASI */
}

/* Responsiveness on wide screens */
@media screen and (min-width: 1440px) {
  .about-card {
    padding: 3rem;
    max-width: 1000px;
  }

  .about-title {
    font-size: 2.25rem;
  }
}
</style>
