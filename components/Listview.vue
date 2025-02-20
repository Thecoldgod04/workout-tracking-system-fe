<script setup>
  // List Entries: Should be props
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

  // Selectable
  const selected = ref(entries[1])

  // Pagination
  const page = ref(1);
  const pageCount = 5;

  // List View Name: Should be props
  const listNameProp = defineProps({
    listName: String
  });

  // Filter
  const currentFilter = ref('')

  //--------------- Functions ---------------

  // Handling row click (Click on row)
  function clickRow(row) {
    // Do something with the data from the clicked row
    console.log(row)
  }

  // Handling pagination
  const paged = computed(() => {
    return filtered.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  })

  // Handling list filtering
  const filtered = computed(() => {
    if (!currentFilter.value) {
      return entries
    }

    return entries.filter((entry) => {
      return Object.values(entry).some((value) => {
        return String(value).toLowerCase().includes(currentFilter.value.toLowerCase())
      })
    })
  })
</script>

<template>
  <div>
    <!-- Action Bar -->
    <div id="action-bar" class="flex">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {{ listName }}
      </span>

      <div id="actions" class="w-full">
        <ul class="flex float-right gap-3">
          <li><UButton icon="i-heroicons-plus">Create New [...]</UButton></li>
          <li><UButton icon="i-heroicons-trash" color="red">Remove [...]</UButton></li>
        </ul>
      </div>
    </div>

    <!-- Table -->
    <UInput v-model="currentFilter" placeholder="Filter..." class="mt-6"/>
    <UTable v-model="selected" :rows="entries" @select="clickRow"/>
    <div class="flex justify-end mt-3">
      <UPagination v-model="page" :page-count="pageCount" :total="entries.length" />
    </div>
  </div>
</template>

<style>

</style>