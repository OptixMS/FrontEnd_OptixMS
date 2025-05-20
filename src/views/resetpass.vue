<template>
    <div class="reset-password-page font-poppins">
      <div class="form-container">
        <h2>Reset Password</h2>
  
        <div v-if="!resetSuccess">
          <input
            v-model="password"
            type="password"
            placeholder="Password baru"
            class="input-field"
          />
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Konfirmasi password baru"
            class="input-field"
          />
          <button @click="submitReset" class="submit-button">Reset Password</button>
        </div>
  
        <p class="message" v-if="message">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
export default {
  name: "ResetPasswordPage",
  data() {
    return {
      password: '',
      confirmPassword: '',
      message: '',
      resetSuccess: false,
      token: ''
    }
  },
  mounted() {
    const query = this.$route.query
    this.token = query.token

    if (!this.token) {
      this.message = "Token tidak ditemukan."
    }
  },
  methods: {
    async submitReset() {
      if (!this.token) {
        this.message = "Token tidak ditemukan."
        return
      }

      if (!this.password || !this.confirmPassword) {
        this.message = "Password dan konfirmasi wajib diisi."
        return
      }

      if (this.password !== this.confirmPassword) {
        this.message = "Password tidak sama."
        return
      }

      try {
        const response = await fetch(`http://localhost:5001/api/resetpassword?token=${this.token}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: this.password,
            confirmPassword: this.confirmPassword
          }),
        })

        if (!response.ok) {
          const text = await response.text()
          console.error("Response error:", text)
          this.message = "Server error: " + response.status
          return
        }

        const data = await response.json()
        if (data.success) {
          this.message = "Password berhasil direset. Silakan login kembali."
          this.resetSuccess = true
        } else {
          this.message = data.message || "Gagal reset password."
        }
      } catch (error) {
        console.error(error)
        this.message = "Terjadi kesalahan saat menghubungi server."
      }
    }
  }
}
</script>

  
  <style scoped>
  .reset-password-page {
    min-height: 100vh;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-container {
    background: white;
    padding: 24px;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
  }
  .input-field {
    width: 100%;
    margin-bottom: 12px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .submit-button {
    width: 100%;
    padding: 10px;
    background: #2c7be5;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  .message {
    margin-top: 16px;
    text-align: center;
    color: green;
  }
  </style>
  