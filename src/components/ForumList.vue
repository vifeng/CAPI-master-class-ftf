<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <!-- when this component is called by CategoryPage no need to have a router-link since we are already on the page.  If the component is called by CategoryList then the router-link makes sense and the props is needed-->
        <router-link
          v-if="categoryId"
          :to="{ name: 'Category', params: { id: categoryId } }"
          >{{ categoryTitle }}</router-link
        >
        <span v-else>{{ categoryTitle }}</span>
      </h2>

      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link
            :to="{ name: 'Forum', params: { id: forum.id } }"
            class="text-xlarge"
          >
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forumThreadsWord(forum) }}
          </p>
        </div>

        <div class="last-thread"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// props
const props = defineProps({
  forums: {
    required: true,
    type: Array,
  },
  categoryTitle: {
    // required: false,
    type: String,
    default: "Unknow category",
  },
  categoryId: {
    required: false,
    type: String,
  },
});

function forumThreadsWord(forum) {
  if (forum.threads?.length) {
    return forum.threads.length > 1 ? "threads" : "thread";
  } else {
    return "no threads";
  }
}
</script>

<style scoped></style>
