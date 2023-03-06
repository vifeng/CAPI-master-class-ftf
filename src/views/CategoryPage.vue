<template>
  <ForumList :categoryTitle="category.name" :categoryId="category.id" :forums="categoryForums"></ForumList>
</template>

<script setup>
import { computed } from "vue";
import ForumList from "@/components/ForumList.vue";
import sourceData from "@/data.json";

// props
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

// computed properties
const category = computed(() =>
  sourceData.categories.find((category) => category.id === props.id)
);

const categoryForums = computed(() =>
  sourceData.forums.filter((forum) => forum.categoryId === props.id)
);
</script>
