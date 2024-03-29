import { defineStore, acceptHMRUpdate } from "pinia";
import sourceData from "@/data.json";
import { usePostsStore } from "@/stores/PostsStore";
import { useThreadsStore } from "@/stores/ThreadsStore";
import { findById, upsert } from "@/helpers";

export const useUsersStore = defineStore("UsersStore", {
  state: () => {
    return {
      users: sourceData.users,
      id: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3",
      setUser(activeUser, activeUserId) {
        const userIndex = this.users.findIndex(
          (user) => user.id === activeUserId
        );
        this.users[userIndex] = activeUser;
      },
    };
  },
  getters: {
    user: (state) => {
      const user = findById(state.users, state.id);
      if (!user) return null;
      const postsStore = usePostsStore();
      const posts = postsStore.posts;
      const threadsStore = useThreadsStore();
      const threads = threadsStore.threads;

      return {
        ...user,
        // this can used as {{ user.postsCount }} or {{ user.getPostsCount() }}
        get posts() {
          return posts.filter((post) => post.userId === user.id);
        },
        get postsCount() {
          return this.posts.length;
        },
        get threads() {
          return threads.filter((post) => post.userId === user.id);
        },
        get threadsCount() {
          return this.threads.length;
        },
      };
    },
  },
  actions: {
    updateUser(activeUser) {
      this.setUser(activeUser, activeUser.id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}
