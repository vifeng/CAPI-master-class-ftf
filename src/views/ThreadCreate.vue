<template>
    <div class="col-full push-top">
        <h1>
            Create new thread in <i>{{ forum.name }}</i>
        </h1>
        <ThreadEditor @save="save" @cancel="cancel"></ThreadEditor>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import ThreadEditor from "../components/ThreadEditor.vue";
import { useThreadsStore } from "../stores/ThreadsStore";
import { useForumsStore } from "../stores/ForumsStore";
import { findById } from '@/helpers'

// props
const props = defineProps({
    forumId: { type: String, required: true },
});

// data
const threadsStore = useThreadsStore();
const forumsStore = useForumsStore();
const router = useRouter();

// computed
const forum = computed(() =>
    findById(forumsStore.forums, props.forumId)
);

// action
async function save(eventData) {
    const threadForm = {
        ...eventData.form,
        // carefull if you emit("save", { form }); then you have to call form 
        forumId: props.forumId,
    };
    const thread = await threadsStore.createThread(threadForm);
    router.push({ name: "ThreadShow", params: { id: thread.id } });
}

function cancel() {
    router.push({ name: "Forum", params: { id: props.forumId } });
}
</script>
