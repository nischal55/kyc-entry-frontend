<script setup>
import { ref, onMounted } from 'vue';
import Toast from 'primevue/toast';
import navbar from './components/common/navbar.vue';
</script>

<template>
  <div class="bg-slate-100 h-screen overflow-scroll pb-10">
    <Toast />
    <navbar />
    <router-view />
  </div>
</template>