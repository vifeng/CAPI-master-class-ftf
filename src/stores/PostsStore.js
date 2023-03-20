import { defineStore, acceptHMRUpdate } from "pinia";
import sourceData from "@/data.json";
import { useThreadsStore } from "./ThreadsStore";
import { useAuthUsersStore } from "./AuthUsersStore";
import { findById, upsert } from "@/helpers";

export const usePostsStore = defineStore("PostsStore", {
  state: () => {
    return {
      posts: sourceData.posts,
      setPost(post) {
        upsert(this.posts, post);
      },
    };
  },
  getters: {},
  actions: {
    createPost(post) {
      post.id = "ggqq" + Math.random();
      const authUsersStore = useAuthUsersStore();
      post.userId = authUsersStore.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      // setPost
      this.setPost(post);
      // append post to thread
      const thread = findById(useThreadsStore().threads, post.threadId);
      thread.posts = thread.posts || [];
      if (!thread.posts.includes(post.id)) {
        thread.posts.push(post.id);
      }
      // append contributor to thread
      thread.contributors = thread.contributors || [];
      if (!thread.contributors.includes(post.userId)) {
        // if the user is not already in the contributors list
        thread.contributors.push(post.userId);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot));
}
