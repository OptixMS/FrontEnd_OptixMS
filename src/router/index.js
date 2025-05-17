// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

// Import komponen
import LandingPage from '@/views/landingpage.vue'
import Login from '@/views/loginpages.vue'
import Register from '@/views/registerpage.vue'
import Dashboard from '@/views/dashboardpage.vue'
import Temperature from '@/views/temperaturepage.vue'
import Site from '@/views/sitedevicepage.vue'
import About from '@/views/aboutpage.vue'
import Maps from '@/views/mappage.vue'
import History from '@/views/historypage.vue'
import Predict from '@/views/predictpage.vue'
import Profile from '@/views/profile.vue'
import Edit from '@/views/editprofile.vue'
import Forgot from '@/views/forgotpass.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/temperature',
    name: 'Temperature',
    component: Temperature
  },
  {
    path: '/site',
    name: 'Site',
    component: Site
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/maps',
    name: 'Maps',
    component: Maps
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/predict',
    name: 'Predict',
    component: Predict
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
