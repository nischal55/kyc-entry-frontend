<script setup>
import { ref, onMounted } from 'vue';
import Toast from 'primevue/toast';
</script>

<template>
  <div class="bg-slate-100 h-screen">
    <Toast />
    <router-view />
  </div>
</template>