<template>
  <div class="home">
    <h1 class="text-h4 mb-4">Bill Split Mate</h1>
    <ParticipantList />
    <v-divider class="my-4"></v-divider>
    <DebtSummary />
  </div>
</template>

<script>
import ParticipantList from '@/components/ParticipantList.vue'
import DebtSummary from '@/components/DebtSummary.vue'

export default {
  name: 'HomeView',
  components: {
    ParticipantList,
    DebtSummary
  }
}
</script>
