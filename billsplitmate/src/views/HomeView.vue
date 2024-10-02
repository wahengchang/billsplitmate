<template>
  <div class="home">
    <h1>Bill Split Mate</h1>
    <ParticipantList />
    <DebtSummary />
    <!-- Add an ExpenseForm component here if you have one -->
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
