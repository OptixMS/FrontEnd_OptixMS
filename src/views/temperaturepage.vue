<template>
  <div class="temperature-container font-poppins">
    <!-- Header -->
    <div class="cardheader">
      <router-link to="/dashboard">
        <img src="@/assets/img/back.png" alt="Back" class="back" />
      </router-link>
    </div>

    <!-- Title -->
    <div class="cardtitle">
      <h1 class="titletemps">Site Temperature</h1>
    </div>

    <!-- Grid Cards -->
    <div class="card-grid">
      <div
        v-for="site in sites"
        :key="site.name"
        class="cardtemperature"
      >
        <img src="@/assets/img/temperatur.png" alt="Temperature Icon" class="sizeicon" />
        <div class="cardtemps">{{ site.name }}</div>
        <div class="cardtemps">{{ site.temp }}°C</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemperaturePage',
  data() {
    return {
      sites: [
        { name: 'Banggai', temp: 26 },
        { name: 'Bau-Bau', temp: 26 },
        { name: 'Kendari', temp: 26 },
        { name: 'Manado', temp: 26 },
        { name: 'Sofifi', temp: 26 },
        { name: 'Tentena', temp: 26 },
        { name: 'Ternate', temp: 26 },
        { name: 'Tobelo', temp: 26 },
        { name: 'Long Bagun', temp: 26 },
        { name: 'Luwuk', temp: 26 },
        { name: 'Salakan', temp: 26 },
        { name: 'Sanana', temp: 26 },
        { name: 'Sendawar', temp: 26 },
        { name: 'Taliabu', temp: 26 },
        { name: 'Bungku', temp: 26 },
        { name: 'Buranga', temp: 26 },
        { name: 'Lakudo', temp: 26 },
        { name: 'Melong', temp: 26 },
        { name: 'Morotai', temp: 26 },
        { name: 'Ondong', temp: 26 },
        { name: 'Petasia', temp: 26 },
        { name: 'Raha', temp: 26 },
        { name: 'Sawerigadi', temp: 26 },
        { name: 'Tahuna', temp: 26 },
        { name: 'Tidore', temp: 26 },
        { name: 'Wanggudu', temp: 26 },
        { name: 'Wawonii', temp: 26 }
      ]
    };
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Hanya tampil di PC */
@media (max-width: 1023px) {
  body {
    display: none;
  }
}

.temperature-container {
  min-height: 100vh;
  width: 100%;
  background-color: #4f4f4f;
  color: white;
  padding: 2rem 4vw;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0 4vw 4rem;
}

/* Header */
.cardheader {
  background-color: #4f4f4f;
  padding: 1rem 3rem;
  height: 76px;
  width: calc(100% + 10vw); /* 8vw untuk mengimbangi padding kiri + kanan parent */
  margin-left: -4vw; /* kompensasi padding parent agar sejajar kiri */
  margin-right: -4vw; /* opsional: kalau butuh konsisten ke kanan */
  border-bottom: 1.3px solid rgba(62, 62, 62, 0.9); /* hanya bawah dan 90% opacity */
  margin-bottom: 2rem;
  opacity: 0.9;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;
}

.back {
  height: 35px;
  cursor: pointer;
  margin-left: 1rem;
}

/* Title */
.cardtitle {
  background-color: #2f2f2f;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  height: 50px; /* diperbesar sedikit agar teks tidak terpotong */
  width: 97%;
  margin: 20px auto;
  border-radius: 1rem;
  max-width: 1200px;

  display: flex;
  align-items: center;  /* vertikal center */
  justify-content: center;  /* horizontal center */
}

.titletemps {
  background-color: #2f2f2f;
  border-radius: 0.75rem;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}


/* Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cardtemperature {
  background-color: #2f2f2f;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sizeicon {
  height: 130px;
}

.cardtemps {
  color: #fffefe;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.25rem;
}
</style>

