import { createRouter, createWebHistory } from "vue-router";
import ThreadShow from "@/views/ThreadShow.vue";

import sourceData from "@/data.json";
const routes = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/me",
    name: "Profile",
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: () => import("@/views/ProfilePage.vue"),
    props: { edit: true },
  },
  {
    path: "/category/:id",
    name: "Category",
    props: true,
    component: () => import("@/views/CategoryPage.vue"),
  },
  {
    path: "/forum/:id",
    name: "Forum",
    props: true,
    component: () => import("@/views/ForumPage.vue"),
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // check if thread exists
      const threadExists = sourceData.threads.find(
        (thread) => thread.id === to.params.id
      );
      // if exists continue
      if (threadExists) {
        return next();
      } else {
        next({
          name: "NotFound",
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split("/") },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash,
        });
      }
      // if doesnt exist redirect to not found
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
