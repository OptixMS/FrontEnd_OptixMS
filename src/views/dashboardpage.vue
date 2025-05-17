<template>
  <div class="min-h-screen w-full font-poppins bg-[#4f4f4f] py-6 text-white overflow-hidden">
    <!-- Header -->
    <div class="cardheader">
      <img src="@/assets/img/logo.png" alt="OptixMS Logo" class="logo" />
      <img @click="goToProfile" src="@/assets/img/profilenew.png" alt="Profile" class="icon-profile" /> 
    </div>

    <!-- Grid Cards with responsive layout -->
    <div class="responsive-grid"></div>

    <!-- Grid Cards with horizontal padding -->
    <div class="grid grid-cols-3 gap-8 px-16">
      <!-- Site Temperature -->
      <div @click="goToTemperature" class="cardtemperature transition cursor-pointer">
        <h2 class="card-title">Site Temperature</h2>
        <img src="@/assets/img/temperatur.png" alt="Temperature Icon" class="size" />
      </div>

      <!-- Welcome -->
      <div class="cardwelcome">
        <h2 class="card-title-welcome">Welcome, user! 👋</h2>
      </div>

      <!-- About -->
      <div @click="goToAbout" class="cardabout cursor-pointer">
        <h2 class="card-titleabout">About Palapa Ring</h2>
        <img src="@/assets/img/aboutLogo.png" alt="About" class="size" />
      </div>

      <!-- Site Device -->
      <div @click="goToSite" class="cardsite transition cursor-pointer">
        <h2 class="card-titlesite">Site Device</h2>
        <img src="@/assets/img/device.png" alt="Device" class="size" />
      </div>

      <!-- Map of Site -->
      <div @click="goToMaps" class="cardmaps transition cursor-pointer">
        <h2 class="card-titlemaps">Map of Site</h2>
        <img src="@/assets/img/mapDashboard.png" alt="Map" class="sizemap" />
      </div>

      <!-- History -->
      <div @click="goToHistory" class="cardhistory transition cursor-pointer">
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
      <div class="form-group">
          <label for="file" class="floating-label">Input File</label>
          <input id="file" type="file" class="custom-input input-file" />
      </div>

      <!-- Input Date -->
      <div class="form-group">
          <label for="date" class="floating-label">Input Date</label>
          <input id="date" type="date" class="custom-input input-date" />
      </div>
      </div>

      <!-- Kanan: Button Predict -->
      <div class>
      <button @click="goToPredict" class="predict-button cursor-pointer">
        Predict Now
      </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const selectedDate = ref('')
const selectedFile = ref(null)
const router = useRouter()

onMounted(() => {
  username.value = localStorage.getItem('username') || 'User'
})

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const handlePredict = async () => {
  if (!selectedFile.value || !selectedDate.value) {
    alert('Mohon pilih file dan tanggal terlebih dahulu.')
    return
  }

  const formData = new FormData()
  formData.append('csv_file', selectedFile.value)
  formData.append('tanggal', selectedDate.value)

  try {
    const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/uploadcsv`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    console.log('Upload success:', uploadRes.data.message)

    const predictRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/predict`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    console.log('Prediksi:', predictRes.data)

    localStorage.setItem('predictionResults', JSON.stringify(predictRes.data.rows))
    router.push('/predict')

  } catch (err) {
    console.error(err)
    alert('Gagal melakukan prediksi. Cek file dan tanggal.')
  }
}

const goToTemperature = () => router.push('/temperature')
const goToAbout = () => router.push('/about')
const goToMaps = () => router.push('/maps')
const goToSite = () => router.push('/site')
const goToHistory = () => router.push('/history')
const goToLanding = () => router.push('/')
const goToProfile = () => router.push('/profile')
const goToPredict = () => router.push('/predict')
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
margin-right: 4.5rem;
}

.icon-profile:hover {
  transform: scale(1.05);
}

.cardheader {
  background-color: #4f4f4f;
  border-radius: 1rem;
  padding: 1rem 2rem;
  height: 43px;
  width: 100%;
  border-bottom: 1.3px solid rgba(62, 62, 62, 0.9); /* hanya bawah dan 90% opacity */
  opacity: 0.9;
  margin-left: -20px;
  margin-bottom: 20px;
  margin-top: 0px;
  display: flex;
  flex-direction: row;
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

.cardmaps:hover {
  transform: scale(1.05);
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

.cardtemperature:hover {
  transform: scale(1.05);
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

.cardabout:hover {
  transform: scale(1.05);
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

.cardsite:hover {
  transform: scale(1.05);
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

.cardhistory:hover {
  transform: scale(1.05);
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
  background-color: #2f2f2f;
  color: white;
  font-size: 14.5px;
  font-weight: 700;
  padding: 0.75rem 2rem; /* Lebih masuk akal untuk tombol */
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px; /* agar tinggi tombol konsisten */
  margin-right: 20px;
}

.predict-button:hover {
  transform: scale(1.05);
}


.button-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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

.form-group {
  position: relative;
  margin-bottom: 0.75rem;
  width: 50%;         /* lebih kecil */
  max-width: 250px;   /* batasi lebar maksimal */
  margin-left: auto;
  margin-right: auto;
  border-radius: 0;
}

.floating-label {
  position: absolute;
  top: -6px;
  left: 10px;
  background-color: #2f2f2f;
  padding: 1px 6px;
  font-weight: 600;
  font-size: 0.65rem;     /* lebih kecil */
  color: white;
  border-radius: 10px 10px 0 0;
  z-index: 2;
}

.custom-input {
  width: 100%;
  padding: 0.4rem 0.6rem;
  background: #ffffff;
  color: rgb(255, 255, 255);
  font-size: 0.1rem;     /* kecilkan tulisan input */
  font-weight: 500;
  border: none;
  border-radius: 0.65rem;
  box-sizing: border-box;
  height: 30px;
  border-radius: 0;
}

.custom-input::placeholder {
  color: #666;
  font-weight: 500;
  font-size: 1.25rem;
  font-style: italic;
  border-radius: 0;
}



.label {
font-size: 12px;
color: white;
margin-bottom: 1px;
display: block;
font-weight: 500;
position: absolute;
top: -12px;
left: 15px;
background: #2f2f2f;
padding: 0 8px;
font-size: 0.9rem;
font-weight: 600;
border-radius: 8px 8px 0 0;
z-index: 1;
}

.input-file,
.input-date {
  width: 100%;
  padding: 1.25rem 1rem 0.75rem;
  background: #2f2f2f;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  border: none;
  border-radius: 1rem;
  box-sizing: border-box;
  appearance: none;
  position: relative;
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


@media (max-width: 768px) {
  .responsive-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .cardtemperature,
  .cardabout,
  .cardsite,
  .cardhistory {
    width: 90% !important;
    margin: 0 auto !important;
  }

  .predict-button {
    width: 100%;
    margin: 0 auto;
  }

  .custom-input {
    font-size: 0.75rem;
  }
}

</style>