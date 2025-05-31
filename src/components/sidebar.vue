<template>
    <div :class="['sidebar', { expanded: isOpen }]">
      <!-- Burger Menu -->
      <div class="burger" @click="toggleSidebar">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
  
      <!-- Navigation Icons + Labels -->
      <div class="icon-container">
        <router-link to="/dashboard" class="nav-item">
          <img src="@/assets/img/homeicon.png" class="icon-img" />
          <span v-if="isOpen">Dashboard</span>
        </router-link>
        <router-link to="/temperature" class="nav-item">
          <img src="@/assets/img/tempsicon.png" class="icon-img" />
          <span v-if="isOpen">Temperature</span>
        </router-link>
        <router-link to="/site" class="nav-item">
          <img src="@/assets/img/deviceicon.png" class="icon-img" />
          <span v-if="isOpen">Site Device</span>
        </router-link>
        <router-link to="/predict" class="nav-itemp">
          <img src="@/assets/img/predict.png" class="icon-img" />
          <span v-if="isOpen">Predict</span>
        </router-link>
        <router-link to="/maps" class="nav-item">
          <img src="@/assets/img/mapsicon.png" class="icon-img" />
          <span v-if="isOpen">Maps of Site</span>
        </router-link>
        <router-link to="/about" class="nav-item">
          <img src="@/assets/img/abouticon.png" class="icon-img" />
          <span v-if="isOpen">About & Credit</span>
        </router-link>
        <router-link to="/history" class="nav-item">
          <img src="@/assets/img/historyicon.png" class="icon-img" />
          <span v-if="isOpen">History</span>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false
      };
    },
    methods: {
      toggleSidebar() {
        this.isOpen = !this.isOpen;
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
  height: 100vh;
  width: 64px;
  background-color: #2f2f2f;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: width 0.3s ease;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 1rem;
  align-items: flex-start;
}

.sidebar.expanded {
  width: 200px;
}

.burger {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 1rem;
  margin-top: 0.7rem;
  margin-bottom: 1rem;
}

/* Tambahkan jarak lebih besar di bawah burger */
.burger::after {
  content: "";
  display: block;
  height: 2rem; /* Atur sesuai kebutuhan jarak */
}

.bar {
  width: 20px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
}


.icon-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  width: 100%;
  transition: background 0.2s;
}

.nav-item:hover {
  background-color: #444;
  border-radius: 8px;
}

.nav-itemp {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  width: 100%;
  transition: background 0.2s;
}

.nav-itemp:hover {
  background: linear-gradient(to right, #f6ad55, #ed8936);
  border-radius: 8px;
}

.icon-img {
  height: 24px;
  width: 24px;
  object-fit: contain;
}
</style>
  
  