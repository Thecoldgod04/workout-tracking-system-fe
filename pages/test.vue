<script setup>
  // const {data: entries} = await useFetch('https://fakestoreapi.com/products');
  const {data, error} = await useFetch('https://dummyjson.com/users');
  console.log(data.users);
</script>

<template>
  Test Page
  <div v-for="entry in data.users">
    {{ entry.id }}
  </div>
</template>

