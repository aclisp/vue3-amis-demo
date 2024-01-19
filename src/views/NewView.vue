<script setup lang="ts">
import AMISRenderer from '@/components/AMISRenderer.vue'

const schema = {
  type: 'page',
  body: 'New World!'
}
</script>

<template>
  <div>789 new</div>
  <AMISRenderer :schema="schema" />
</template>
