<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script setup>
import CategoryList from "../components/CategoryList.vue";
// store
import { useCategoriesStore } from "../stores/CategoriesStore";
import { storeToRefs } from "pinia";
const { categories } = storeToRefs(useCategoriesStore());
// because we destructure it's no more reactive which is why we use storeToRefs
</script>
