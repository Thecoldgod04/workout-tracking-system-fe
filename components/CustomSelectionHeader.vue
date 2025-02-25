<script setup>

    const props = defineProps({
        params: Object,
    });

    // Check if the props.params.isAllSelected is a boolean
    let isChecked; // Get initial selection state
    if (typeof props.params.isAllSelected === 'boolean') {
      isChecked = ref(props.params.isAllSelected);
    } else {
      isChecked = ref(props.params.isAllSelected.value);
    }

    function onChange() {
      props.params.onClicked();
    }

</script>

<template>
  <div class="table-selection-header">
    <UCheckbox v-model="isChecked" @change="onChange"/>
  </div>
</template>

<style scoped>
    
</style>
