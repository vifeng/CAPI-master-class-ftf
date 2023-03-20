<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link :to="{ name: 'ThreadEdit', id: props.id }" custom v-slot="{ navigate }">
        <span @click="navigate" @keypress.enter="navigate" role="link" class="btn-green btn-small">Edit Thread</span>
        <!-- navigate is a key word -->
      </router-link>
    </h1>
    <p>
      By <a href="#" class="link-unstyled">{{ thread.author.name }}</a>,
      <AppDate :timestamp="thread.publishedAt" />.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{ thread.repliesCount }}
        replies by {{ thread.contributorsCount }}
        contributors</span>
    </p>
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
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";

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
  threadsStore.thread(props.id)
);

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
