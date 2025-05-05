<template>
    <div class="min-h-screen w-full font-poppins bg-[#3e3e3e] py-6 text-white overflow-hidden">
      <!-- Header -->
      <div class="cardheader">
        <img src="@/assets/img/logo.png" alt="OptixMS Logo" class="logo" />
        <img @click="goToProfile" src="@/assets/img/iconProfile.png" alt="Profile" class="icon-profile" /> 
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
        <div class="flex flex-row items-center justify-between w-full p-4 gap-6">
        <!-- Kiri: Input File + Input Date -->
        <div class="flex flex-col gap-4 w-2/3">
        <!-- Upload File -->
        <div class="input-file-container">
          <label class="label">Upload File</label>
          <input type="file" @change="handleFileChange" class="input-file" />
        </div>

        <!-- Input Date -->
        <div class="input-date-container">
          <label class="label">Select Date</label>
          <input type="date" v-model="selectedDate" class="input-date" />
        </div>
        </div>

        <!-- Kanan: Button Predict -->
        <div class="predict-button-container w-1/3 flex justify-center">
        <button @click="goToPredict" class="predict-button hover:scale-105 transition cursor-pointer">
          Predict Now
        </button>
            </div>
          </div>
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
  const goToPredict = () => {
    router.push('/predict')
  }
  const goToProfile = () => {
    router.push('/profile')
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
  margin-left: 2rem;
 }

.icon-profile {
  height: 35px;
  margin-right: 3rem;
}
 
 .cardheader {
  background-color: #3e3e3e;
  border-radius: 1rem;
  padding: 1rem 2rem; /* padding horizontal */
  height: 50px;
  width: 1168px;
  box-shadow: inset 0 0 0 1px #292929;
  opacity: 0.9;
  margin-left: -20px;
  margin-bottom: 20px;
  margin-top: 0px;
  display: flex;
  flex-direction: row; /* ini diubah ke row! */
  align-items: center;
  justify-content: space-between;
  }

  .cardmaps {
    background-color: #2f2f2f;
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
    background-color: #2f2f2f;
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
    background-color: #2f2f2f;
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
    background-color: #2f2f2f;
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
    background-color: #2f2f2f;
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
    background-color: #2f2f2f;
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
    height: 78px;
    width: 450px;
    margin-left: 350px;
    margin-top: -110px;
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

  .predict-button {
  background: #2f2f2f;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  width: 500rem; /* biar button lebar */
  height: 50px;
  margin-left: -3rem;
  }

  .titleuploadfile {
    color: #292929;
    font-size: 1rem;
    font-weight: 600;
    width: 137px;
    height: 50px;
    margin-bottom: 0.2rem;
    margin-left: -0.3rem;
    text-align: center;
  }

  .input-file::file-selector-button {
  background: #005b6b;
  border: none;
  margin-top: -0.3rem;
  height: 5px;
  padding: 10px;
  color: rgb(0, 0, 0);
  border-radius: 6px;
  cursor: pointer;
}

.label {
  font-size: 12px;
  color: white;
  margin-bottom: 1px;
  display: block;
  font-weight: 500;
}

.input-file,
.input-date {
  width: 70%;
  padding: 10px;
  height: 4px;
  background: #2f2f2f;
  color: rgb(255, 255, 255);
  border-radius: 6px;
  border: none;
  font-size: 14px;
}

  select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1.5rem;
  }

  input[type="file"]::file-selector-button {
  background-color: #444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

  </style>
  