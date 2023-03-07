<template>
    <div class="container">
        <div class="flex-grid">
            <div class="col-3 push-top">
                <UserProfileCard v-if="!edit" :user="authUser" />
                <UserProfileCardEditor v-else :user="authUser" />
                <p class="text-xsmall text-faded text-center">
                    <AppDate :timestamp="authUser.registeredAt"></AppDate>
                </p>
            </div>

            <div class="col-7 push-top">
                <div class="profile-header">
                    <span class="text-lead">
                        {{ authUser.username }}'s recent activity
                    </span>
                    <a href="#">See only started threads?</a>
                </div>
                <hr />
                <PostList :posts="authUser.posts" />
            </div>
        </div>
    </div>
</template>

<script setup>
import PostList from "@/components/PostList.vue";
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserProfileCardEditor from "@/components/UserProfileCardEditor.vue";
import { computed } from "vue";

// store
import { useAuthUsersStore } from "@/stores/AuthUsersStore";

// props
const props = defineProps({
    edit: {
        required: false,
        type: Boolean,
    },
});

const authUsersStore = useAuthUsersStore();

// computed properties
const authUser = computed(() => authUsersStore.authUser);
</script>
