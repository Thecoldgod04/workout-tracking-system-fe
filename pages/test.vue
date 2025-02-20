<script setup>
const entries = [{
    id: 1,
    name: 'Push Up',
    difficulty: 'Easy'
  }, {
    id: 2,
    name: 'Pull Up',
    difficulty: 'Hard'
  }, {
    id: 3,
    name: 'Dip',
    difficulty: 'Medium'
  }, {
    id: 4,
    name: 'Squats',
    difficulty: 'Easy'
  }]

const selected = ref([entries[-1]])
</script>

<template>
  <UTable v-model="selected" :rows="entries" @select="clickRow"/>
</template>

