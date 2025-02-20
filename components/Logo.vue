<template>
  <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
    <img :src="logo" class="h-8" alt="Flowbite Logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{ appName }}</span>
  </NuxtLink>
</template>

<script setup>
  // Defining props
  const props = defineProps({
    logo: String,
    appName: String
  })
</script>
  
<style>

</style>