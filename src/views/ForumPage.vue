<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <a href="new-thread.html" class="btn-green btn-small">Start a thread</a>
    </div>
  </div>

  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import sourceData from "@/data.json";
// components
import ThreadList from "@/components/ThreadList.vue";

// props
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

// computed properties
const forum = computed(() =>
  sourceData.forums.find((forum) => forum.id === props.id)
);

const threads = computed(() =>
  sourceData.threads.filter((thread) => thread.forumId === props.id)
);
</script>

<style scoped>

</style>
