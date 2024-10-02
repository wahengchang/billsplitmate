<template>
  <div class="home">
    <h1 class="text-h4 mb-4">Bill Split Mate</h1>
    <ParticipantList
      :participants="participants"
      @add-participant="addParticipant"
      @update-participant="updateParticipant"
      @remove-participant="removeParticipant"
      @reset-participants="resetParticipants"
    />
    <v-divider class="my-4"></v-divider>
    <DebtSummary :participants="participants" />
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
  },
  props: {
    participants: {
      type: Array,
      required: true
    },
    expenses: {
      type: Array,
      required: true
    }
  },
  methods: {
    addParticipant(participant) {
      this.$emit('add-participant', participant)
    },
    updateParticipant(participant) {
      this.$emit('update-participant', participant)
    },
    removeParticipant(participantId) {
      this.$emit('remove-participant', participantId)
    },
    resetParticipants() {
      this.$emit('reset-participants')
    }
  }
}
</script>
