<template>
  <div class="map-page-container font-poppins">
    <!-- Header n Back -->
    <div class="cardheader">
      <router-link to="/dashboard" class="flex items-center">
        <img src="@/assets/img/back.png" alt="Back" class="icon-button" />
      </router-link>
      <img src="@/assets/img/iconProfile.png" alt="Profile" class="sizeicon" />
    </div>

    <!-- Title -->
    <div class="title-card">
      <h1 class="titles">Maps of Central Palapa Ring</h1>
    </div>

    <!-- Map Image -->
    <div class="map-wrapper">
      <img src="@/assets/img/fullMaps.png" alt="Map Central Palapa Ring" class="rounded-xl w-full h-auto" />
    </div>

    <!-- About Site Title -->
    <div class="title-card mt-6 cursor-pointer hover:opacity-90 transition">
      <h2 class="titleabout">About Site</h2>
    </div>

    <!-- About Site Table -->
    <div class="table-wrapper">
      <table class="site-table">
        <thead>
          <tr>
            <th>Site</th>
            <th>Kab./Kota</th>
            <th>Provinsi</th>
            <th>Longitude & Latitude</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(site, index) in siteData" :key="index">
            <td>{{ site.site }}</td>
            <td>{{ site.kabkota }}</td>
            <td>{{ site.provinsi }}</td>
            <td>{{ site.longlat }}</td>
            <td>{{ site.catatan }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MapPage',
  data() {
    return {
      siteData: [
        { site: 'Long Bagun', kabkota: 'Mahakam Ulu', provinsi: 'Kalimantan Timur', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Sendawar', kabkota: 'Kutai Barat', provinsi: 'Kalimantan Timur', longlat: "115°40'0.44\"E 0°13'54.19\"S", catatan: 'Interconnection Point' },
        { site: 'Bungku', kabkota: 'Morowali', provinsi: 'Sulawesi Tengah', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Petasia', kabkota: 'Morowali', provinsi: 'Sulawesi Tengah', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Tentena', kabkota: 'Poso', provinsi: 'Sulawesi Tengah', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
        { site: 'Wanggudu', kabkota: 'Konawe Utara', provinsi: 'Sulawesi Tenggara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Kendari', kabkota: 'Kota Kendari', provinsi: 'Sulawesi Tenggara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
        { site: 'Wawonii', kabkota: 'Konawe Kep.', provinsi: 'Sulawesi Tenggara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Raha', kabkota: 'Muna', provinsi: 'Sulawesi Tenggara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Sawerigadi', kabkota: 'Muna Barat', provinsi: 'Sulawesi Tenggara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Lakudo', kabkota: 'Buton Tengah', provinsi: 'Sulawesi Tenggara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Buranga', kabkota: 'Buton Utara', provinsi: 'Sulawesi Tenggara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Bau-Bau', kabkota: 'Kota Bau-Bau', provinsi: 'Sulawesi Tenggara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
        { site: 'Taliabu', kabkota: 'Pulau Taliabu', provinsi: 'Maluku Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Sanana', kabkota: 'Kep. Sula', provinsi: 'Maluku Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
        { site: 'Salakan', kabkota: 'Banggai Kep.', provinsi: 'Sulawesi Tengah', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Banggai', kabkota: 'Banggai', provinsi: 'Sulawesi Tengah', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Luwuk', kabkota: 'Banggai', provinsi: 'Sulawesi Tengah', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
        { site: 'Morotai', kabkota: 'Halmahera Utara', provinsi: 'Maluku Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Tobelo', kabkota: 'Kab. Halmahera Utara', provinsi: 'Maluku Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
        { site: 'Ternate', kabkota: 'Kota Ternate', provinsi: 'Maluku Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Sofifi', kabkota: 'Kota Sofifi', provinsi: 'Maluku Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
        { site: 'Ondong Siau', kabkota: 'Kep. Siau Tagulandang Biaro', provinsi: 'Sulawesi Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Tahuna', kabkota: 'Kep. Sangihe', provinsi: 'Sulawesi Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
        { site: 'Melonguane', kabkota: 'Kep. Talaud', provinsi: 'Sulawesi Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Service Point' },
        { site: 'Manado', kabkota: 'Kota Manado', provinsi: 'Sulawesi Utara', longlat: "115°14'29.51\"E 0°30'50.87\"N", catatan: 'Interconnection Point' },
      ]
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.titles {
  color: #ffffff;
  margin-top: 0px;
  margin-left: 210px;
  font-weight: 600;
}

.titleabout {
  color: #ffffff;
  margin-top: 2px;
  margin-left: 380px;
  font-weight: 600;
}

.icon-button {
  height: 35px;
  cursor: pointer;
  margin-left: 7rem;
}

.sizeicon {
  height: 40px;
  margin-right: 100px;
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

.cardheader {
  background-color: #3e3e3e;
  border-radius: 0;
  padding: 1rem 2rem;
  height: 50px;
  width: 1135px;
  box-shadow: inset 0 0 0 1px #292929;
  opacity: 0.9;
  margin-left: -20px;
  margin-bottom: 0px;
  margin-top: -35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.title-card {
  background-color: #292929;
  border-radius: 12px;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
  width: 875px;
  height: 40px;
  margin-top: 25px;
}

.map-wrapper {
  width: 100%;
  max-width: 900px;
  background-color: #1f1f1f;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.35);
}

/* Tambahan untuk Card Table */
.table-card {
  background-color: #2F2F2F;
  border-radius: 12px;
  padding: 1rem 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  width: 875px;
}

.table-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

.table-wrapper {
  margin-top: 0rem;
  width: 80%;
  max-width: 1100px;
  overflow-x: auto;
  background-color: #2f2f2f;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.site-table {
  width: 100%;
  border-collapse: collapse;
}

.site-table th,
.site-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #444;
  color: #ddd;
}

.site-table th {
  background-color: #1f1f1f;
  font-weight: 600;
}

.site-table tbody tr:hover {
  background-color: #3d3d3d;
}
</style>
