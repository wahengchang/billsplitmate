<template>
  <div class="home">
    <h1>Welcome to SplitMate</h1>
    <v-container>
      <ParticipantList />
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ParticipantList from '@/components/ParticipantList.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    ParticipantList,
  },
});
</script>
