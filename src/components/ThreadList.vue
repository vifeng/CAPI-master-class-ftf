<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link :to="{ name: 'ThreadShow', params: { id: thread.id } }">
              {{ thread.title }}
            </router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId).name }}</a>, <app-date :timestamp="thread.publishedAt"></app-date>.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread.repliesCount }}
            {{ thread.repliesCount > 1 || thread.repliesCount
              === 0 ? 'replies' : 'reply' }}
          </p>

          <img class="avatar-medium" :src="userById(thread.userId).avatar" alt="" />

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
import { reactive } from "vue";
import { findById } from '@/helpers'
import { useUsersStore } from "@/stores/UsersStore";

const usersStore = useUsersStore();
const users = reactive(usersStore.users);

const props = defineProps({
  threads: {
    type: Array,
    required: true,
  },
});


function userById(userId) {
  return findById(users, userId);
}

</script>

<style scoped></style>
