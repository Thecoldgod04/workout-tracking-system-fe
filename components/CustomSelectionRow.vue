<script setup>

  const props = defineProps({
    params: Object,
  });
  
  const isChecked = ref(props.params.node.isSelected()); // Get initial selection state

  function toggleSelection() {
    props.params.node.setSelected(isChecked.value); // Update AG Grid selection
  };
</script>

<template>
  <div class="table-selection-row flex h-full items-center">
    <UCheckbox v-model="isChecked" @change="toggleSelection"/>
  </div>
</template>

<style scoped>
    
</style>
