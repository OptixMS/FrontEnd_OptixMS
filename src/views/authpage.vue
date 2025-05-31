<template>
    <div class="auth-wrapper">
      <transition name="fade-slide" mode="out-in">
        <component
            :is="showLogin ? 'LoginPage' : 'RegisterPage'"
            :key="showLogin ? 'login' : 'register'"
            @switch="toggleForm"
        />
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import LoginPage from '@/views/loginpage.vue'
  import RegisterPage from '@/views/registerpage.vue'
  
  const showLogin = ref(true)
  
  function toggleForm() {
    showLogin.value = !showLogin.value
  }
  </script>
  
  <style scoped>
  .auth-wrapper {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(to bottom right, #006666, #003d4d);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 800ms cubic-bezier(0.25, 0.1, 0.25, 1.0);
  }
  
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(50px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-50px);
  }
  </style>
  