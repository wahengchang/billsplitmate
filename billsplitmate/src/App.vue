<template>
  <v-app>
    <v-main>
      <v-container class="app-container" max-width="850">
        <router-view
          :participants="participants"
          :expenses="expenses"
          @add-participant="addParticipant"
          @update-participant="updateParticipant"
          @remove-participant="removeParticipant"
          @add-expense="addExpense"
          @reset-participants="resetParticipants"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'App',
  data() {
    return {
      participants: [],
      expenses: []
    }
  },
  created() {
    this.loadParticipants()
  },
  methods: {
    addParticipant(participant) {
      const newParticipant = {
        ...participant,
        id: uuidv4()
      }
      this.participants.push(newParticipant)
      this.saveParticipants()
    },
    updateParticipant(updatedParticipant) {
      const index = this.participants.findIndex(p => p.id === updatedParticipant.id)
      if (index !== -1) {
        this.participants[index] = updatedParticipant
        this.saveParticipants()
      }
    },
    removeParticipant(participantId) {
      this.participants = this.participants.filter(p => p.id !== participantId)
      this.saveParticipants()
    },
    addExpense(expense) {
      this.expenses.push(expense)
      // If you want to save expenses as well, add a saveExpenses method
    },
    saveParticipants() {
      localStorage.setItem('participants', JSON.stringify(this.participants))
    },
    loadParticipants() {
      const savedParticipants = localStorage.getItem('participants')
      if (savedParticipants) {
        this.participants = JSON.parse(savedParticipants)
      }
    },
    resetParticipants() {
      this.participants = []
      this.expenses = []
      this.saveParticipants()
      // If you're saving expenses, you might want to clear that storage as well
      localStorage.removeItem('expenses')
    }
  }
}
</script>

<style>
.app-container {
  margin: 0 auto;
  padding: 16px;
}
</style>
