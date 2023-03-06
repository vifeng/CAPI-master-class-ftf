<template>
  <ForumList v-for="category in categories" :key="category.id" :forums="getForumsForCategory(category)"
    :category-title="category.name" :category-id="category.id" />
</template>

<script setup>
import ForumList from "@/components/ForumList.vue";
import sourceData from "@/data.json";
// props
const props = defineProps({
  categories: {
    required: true,
    type: Array,
  },
});

// functions
function getForumsForCategory(category) {
  return sourceData.forums.filter((forum) => forum.categoryId === category.id);
}
</script>

<style scoped>

</style>
