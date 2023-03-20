<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }" class="btn-green btn-small">
        Start a thread
      </router-link>
    </div>
  </div>

  <div class="col-full push-top">
    <ThreadList :threads="TheThreads" />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
// components
import ThreadList from "@/components/ThreadList.vue";
import { useForumsStore } from "../stores/ForumsStore";
import { useThreadsStore } from "../stores/ThreadsStore";
import { findById } from '@/helpers'

// props
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});
const forumsStore = useForumsStore();
const forums = reactive(forumsStore.forums);
const threadsStore = useThreadsStore();
const threads = reactive(threadsStore.threads);

// computed properties
const forum = computed(() =>
  findById(forums, props.id)
);

const TheThreads = computed(() =>
  // this line don't work
  // forum.threads ? forum.threads.map(threadId => threads.thread(threadId)) : []
  threads.filter((thread) => thread.forumId === props.id)
);
// FIXME: TheThreads is not passed to the component. Getters don't work in a loop.
// console.log("forum et props", forum, props.id, "\n et TheThreads", TheThreads)
</script>

<style scoped></style>
