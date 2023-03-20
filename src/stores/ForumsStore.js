import { defineStore, acceptHMRUpdate } from "pinia";
import sourceData from "@/data.json";
export const useForumsStore = defineStore("ForumsStore", {
  state: () => {
    return {
      forums: sourceData.forums,
    };
  },
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useForumsStore, import.meta.hot));
}
