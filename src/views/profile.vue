<template>
    <div class="profile-page">
      <div class="back-button" @click="goBack">
        <img src="@/assets/img/back.png" alt="Back" />
      </div>
      <div class="profile-content">
        <div class="form-group">
          <label>Name:</label>
          <input type="text" value="User-user" readonly />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" value="password" readonly />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" value="user@mail.com" readonly />
        </div>
        <div class="button-group">
           <router-link to="/edit">
          <button class="edit-button">Edit Profile</button>
           </router-link>
           <router-link to="/">
          <button class="logout-button">Logout</button>
           </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProfilePage",
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-page {
    min-height: 100vh;
    background-color: #333;
    color: white;
    font-family: 'Poppins', sans-serif;
    position: relative;
    padding: 20px;
  }
  
  .back-button {
    cursor: pointer;
  }
  
  .back-button img {
    height: 32px;
    margin-left: 2rem;
    margin-top: 0rem;
  }
  
  .profile-content {
    max-width: 400px;
    margin: 100px auto 0;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #ccc;
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
    display: flex;
    justify-content: space-between;
  }
  
  .edit-button,
  .logout-button {
    width: 200%;
    padding: 12px;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .edit-button {
    background: linear-gradient(90deg, #00879E 0%, #005B6B 100%);
    color: white;
  }
  
  .logout-button {
    background: linear-gradient(90deg, #FFA726 0%, #FB8C00 100%);
    color: white;
  }
  
  .edit-button:hover,
  .logout-button:hover {
    opacity: 0.9;
  }
  </style>
  