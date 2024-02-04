<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import schema from './UserProfile.json';
import { getNodeById } from '@/utils/get-node-by-id';

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.dehydrate();
  router.push('/');
}

const locals = {
  isLoggedIn: auth.isLoggedIn,
};

getNodeById('logout-button', schema).onClick = logout;
</script>

<template>
  <AMISRenderer :schema="schema" :locals="locals" />
</template>
