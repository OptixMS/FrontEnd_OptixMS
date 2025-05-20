<template>
  <div class="profile-container font-poppins">
    <!-- Header -->
    <div class="cardheader">
      <router-link to="/dashboard">
        <img src="@/assets/img/back.png" alt="Back" class="icon-back" />
      </router-link>
    </div>

    <!-- Profile Icon -->
    <div class="content-wrapper">
      <div class="avatar-wrapper">
      <img src="@/assets/img/profilenew.png" alt="Profile Icon" class="profile-icon" />
    </div>

    <!-- Form Fields -->
    <div class="form-section">
      <div class="form-group">
        <label class="form-label">Name:</label>
        <input type="text" class="form-input" value="User-user" readonly />
      </div>

      <div class="form-group">
        <label class="form-label">Password:</label>
        <input type="password" class="form-input" value="*********" readonly />
      </div>

      <div class="form-group">
        <label class="form-label">Email:</label>
        <input type="email" class="form-input" value="user@mail.com" readonly />
      </div>
    </div>

    <!-- Buttons -->
    <div class="button-group">
      <router-link to="/edit"><button class="btn btn-edit">Edit Profile</button></router-link>
      <router-link to="/"><button class="btn btn-logout">Logout</button></router-link>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "ProfilePage",
  data() {
    return {
      userData: {
        username: '',
        email: ''
      }
    }
  },
  mounted() {
    const username = localStorage.getItem('username')
    if (!username) {
      this.$router.push('/login')
      return
    }

    axios.get(`${import.meta.env.VITE_API_URL}/api/account/${username}`)
      .then(res => {
        if (res.data.success) {
          this.userData = res.data.data
        }
      })
      .catch(err => {
        console.error('Gagal mengambil data user:', err)
      })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    logout() {
      localStorage.removeItem('username')
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.profile-container {
  min-height: 100vh;
  width: 100%;
  background-color: #4f4f4f;
  color: white;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}

.cardheader {
  position: relative;
  left: 0;
  right: 0;
  width: 100vw; /* gunakan viewport width */
  max-width: 100vw;
  height: 76px;
  background-color: #4f4f4f;
  padding: 1rem 3rem;
  margin: 0 auto 2rem auto;
  border-bottom: 1.3px solid rgba(62, 62, 62, 0.9); /* hanya bawah dan 90% opacity */
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

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.avatar-wrapper {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.profile-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: -1rem;
}

.form-section {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  margin-top: -0.2rem;
  color: white;
}

.form-input {
  background-color: #2f2f2f;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.25rem;
  color: white;
  box-shadow: inset 0 0 0 1px #444;
}

.form-input[readonly] {
  cursor: default;
}

.button-group {
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  margin-bottom: 3rem;
}

.btn:hover {
  transform: scale(1.05);
}

.btn-edit {
  background: linear-gradient(180deg, #00879E 0%, #003038 100%);
  color: white;
}

.btn-logout {
  background: linear-gradient(to right, #f8ac57, #be753e);
  color: white;
}

/* Responsive spacing */
@media (max-width: 768px) {
  .form-section {
    width: 90%;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .button-group {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

  