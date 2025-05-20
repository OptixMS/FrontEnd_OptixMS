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
  
  <script>
import axios from 'axios'

export default {
  name: "EditProfilePage",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      message: '',
      previewImage: null,
      defaultAvatar: '/default-avatar.png',
      oldUsername: localStorage.getItem('username')
    };
  },
  mounted() {
    axios.get(`http://localhost:5001/api/account/${this.oldUsername}`)
      .then(res => {
        if (res.data.success) {
          this.name = res.data.data.username
          this.email = res.data.data.email
        }
      })
      .catch(err => {
        console.error(err)
        this.message = 'Gagal memuat data akun.'
      })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.previewImage = URL.createObjectURL(file)
      }
    },
    async submitProfile() {
      console.log("Submit diklik")
      if (!this.name || !this.email || !this.password) {
        this.message = "Semua kolom wajib diisi."
        return
      }

      try {
        const res = await axios.put(`http://localhost:5001/api/account/${this.oldUsername}`, {
          newUsername: this.name,
          newEmail: this.email,
          newPassword: this.password
        })

        if (res.data.success) {
          localStorage.setItem('username', this.name)
          this.message = "Edit profile berhasil."
          setTimeout(() => {
            window.location.href = `/dashboard/${this.name}`
          }, 1000)
        } else {
          this.message = res.data.message || "Gagal memperbarui profil."
        }
      } catch (err) {
        console.error(err)
        this.message = err.response?.data?.message || "Terjadi kesalahan saat mengirim data."
      }
    }
  }
}
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
  
  