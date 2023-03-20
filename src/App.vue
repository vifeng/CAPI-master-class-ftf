<template>
  <Thenavbar />

  <!-- version of the website -->
  <div class="version">
    <router-link :to="{ name: 'Home' }">
      <div id="version-title">COMPOSITION API</div>
    </router-link>
  </div>
  <!-- Container -->
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Thenavbar from "@/components/TheNavBar.vue";

</script>

<style>
@import "assets/style.css";

.version {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  font-size: large;
}

#version-title {
  color: red;
}
</style>
