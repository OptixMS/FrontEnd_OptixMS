<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Reset atau global styling opsional */
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #000000;
  overflow-x: hidden;
  overflow-y: auto;  /* hanya satu scroll */
}
</style>
