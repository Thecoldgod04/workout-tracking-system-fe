<template>
    <UTable :rows="rows" @select="onRowClicked"
        :ui="{
            wrapper:  wrapperStyle,
            thead: 'sticky top-0 bg-white dark:bg-gray-800',
        }"
    />
</template>

<script setup>
    const props = defineProps({
        rows: Array,
        onRowClicked: Function,
        maxHeight: String,
        maxWidth: String,
    });

    const wrapperStyle = computed(() => {
        let style = '';
        style += props.maxHeight ? `max-h-[${props.maxHeight}]` : '';
        style += props.maxWidth ? ` max-w-[${props.maxWidth}]` : '';
        style += ' overflow-y-auto';

        // style = 'max-h-[200px] overflow-y-auto';
        return style;
    });
</script>

<style scoped>

</style>