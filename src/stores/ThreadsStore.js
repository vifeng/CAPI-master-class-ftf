import { defineStore, acceptHMRUpdate } from "pinia";
import sourceData from "@/data.json";
import { usePostsStore } from "./PostsStore";
import { useAuthUsersStore } from "./AuthUsersStore";
import { useForumsStore } from "./ForumsStore";
import { findById, upsert } from "@/helpers";

export const useThreadsStore = defineStore("ThreadsStore", {
  state: () => {
    return {
      threads: sourceData.threads,
      setThread(thread) {
        upsert(this.threads, thread);
      },
    };
  },
  getters: {
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id);
        if (!thread) return null;
        const authUsersStore = useAuthUsersStore();
        return {
          ...thread,
          // this can be used as {{ thread.repliesCount }} or {{ thread.getRepliesCount() }}
          get author() {
            return findById(authUsersStore.users, thread.userId);
          },
          get repliesCount() {
            return thread.posts.length - 1;
            // -1 because the first post is the thread itself and not a reply
          },
          get contributorsCount() {
            return thread.contributors?.length || 0;
          },
        };
      };
    },
  },
  actions: {
    async createThread(threadForm) {
      threadForm.id = "ggqq" + Math.random();
      const postsStore = usePostsStore();
      const forumsStore = useForumsStore();
      const authUsersStore = useAuthUsersStore();
      threadForm.userId = authUsersStore.authId;
      threadForm.publishedAt = Math.floor(Date.now() / 1000);
      // setThread
      this.setThread(threadForm);
      // appendThreadToUser
      const user = findById(authUsersStore.users, threadForm.userId);
      user.threads = user.threads || [];
      user.threads.push(threadForm.id);
      // appendThreadToForum
      const forum = findById(forumsStore.forums, threadForm.forumId);
      forum.threads = forum.threads || [];
      forum.threads.push(threadForm.id);
      // createPost & appendPostToThread
      const post = {
        title: threadForm.title,
        text: threadForm.text,
        threadId: threadForm.id,
      };
      postsStore.createPost(post);
      return findById(this.threads, threadForm.id);
    },

    async updateThread(threadForm) {
      const postsStore = usePostsStore();
      const thread = findById(this.threads, threadForm.id);
      const post = findById(postsStore.posts, thread.posts[0]);

      const publishedAt = Math.floor(Date.now() / 1000);
      // Careful, if you don't use a new thread but instead do `thread.title = ...threadForm.title` then you will update the thread (reference). But what we want is to update the old thread and include its all other values. with this line `const newThread = { ...thread, ...threadForm.title }` you update the old value with the new title value and keep the other values.
      const newThread = { ...thread, ...threadForm.title, publishedAt };
      // const newThread = {
      //   contributors: ["jUjmgCurRRdzayqbRMO7aTG9X1G2"],
      //   firstPostId: "-KvgjI6bfbWYlbYV5nds",
      //   forumId: "-KpOx5Y4AqRr3sB4Ybwj",
      //   lastPostAt: 1599638822,
      //   lastPostId: "-KxxU6bYWl-6Xnu9g-56",
      //   posts: ["-KvgjI6bfbWYlbYV5nds", "-KxxU6bYWl-6Xnu9g-56"],
      //   publishedAt: 1597210375,
      //   slug: "post-reactions",
      //   title: "Post yeah",
      //   userId: "ALXhxjwgY9PinwNGHpfai6OWyDu2",
      //   id: "-KvgjI6bfbWYlbYV5ndr",
      // };
      const newPost = { ...post, ...threadForm.text };
      // threadForm values ok
      console.log("updateThread threadForm : ", threadForm);
      // FIXME: the log doesn't show the new values may be the problem is in the syntax. With a hard coded value the problem is solved.
      console.log("updateThread newThread", newThread);
      console.log("updateThread newPost", newPost);

      // setThread
      this.setThread(newThread);
      // set Post
      postsStore.setPost(newPost);
      return newThread;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThreadsStore, import.meta.hot));
}
