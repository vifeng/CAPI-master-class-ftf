<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="threadPosts"></PostList>
    <!-- Add a new post -->
    <post-editor @save="addPost" />
    <!-- @save is the form @click method -->
  </div>
</template>

<script setup>
import { computed } from "vue";
// store
import { useThreadsStore } from "../stores/ThreadsStore";
import { usePostsStore } from "../stores/PostsStore";
// components
// import PostList from "@/components/PostList.vue";
// import PostEditor from "@/components/PostEditor.vue";

// data
const threadsStore = useThreadsStore();
const postsStore = usePostsStore();
// props
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

// computed properties
const thread = computed(() =>
  threadsStore.threads.find((thread) => thread.id === props.id)
);
// also available under this.$route.params.id

const threadPosts = computed(() =>
  postsStore.posts.filter((post) => post.threadId === props.id)
);

// methods
function addPost(eventData) {
  const post = {
    ...eventData.post,
    // eventData récupère l'objet post et le décompose grâce à "..."
    threadId: props.id,
  };
  postsStore.createPost(post);
}
</script>
