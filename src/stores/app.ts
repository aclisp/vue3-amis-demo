import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('appStore', () => {
  const drawer = ref(false);

  return {
    drawer,
  };
});
