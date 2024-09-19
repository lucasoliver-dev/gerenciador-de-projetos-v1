<template>
  <TopBar></TopBar>
  <HelloWorld/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import TopBar from '@/components/TopBar.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    TopBar,
    HelloWorld,
  },
});
</script>
