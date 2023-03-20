<template>
    <header class="header" id="header">
        <router-link :to="{ name: 'Home' }" class="logo">
            <img src="../assets/svg/vueschool-logo.svg" />
        </router-link>

        <div class="btn-hamburger">
            <!-- use .btn-humburger-active to open the menu -->
            <div class="top bar"></div>
            <div class="middle bar"></div>
            <div class="bottom bar"></div>
        </div>

        <!-- use .navbar-open to open nav -->
        <nav class="navbar">
            <ul>
                <li class="navbar-user">
                    <router-link :to="{ name: 'Profile' }">
                        <img class="avatar-small" :src="authUser.avatar" alt="`${authUser.name} profile picture`" />
                        <span>
                            {{ authUser.name }}
                            <img class="icon-profile" src="../assets/svg/arrow-profile.svg" alt="" />
                        </span>
                    </router-link>

                    <!-- dropdown menu -->
                    <!-- add class "active-drop" to show the dropdown -->
                    <div id="user-dropdown">
                        <div class="triangle-drop"></div>
                        <ul class="dropdown-menu">
                            <li class="dropdown-menu-item">
                                <a href="profile.html">View profile</a>
                            </li>
                            <li class="dropdown-menu-item"><a href="#">Log out</a></li>
                        </ul>
                    </div>
                </li>
            </ul>

            <!--      <ul>-->
            <!--        <li class="navbar-item">-->
            <!--          <a href="index.html">Home</a>-->
            <!--        </li>-->
            <!--      </ul>-->
        </nav>
    </header>
</template>

<script setup>
import { useAuthUsersStore } from "@/stores/AuthUsersStore";
import { storeToRefs } from "pinia";

const { authUser } = storeToRefs(useAuthUsersStore());

</script>

<style scoped></style>
