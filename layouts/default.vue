<template>
  <div>

    <NuxtLoadingIndicator />

    <Navbar />

    <div id="app" class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
      <slot />
    </div>

    <UNotifications :ui="{
      position: 'top-0 bottom-[unset]'
    }"/>
  </div>
</template>

<script setup>
</script>

<style>

</style>