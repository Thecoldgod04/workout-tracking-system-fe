<template>
  <div>

    <NuxtLoadingIndicator />

    <Navbar />

    <div id="app" class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>

</script>

<style>

</style>