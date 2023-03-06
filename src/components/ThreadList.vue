<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link
              :to="{ name: 'ThreadShow', params: { id: thread.id } }"
            >
              {{ thread.title }}
            </router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId).name }}</a
            >, <app-date :timestamp="thread.publishedAt"></app-date>.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread.posts.length }}
            {{ thread.posts.length > 1 ? "replies" : "reply" }}
          </p>

          <img
            class="avatar-medium"
            :src="userById(thread.userId).avatar"
            alt=""
          />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-xsmall text-faded">
              <app-date :timestamp="thread.publishedAt"></app-date>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import sourceData from "@/data.json";
import { reactive } from "vue";
const users = reactive(sourceData.users);

const props = defineProps({
  threads: {
    type: Array,
    required: true,
  },
});

function userById(userId) {
  return users.find((p) => p.id === userId);
}
</script>

<style scoped></style>
