<template>
    <div class="edit-profile-page">
      <div class="cardheader">
      <router-link to="/profile">
        <img src="@/assets/img/back.png" alt="Back" class="icon-back" />
      </router-link>
    </div>
  
      <div class="profile-content">
  
        <div class="form-group">
          <label>Name:</label>
          <input type="text" v-model="name" placeholder="Enter your name" />
        </div>
  
        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="password" placeholder="Enter your password" />
        </div>
  
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="email" placeholder="Enter your email" />
        </div>
  
        <div class="button-group">
          <button class="submit-button" @click="submitProfile">Submit edit profile</button>
        </div>

        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const message = ref('');
const messageClass = ref('');
const loading = ref(false);
const initialError = ref('');
const oldUsername = ref(localStorage.getItem('username')); // Gunakan ref

// URL dasar API Anda
const baseUrl = import.meta.env.VITE_API_URL;

// Fungsi untuk mengambil data profil (GET request)
async function fetchEditProfileData() {
  loading.value = true;
  initialError.value = '';

  const token = localStorage.getItem('token');
  
  if (!oldUsername.value || !token) {
    initialError.value = 'Anda belum login atau sesi habis. Mengarahkan ke halaman login...';
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
    loading.value = false;
    return;
  }

  try {
    // Menggunakan fetch API untuk GET request
    const res = await fetch(`${baseUrl}/api/account/editprofile/${oldUsername.value}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Tambahkan ini meskipun GET
      },
    });

    // Periksa status respons
    if (!res.ok) {
      const errorData = await res.json();
      throw { status: res.status, message: errorData.message || 'Gagal memuat data profil dari server.' };
    }

    const data = await res.json();

    if (data.success) {
      name.value = data.data.username;
      email.value = data.data.email;
      // Password tidak diisi dari GET request untuk keamanan
    } else {
      throw { message: data.message || 'Gagal memuat data profil. Respons sukses tapi data tidak valid.' };
    }
  } catch (err) {
    console.error('Error fetching edit profile data:', err);
    if (err.status) {
      initialError.value = err.message;
      if (err.status === 401 || err.status === 403) {
        initialError.value = 'Sesi Anda tidak valid. Mengarahkan ke halaman login...';
        setTimeout(() => {
          router.push('/edit');
        }, 1500);
      }
    } else {
      initialError.value = 'Terjadi kesalahan jaringan. Mohon periksa koneksi Anda.';
    }
  } finally {
    loading.value = false;
  }
}

// Fungsi untuk submit perubahan profil (PUT request)
async function submitProfile() {
  message.value = '';
  messageClass.value = '';

  if (!name.value || !email.value || !password.value) {
    message.value = "Semua kolom wajib diisi.";
    messageClass.value = 'error-message';
    return;
  }

  const token = localStorage.getItem('token');

  try {
    // Menggunakan fetch API untuk PUT request
    const res = await fetch(`${baseUrl}/api/editprofile/${oldUsername.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        newUsername: name.value,
        newEmail: email.value,
        newPassword: password.value
      }),
    });

    // Periksa status respons
    if (!res.ok) {
      const errorData = await res.json();
      throw { status: res.status, message: errorData.message || 'Gagal memperbarui profil dari server.' };
    }

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('username', name.value); // Perbarui username di localStorage
      message.value = "Edit profile berhasil.";
      messageClass.value = 'success-message';
      setTimeout(() => {
        router.push('/profile'); // Redirect ke halaman profil setelah update
      }, 1500);
    } else {
      throw { message: data.message || 'Gagal memperbarui profil. Respons sukses tapi data tidak valid.' };
    }
  } catch (err) {
    console.error('Error submitting profile:', err);
    if (err.status) {
      message.value = err.message;
      if (err.status === 401 || err.status === 403) {
        message.value = 'Sesi Anda tidak valid. Mengarahkan ke halaman login...';
        setTimeout(() => {
          router.push('/edit');
        }, 1500);
      }
    } else {
      message.value = 'Terjadi kesalahan jaringan. Mohon periksa koneksi Anda.';
    }
    messageClass.value = 'error-message';
  }
}

    onMounted(() => {
      fetchEditProfileData();
    });
    </script>


  
  <style scoped>
  .edit-profile-page {
  min-height: 100vh;
  background-color: #4f4f4f;
  color: rgb(0, 0, 0);
  font-family: 'Poppins', sans-serif;
  padding: 0; /* ubah dari 20px jadi 0 */
  position: relative;
  overflow-x: hidden;
  }

  .cardheader {
  position: absolute; /* ubah dari relative */
  top: 0;
  left: 0;
  width: 100%;
  height: 76px;
  background-color: #4f4f4f;
  padding: 1rem 3rem;
  border-bottom: 1.3px solid rgba(62, 62, 62, 0.9);
  opacity: 0.9;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  }


.icon-back {
  height: 30px;
  cursor: pointer;
  padding-bottom: 0rem;
}
  
  .back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
  }
  
  .back-button img {
    margin-left: 2rem;
    margin-top: 1rem;
    height: 32px;
  }
  
  .profile-content {
  max-width: 400px;
  margin: 150px auto 0; /* dari 80px → 100px utk ngasih spasi header */
  text-align: center;
  }

  
  .avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: white;
    padding: 8px;
    margin-bottom: 10px;
  }
  
  .change-photo {
    display: block;
    font-size: 14px;
    color: white;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-group label {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 5px;
    display: block;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #222;
    color: white;
    border-radius: 8px;
    font-size: 18px;
  }
  
  .button-group {
    margin-top: 30px;
  }
  
  .submit-button {
    width: 105%;
    padding: 12px;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: bold;
    background: linear-gradient(90deg, #00879E 0%, #005B6B 100%);
    color: white;
    cursor: pointer;
  }
  
  .submit-button:hover {
    opacity: 0.9;
  }
  </style>
  
  