<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>
        <a href="#">
          <img class="avatar-large" :src="userById(post.userId).avatar" alt="" />
        </a>
        <p class="desktop-only text-small">
          {{ userById(post.userId).postsCount }} posts
        </p>
        <p class="desktop-only text-small">
          {{ userById(post.userId).threadsCount }} threads
        </p>
      </div>
      <div class="post-content">
        <div>
          <p>{{ post.text }}</p>
        </div>
      </div>
      <div class="post-date text-faded">
        <AppDate :timestamp="post.publishedAt"></AppDate>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUsersStore } from "@/stores/UsersStore";
import { reactive } from "vue";
import { findById } from '@/helpers'

const usersStore = useUsersStore();
const users = reactive(usersStore.users);
// props
const props = defineProps({
  posts: {
    required: true,
    type: Array,
  },
});

// FIXME: Getters don't work in a loop.

function userById(userId) {
  return findById(users, userId);
}
</script>

<style scoped></style>
