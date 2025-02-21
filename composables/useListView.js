import {ref, defineProps, computed} from 'vue';
export const useListView = (entries) => {

  //--------------- Variables ---------------

  // List entries
  // const entries = [{
  //   id: 1,
  //   name: 'Push Up',
  //   difficulty: 'Easy'
  // }, {
  //   id: 2,
  //   name: 'Pull Up',
  //   difficulty: 'Hard'
  // }, {
  //   id: 3,
  //   name: 'Dip',
  //   difficulty: 'Medium'
  // }, {
  //   id: 4,
  //   name: 'Squats',
  //   difficulty: 'Easy'
  // }]

  // Custom lists
  const lists = [{
    label: 'All',
  }, {
    label: 'Easy Exercises',
  }, {
    label: 'Outdated Exercises',
  }]

  // Selectable
  const selected = ref([])

  // Pagination
  const page = ref(1);
  const pageCount = 10;

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
    return entries.slice((page.value - 1) * pageCount, (page.value) * pageCount)
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

  return {
    entries,
    lists,
    selected,
    page,
    pageCount,
    currentFilter,
    clickRow,
    paged,
    filtered,
  }
}
