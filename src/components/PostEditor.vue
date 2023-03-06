<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="postText"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
        />
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["save"]);
const postText = ref("");

// let postText = "";

function save() {
  const postId = "ggqq" + Math.random();
  const post = {
    id: postId,
    text: postText.value,
    publishedAt: Math.floor(Date.now() / 1000),
    userId: "rpbB8C6ifrYmNDufMERWfQUoa202",
  };
  emit("save", { post });
  // access under eventData.post
  // this will send the data object post to the parent child
  postText.value = "";
  // bug text isn't erased
  console.log("et alors ? " + postText.value);
}
</script>

<style scoped></style>
