<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea v-model="postText" name="" id="" cols="30" rows="10" class="form-input" />
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


function save() {
  const post = {
    text: postText.value,
  };
  emit("save", { post });
  // access under eventData.post
  // this will send the data object post to the parent child see threadShow.vue
  console.log("post créé " + postText.value);
  postText.value = "";
  // bug text isn't erased
}
</script>

<style scoped></style>
