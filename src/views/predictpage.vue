<template>
    <div class="predict-page">
      <!-- Top Bar -->
      <div class="top-bar">
        <img
          src="@/assets/img/back.png"
          class="icon back-icon"
          alt="Back"
          @click="goToDashboard"
        />
        <img
          src="@/assets/img/iconProfile.png"
          class="icon profile-icon"
          alt="Profile"
        />
      </div>
  
      <!-- Title -->
      <h1 class="title">Predict Result</h1>
  
      <!-- Cards Container -->
      <div class="card-container">
        <!-- Severity Card -->
        <div class="card">
          <h2>Severity</h2>
          <div class="gauge">
            <div class="gauge-inner">
              <div class="semi-circle"></div>
              <div class="value">2</div>
            </div>
            <p class="severity-text">Result of severity is</p>
            <h3 class="severity-level">Minor</h3>
          </div>
        </div>
  
        <!-- Location Card -->
        <div class="card">
          <h2>Location</h2>
          <img
            src="@/assets/img/mapDashboard.png"
            alt="Location Map"
            class="map-img"
          />
          <h3 class="location-name">Manado</h3>
        </div>
  
        <!-- Alarm ID Card -->
        <div class="card">
          <h2>Alarm ID</h2>
          <div class="alarm-info">
            <p class="alarm-id">20</p>
            <h3 class="alarm-type">Relay Alarm Minor</h3>
          </div>
        </div>
      </div>
  
      <!-- Date Section -->
      <div class="date-section">
        <label for="prediction-date">Date:</label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const selectedDate = ref('')
  const router = useRouter()
  
  const goToDashboard = () => {
    router.push('/dashboard')
  }
  
  const handlePrediction = () => {
    alert(`Predicting for date: ${selectedDate.value}`)
  }
  </script>
  
  <style scoped>
  .predict-page {
    background-color: #2c2c2c;
    color: white;
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    padding: 20px;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .icon {
    height: 32px;
    cursor: pointer;
  }
  
  .title {
    text-align: center;
    font-size: 32px;
    margin: 20px 0;
  }
  
  .card-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .card {
    background-color: #1f1f1f;
    border-radius: 16px;
    padding: 20px;
    flex: 1;
    margin: 0 10px;
    text-align: center;
  }
  
  .card h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .gauge {
    position: relative;
  }
  
  .gauge-inner {
    position: relative;
    width: 100%;
    height: 100px;
  }
  
  .semi-circle {
    width: 100px;
    height: 50px;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    background: orange;
    margin: 0 auto;
  }
  
  .value {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
  }
  
  .severity-text {
    margin-top: 10px;
  }
  
  .severity-level {
    font-size: 20px;
    font-weight: bold;
  }
  
  .map-img {
    width: 100%;
    border-radius: 12px;
    margin: 10px 0;
  }
  
  .location-name {
    font-size: 18px;
  }
  
  .alarm-info .alarm-id {
    font-size: 40px;
    font-weight: bold;
  }
  
  .alarm-type {
    margin-top: 10px;
  }
  
  .date-section {
    background: linear-gradient(90deg, #00879E, #005B6B, #003038);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
  }
  
  .date-section label {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .date-section input[type='date'] {
    padding: 5px 10px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
  }
  
  .date-section button {
    margin-left: 10px;
    padding: 5px 15px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background-color: #ffffff;
    color: #003038;
    cursor: pointer;
  }
  </style>
  
  