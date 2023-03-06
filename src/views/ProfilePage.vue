<template>
    <div class="container">
        <div class="flex-grid">
            <div class="col-3 push-top">
                <UserProfileCard v-if="!edit" :user="authUser" />
                <UserProfileCardEditor v-else :user="authUser" />
                <p class="text-xsmall text-faded text-center">
                    Member since june 2003, last visited 4 hours ago
                </p>
            </div>

            <div class="col-7 push-top">
                <div class="profile-header">
                    <span class="text-lead"> Joker's recent activity </span>
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

// store
import { useAuthUsersStore } from "@/stores/AuthUsersStore";

const authUsersStore = useAuthUsersStore();
const authUser = authUsersStore.authUser;

// props
const props = defineProps({
    edit: {
        required: false,
        type: Boolean,
    },
});
</script>
