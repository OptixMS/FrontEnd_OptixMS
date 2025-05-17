<template>
  <div class="history-page font-poppins text-white">
    <!-- Header -->
    <div class="cardheader">
      <router-link to="/dashboard">
        <img src="@/assets/img/back.png" alt="Back" class="back-button" />
      </router-link>
    </div>

    <!-- Main Content -->
    <div class="main-container">
      <!-- Left: History Table -->
      <div class="history-table">
        <div class="table-title">Predict History</div>
        <div class="table-rows">
          <div
            v-for="(entry, index) in historyData"
            :key="index"
            class="table-row"
          >
            <span class="col-number">{{ index + 1 }}</span>
            <span class="col-date">{{ entry.date }}</span>
            <span class="col-severity">Severity: {{ entry.severity }}</span>
          </div>
        </div>
      </div>

      <!-- Right: Side Panel -->
      <div class="side-panel">
        <button class="action-button">Delete all history</button>
        <button class="action-button">Export History</button>
        <div class="placeholder-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryPage",
  data() {
    return {
      historyData: [
        { date: "01 March 2025", severity: "Critical.5" },
        { date: "28 February 2025", severity: "Minor.20" },
        { date: "27 February 2025", severity: "Mayor.10" },
        { date: "26 February 2025", severity: "Warning.15" },
        { date: "25 February 2025", severity: "Mayor.13" },
      ],
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.history-page {
  background-color: #4f4f4f;
  min-height: 100vh;
  padding: 0 4vw 4rem;
  box-sizing: border-box;
  overflow-x: hidden;
}

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
  overflow-x: hidden;
}

.back-button {
  height: 35px;
  cursor: pointer;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .main-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

/* History Table */
.history-table {
  flex: 1;
}

.table-title {
  background-color: #2f2f2f;
  color: #ffffff;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.table-rows {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.table-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1.7rem;
}

.col-number {
  width: 2rem;
  color: #ffffff;
}

.col-date {
  flex: 1;
  color: #ffffff;
}

.col-severity {
  text-align: right;
  color: #ffffff;
}

/* Side Panel */
.side-panel {
  width: 100%;
  max-width: 280px;
  background: linear-gradient(to bottom, #00727E, #003038);
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
}

.action-button {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  background: linear-gradient(to bottom, #F8AC57, #BE753E);
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.placeholder-box {
  border: 1px solid white;
  border-radius: 0.5rem;
  height: 18rem;
}
</style>
