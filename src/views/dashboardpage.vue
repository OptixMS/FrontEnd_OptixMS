<template>
    <div class="min-h-screen w-full font-poppins bg-[#3e3e3e] py-6 text-white overflow-hidden">
      <!-- Header -->
      <div @click="goToLanding" class="cardheader">
        <img src="@/assets/img/logo.png" alt="OptixMS Logo" class="logo" /> 
      </div>

      <!-- Grid Cards with horizontal padding -->
      <div class="grid grid-cols-3 gap-8 px-16">
        <!-- Site Temperature -->
        <div @click="goToTemperature" class="cardtemperature hover:scale-105 transition cursor-pointer">
          <h2 class="card-title">Site Temperature</h2>
          <img src="@/assets/img/temperatur.png" alt="Temperature Icon" class="size" />
        </div>
  
        <!-- Welcome -->
        <div class="cardwelcome">
          <h2 class="card-title-welcome">Welcome, user! 👋</h2>
        </div>
  
        <!-- About -->
        <div @click="goToAbout" class="cardabout hover:scale-105 transition cursor-pointer">
          <h2 class="card-titleabout">About Palapa Ring</h2>
          <img src="@/assets/img/aboutLogo.png" alt="About" class="size" />
        </div>
  
        <!-- Site Device -->
        <div @click="goToSite" class="cardsite hover:scale-105 transition cursor-pointer">
          <h2 class="card-titlesite">Site Device</h2>
          <img src="@/assets/img/device.png" alt="Device" class="size" />
        </div>
  
        <!-- Map of Site -->
        <div @click="goToMaps" class="cardmaps hover:scale-105 transition cursor-pointer">
          <h2 class="card-titlemaps">Map of Site</h2>
          <img src="@/assets/img/mapDashboard.png" alt="Map" class="sizemap" />
        </div>
  
        <!-- History -->
        <div @click="goToHistory" class="cardhistory hover:scale-105 transition cursor-pointer">
          <h2 class="card-titlehistory">History</h2>
          <img src="@/assets/img/history.png" alt="History" class="size" />
        </div>
  
        <!-- Prediction -->
        <div
          class="cardpredict"
          style="background: linear-gradient(90deg, #00697C 0%, #FFAB5B 100%);"
        >
          <button class="bg-black/30 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:scale-105 transition">
            Predict now
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const goToTemperature = () => {
    router.push('/temperature')
  }
  const goToAbout = () => {
    router.push('/about')
  }
  const goToMaps = () => {
    router.push('/maps')
  }
  const goToSite = () => {
    router.push('/site')
  }
  const goToHistory = () => {
    router.push('/history')
  }
  const goToLanding = () => {
    router.push('/')
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }

  .sizemap {
  height: 300px; /* Atur ukuran logo */
  margin-bottom: 10px;
 }

  .size {
  height: 175px; /* Atur ukuran logo */
  margin-bottom: -18px;
 }

.logo {
  height: 40px; /* Atur ukuran logo */
  margin-left: -62rem; /* Geser ke kanan */
  margin-top: 0px;
 }

 .logoprofile {
  height: 40px; /* Atur ukuran logo */
  margin-right: -200rem; /* Geser ke kanan */
  margin-left: 66rem;
  margin-top: -300rem;
  margin-bottom: 1rem;
 }
 
 .cardheader {
    background-color: #292929;
    border-radius: 1rem;
    border-bottom: 10px, #292929;
    padding: 1rem;
    height: 50px;
    width: 1200px;
    margin-left: -20px;
    margin-bottom: 20px;
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cardmaps {
    background-color: #3e3e3e;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 300px;
    width: 450px;
    margin-left: -45px;
    margin-bottom: 50px;
    margin-top: -165px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .cardtemperature {
    background-color: #3e3e3e;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 250px;
    width: 250px;
    margin-left: 45px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cardwelcome {
    background-color: #3e3e3e;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 60px;
    width: 450px;
    margin-left: -45px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cardabout {
    background-color: #3e3e3e;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 250px;
    width: 250px;
    margin-left: 62px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cardsite {
    background-color: #3e3e3e;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 250px;
    width: 250px;
    margin-left: 45px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cardhistory {
    background-color: #3e3e3e;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 250px;
    margin-left: 62px;
    width: 250px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cardpredict {
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    height: 70px;
    width: 450px;
    margin-left: 350px;
    margin-top: -105px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .card-title-welcome {
    color:#fffefe;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .card-title {
    color:#fffefe;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 2rem;
    margin-top: -3.8rem;
    margin-left: -8rem;
    text-align: right;
  }

  .card-titleabout {
    color:#fffefe;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 2rem;
    margin-top: -3.8rem;
    margin-left: -7rem;
    text-align: right;
  }

  .card-titlesite {
    color:#fffefe;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 2rem;
    margin-top: -3.6rem;
    margin-left: -10.5rem;
    text-align: right;
  }

  .card-titlehistory {
    color:#fffefe;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 2rem;
    margin-top: -3.6rem;
    margin-left: -12rem;
    text-align: right;
  }

  .card-titlemaps {
    color:#fffefe;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
    margin-left: -0.3rem;
    text-align: right;
  }
  </style>
  