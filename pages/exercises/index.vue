<template>
  <div class="w-full">
    <ListView listName="Exercises" :entries="entries"/>
  </div>
</template>

<script setup>
  const url = 'https://dummyjson.com/users';
  const {data, error} = await useFetch(url);
  const entries = toRaw(data.value.users);
  // console.log(toRaw(data.value.users)[0]);
</script>

<style>

</style>