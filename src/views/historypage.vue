<template>
  <div class="history-page font-poppins text-white">
    <!-- Back button -->
    <router-link to="/dashboard" class="back-button">
      <img src="@/assets/img/back.png" alt="Back" class="w-6" />
    </router-link>

    <!-- Header + Table + Side Panel -->
    <div class="main-container">
      <!-- Left: Table -->
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

      <!-- Right: Side panel -->
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
  background-color: #3a3a3a;
  min-height: 100vh;
  position: relative;
  padding: 2rem 1rem;
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.main-container {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 3rem;
}

@media (min-width: 768px) {
  .main-container {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* Table section */
.history-table {
  flex: 1;
}

.table-title {
  background-color: #2e2e2e;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.table-rows {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.table-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #555;
  padding-bottom: 0.5rem;
  font-size: 1rem;
}

.col-number {
  width: 2rem;
}

.col-date {
  flex: 1;
}

.col-severity {
  text-align: right;
}

/* Side panel */
.side-panel {
  width: 100%;
  max-width: 280px;
  background: linear-gradient(to bottom, #00727E, #003038);
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-button {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  background: linear-gradient(to bottom, #F8AC57, #BE753E);
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.placeholder-box {
  border: 1px solid white;
  border-radius: 0.5rem;
  height: 10rem;
}
</style>
