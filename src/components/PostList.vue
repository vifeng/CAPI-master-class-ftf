<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>
        <a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>
        <p class="desktop-only text-small">107 posts</p>
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
import sourceData from "@/data.json";
import { reactive } from "vue";

// props
const props = defineProps({
  posts: {
    required: true,
    type: Array,
  },
});
const users = reactive(sourceData.users);

function userById(userId) {
  return users.find((p) => p.id === userId);
}
</script>

<style scoped></style>
