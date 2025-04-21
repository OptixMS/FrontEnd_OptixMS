<template>
    <div class="map-page-container font-poppins">
      <!-- Back Icon -->
      <router-link to="/dashboard" class="absolute top-5 left-6">
        <img src="@/assets/img/back.png" alt="Back" class="sizeback" />
      </router-link>
  
      <!-- User Icon -->
      <div class="absolute top-5 right-6">
        <img src="@/assets/img/iconProfile.png" alt="User Profile" class="sizeicon" />
      </div>
  
      <!-- Title -->
      <div class="title-card">
        <h1 class="titles">Maps of Central Palapa Ring</h1>
      </div>
  
      <!-- Map Image -->
      <div class="map-wrapper">
        <img src="@/assets/img/fullMaps.png" alt="Map Central Palapa Ring" class="rounded-xl w-full h-auto" />
      </div>
  
      <!-- About Site Button -->
      <div class="title-card mt-6 cursor-pointer hover:opacity-90 transition">
        <h2 class="text-white text-lg text-center">About Site</h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MapPage'
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }

  .titles {
    color: white;
    margin-top: 0px;
    margin-left: 210px;
    font-weight: 600;
  }

  .sizeback {
    height: 40px;
    margin-right: 1000px;
  }

  .sizeicon {
    height: 40px;
    margin-left: 1000px;
    margin-top: 0px;
  }
  
  .map-page-container {
    position: relative;
    min-height: 100vh;
    background-color: #3e3e3e;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .title-card {
    background-color: #2F2F2F;
    border-radius: 12px;
    padding: 1rem 2rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    margin-bottom: 1.5rem;
    width: 875px;
    height: 40px;
    margin-top: 75px;
  }
  
  .map-wrapper {
    width: 100%;
    max-width: 900px;
    background-color: #1f1f1f;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.35);
  }
  </style>
  