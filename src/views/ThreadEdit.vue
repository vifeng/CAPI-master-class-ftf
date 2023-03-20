<template>
    <div class="col-full push-top">
        <h1>
            Editing <i>{{ thread.title }}</i>
        </h1>
        <ThreadEditor :title="thread.title" :text="text" @save="updateT" @cancel="cancel" />
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import ThreadEditor from "../components/ThreadEditor.vue";
import { useThreadsStore } from "../stores/ThreadsStore";
import { usePostsStore } from "../stores/PostsStore";
import { findById } from '@/helpers'

// props
const props = defineProps({
    id: { type: String, required: true },
});

console.log('ThreadEdit props', props);
// data
const threadsStore = useThreadsStore();
const postsStore = usePostsStore();
const router = useRouter();

// computed
const thread = computed(() =>
    findById(threadsStore.threads, props.id)
);
const text = computed(
    () =>
        // The creator of the thread is the creator of the 1st post as such when we edit a thread we can edit the first post.
        findById(postsStore.posts, thread.value.posts[0]).text
);

async function updateT(eventData) {
    const threadForm = {
        ...eventData.form.value,
        id: props.id,
        forumId: thread.value.forumId,
    };
    console.log('threadForm ', threadForm);

    const threadRes = await threadsStore.updateThread(threadForm);
    router.push({ name: "ThreadShow", params: { id: threadRes.id } });
}
function cancel() {
    router.push({ name: "ThreadShow", params: { id: props.id } });
}
</script>
