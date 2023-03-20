<template>
  <ForumList :categoryTitle="category.name" :categoryId="category.id" :forums="categoryForums"></ForumList>
</template>

<script setup>
import { computed } from "vue";
import ForumList from "@/components/ForumList.vue";
import useCategoriesStore from '@/stores/CategoriesStore.js'
import { useForumsStore } from "../stores/ForumsStore";

import { findById } from '@/helpers'

// props
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

const categoriesStore = useCategoriesStore();
const forumsStore = useForumsStore();

// computed properties
const category = computed(() =>
  findById(categoriesStore.categories, props.id)
);

const categoryForums = computed(() =>
  forumsStore.forums.filter((forum) => forum.categoryId === props.id)
);
</script>
