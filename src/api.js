// src/api.js
const baseUrl = import.meta.env.VITE_API_URL;

async function postRequest(path, data) {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // Periksa apakah respons OK (status 2xx)
    if (!res.ok) {
      // Jika tidak OK, coba parse sebagai JSON untuk mendapatkan pesan error dari backend
      const errorData = await res.json();
      // Lempar error dengan status dan pesan dari backend
      throw { status: res.status, message: errorData.message || 'Kesalahan dari server.' };
    }

    // Jika respons OK, parse sebagai JSON
    return await res.json();

  } catch (error) {
    // Ini akan menangkap masalah jaringan atau error yang dilempar dari blok if (!res.ok)
    // dan juga error dari res.json() jika respons bukan JSON
    console.error('Error in postRequest:', error);
    // Lempar ulang error agar bisa ditangkap di komponen Vue
    throw error;
  }
}

export { postRequest };