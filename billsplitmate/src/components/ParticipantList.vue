<template>
  <v-card>
    <v-card-title>
      Participants
      <v-spacer></v-spacer>
      <v-text-field
        v-model.number="participantCount"
        type="number"
        label="Number of Participants"
        hide-details
        class="mr-2"
        style="max-width: 200px;"
      ></v-text-field>
      <v-btn color="primary" @click="createParticipants" :disabled="!participantCount">
        Add Participants
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="participants"
      :items-per-page="-1"
      hide-default-footer
    >
      <template v-slot:headers>
        <th class="text-left">Name</th>
        <th class="text-left">Prepaid</th>
        <th class="text-left">To Pay</th>
        <th class="text-left">To Receive</th>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <v-text-field
          v-model="item.name"
          @input="updateParticipant(item)"
          dense
          hide-details
          single-line
        ></v-text-field>
      </template>
      <template v-slot:[`item.amountPaid`]="{ item }">
        <v-text-field
          v-model.number="item.amountPaid"
          @input="updateParticipant(item)"
          type="number"
          dense
          hide-details
          single-line
        ></v-text-field>
      </template>
      <template v-slot:[`item.toPay`]="{ item }">
        {{ item.toPay.toFixed(2) }}
      </template>
      <template v-slot:[`item.toReceive`]="{ item }">
        {{ item.toReceive.toFixed(2) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'ParticipantList',
  data() {
    return {
      participantCount: 0,
      participants: [],
      headers: [
        { text: 'Name', value: 'name', width: '25%' },
        { text: 'Prepaid', value: 'amountPaid', width: '25%' },
        { text: 'To Pay', value: 'toPay', width: '25%' },
        { text: 'To Receive', value: 'toReceive', width: '25%' },
      ],
    }
  },
  methods: {
    createParticipants() {
      this.participants = Array(this.participantCount).fill().map((_, index) => ({
        name: `Participant ${index + 1}`,
        amountPaid: 0,
        toPay: 0,
        toReceive: 0
      }))
    },
    updateParticipant(item) {
      // Ensure amountPaid is a number
      item.amountPaid = Number(item.amountPaid)
      this.calculateSplit()
    },
    calculateSplit() {
      const totalExpense = this.participants.reduce((sum, p) => sum + p.amountPaid, 0)
      const sharePerPerson = totalExpense / this.participants.length
      
      this.participants.forEach(p => {
        const balance = p.amountPaid - sharePerPerson
        if (balance > 0) {
          p.toReceive = Number(balance.toFixed(2))
          p.toPay = 0
        } else {
          p.toReceive = 0
          p.toPay = Number((-balance).toFixed(2))
        }
      })

      // Update Vuex store
      this.$store.dispatch('updateParticipants', this.participants)
    }
  }
}
</script>