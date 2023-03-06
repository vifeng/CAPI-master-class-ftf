import { defineStore, acceptHMRUpdate } from "pinia";
import { useUsersStore } from "@/stores/UsersStore";
import { usePostsStore } from "@/stores/PostsStore";
import { useThreadsStore } from "@/stores/ThreadsStore";

export const useAuthUsersStore = defineStore("AuthUsersStore", {
  state: () => {
    return {
      users: useUsersStore().users,
      authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3",
    };
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find((user) => user.id === state.authId);
      if (!user) return null;
      const postsStore = usePostsStore();
      const posts = postsStore.posts;
      const threadsStore = useThreadsStore();
      const threads = threadsStore.threads;

      return {
        ...user,
        // this can used as {{ authUser.postsCount }} or {{ authUser.getPostsCount() }}
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
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUsersStore, import.meta.hot));
}
