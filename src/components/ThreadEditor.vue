<template>
    <form @submit.prevent="save">
        <div class="form-group">
            <label for="thread_title">Title:</label>
            <input v-model="form.title" type="text" id="thread_title" class="form-input" name="title" />
        </div>

        <div class="form-group">
            <label for="thread_content">Content:</label>
            <textarea v-model="form.text" id="thread_content" class="form-input" name="content" rows="8"
                cols="140"></textarea>
        </div>

        <div class="btn-group">
            <button @click="cancel" class="btn btn-ghost">Cancel</button>
            <button class="btn btn-blue" type="submit" name="Publish">
                {{ existing ? "Update" : "Publish" }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { reactive, computed } from "vue";

// props
const props = defineProps({
    title: { type: String, default: "" },
    text: { type: String, default: "" },
});

const emit = defineEmits(["save", "cancel"]);
const form = reactive({
    title: props.title,
    text: props.text,
});
const existing = computed(
    () => {
        return !!props.title;
    }
    // !! trasnsforms a string into a boolean. if string exist then true otherwise false
);

function save() {
    emit("save", { form });
    // this will be accessed by ...eventData.form the name of the object form cannot be changed.
}
function cancel() {
    emit("cancel");
}
</script>
