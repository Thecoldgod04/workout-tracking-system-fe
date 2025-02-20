<template>
  <div>
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
      {{ listName }}
    </span>

    <!-- Table -->
    <UInput placeholder="Filter..." class="mt-6"/>
    <UTable :rows="paged" @select="select" />
    <div class="flex justify-end">
      <UPagination v-model="page" :page-count="pageCount" :total="rows.length" />
    </div>
  </div>
</template>

<script setup>
  // Should be props
  const rows = [{
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
  }];

  const page = ref(1);
  const pageCount = 5;

  // Should be props
  const listNameProp = defineProps({
    listName: String
  });

  //--------------- Functions ---------------

  function select(row) {
    // Do something with the data from the clicked row
    console.log(row)
  }

  const paged = computed(() => {
    console.log(page.value);
    return rows.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  })
</script>

<style>

</style>