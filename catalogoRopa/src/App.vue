<script setup lang="ts">
import { onMounted } from 'vue'
import { servicioAuth } from './services/servicioAuth'

onMounted(() => {
  servicioAuth.escucharCambios()
})
</script>

<template>
  <RouterView />
</template>
