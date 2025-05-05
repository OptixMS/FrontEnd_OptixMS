<template>
  <div class="min-h-screen w-full bg-[#3e3e3e] text-white font-poppins px-20 py-10">
    <!-- Header -->
    <div class="cardheader">
      <router-link to="/dashboard" class="flex items-center">
        <img src="@/assets/img/back.png" alt="Back" class="back" />
      </router-link>
    </div>

    <!-- Title -->
    <div class="cardtitle">
      <h1 class="titletemps">Site Temperature</h1>
    </div>

    <!-- Grid Cards -->
    <div class="grid grid-cols-4 gap-6">
      <div
        v-for="site in sites"
        :key="site.name"
      >

    <!-- Banggai -->
    <div class="cardtemperature">
          <img src="@/assets/img/temperatur.png" alt="About" class="sizeicon" />
          <div class="cardtemps">{{ site.name }}</div>
          <div class="cardtemps">{{ site.temp }}°C</div>
        </div>
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

/* Desktop-only constraint */
@media (max-width: 1023px) {
  body {
    display: none;
  }
}

.sizeicon {
  height: 130px; /* Atur ukuran logo */
 }

.cardtitle {
    background-color: #2f2f2f;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 30px;
    width: 1110px;
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

.back {
  height: 40px; /* Atur ukuran logo */
  margin-left: -34.5rem; /* Geser ke kanan */
  margin-top: 0px;
 }

.logoprofile {
  height: 40px; /* Atur ukuran logo */
  margin-right: 2rem; /* Geser ke kanan */
  margin-left: 50rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
 }

 .cardtemperature {
    background-color: #2f2f2f;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 230px;
    width: 230px;
    margin-left: 15px;
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .titletemps {
    color:#fffefe;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0rem;
    margin-top: 0rem;
    text-align: center;
  }

  .cardtemps {
    color:#fffefe;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0rem;
    margin-top: 0rem;
    text-align: center;
  }

  .cardheader {
    background-color: #3e3e3e;
    border-radius: 1rem;
    box-shadow: inset 0 0 0 1px #292929;
    opacity: 0.9;
    padding: 1rem;
    height: 50px;
    width: 1168px;
    margin-left: -20px;
    margin-bottom: 20px;
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>
