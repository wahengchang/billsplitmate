<template>
  <v-card>
    <v-card-title class="text-h5 font-weight-bold primary white--text">
      Bill Split Calculator
    </v-card-title>
    <v-card-subtitle class="pt-2">
      Add participants and their expenses to calculate the split
    </v-card-subtitle>
    <v-card-text>
      <v-row align="center" class="mb-2">
        <v-col cols="12" sm="6">
          <h3 class="text-h6">Participants</h3>
        </v-col>
        <v-col cols="12" sm="6" class="text-sm-right">
          <v-btn color="primary" @click="addParticipant">
            <v-icon left>mdi-plus</v-icon>
            Add Participant
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="participantsWithIndex"
        :items-per-page="-1"
        hide-default-footer
        dense
      >
        <template #[`item.index`]="{ item }">
          {{ item.index }}
        </template>
        <template #[`item.name`]="{ item }">
          <v-text-field
            v-model="item.name"
            @input="updateParticipant(item)"
            dense
            hide-details
            single-line
          ></v-text-field>
        </template>
        <template #[`item.amountPaid`]="{ item }">
          <v-text-field
            v-model.number="item.amountPaid"
            @input="updateParticipant(item)"
            type="number"
            dense
            hide-details
            single-line
            prefix="$"
            :rules="[v => v >= 0 || 'Amount must be non-negative']"
          ></v-text-field>
        </template>
        <template #[`item.toPay`]="{ item }">
          <v-chip
            :color="item.toPay > 0 ? 'red' : 'green'"
            text-color="white"
            small
          >
            {{ item.toPay.toFixed(2) }}
          </v-chip>
        </template>
        <template #[`item.toReceive`]="{ item }">
          <v-chip
            :color="item.toReceive > 0 ? 'green' : 'red'"
            text-color="white"
            small
          >
            {{ item.toReceive.toFixed(2) }}
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn icon small @click="removeParticipant(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ParticipantList',
  data() {
    return {
      participants: [],
      headers: [
        { text: '#', value: 'index', width: '5%' },
        { text: 'Name', value: 'name', width: '25%' },
        { text: 'Prepaid', value: 'amountPaid', width: '18%' },
        { text: 'To Pay', value: 'toPay', width: '18%' },
        { text: 'To Receive', value: 'toReceive', width: '18%' },
        { text: 'Actions', value: 'actions', sortable: false, width: '16%' },
      ],
    }
  },
  computed: {
    participantsWithIndex() {
      return this.participants.map((participant, index) => ({
        ...participant,
        index: index + 1
      }))
    }
  },
  methods: {
    addParticipant() {
      this.participants.push({
        name: `Participant ${this.participants.length + 1}`,
        amountPaid: 0,
        toPay: 0,
        toReceive: 0
      })
      this.calculateSplit()
    },
    removeParticipant(item) {
      const index = this.participants.findIndex(p => p.name === item.name)
      if (index > -1) {
        this.participants.splice(index, 1)
        this.calculateSplit()
      }
    },
    updateParticipant(item) {
      const participant = this.participants.find(p => p.name === item.name)
      if (participant) {
        participant.amountPaid = Number(item.amountPaid)
        if (participant.amountPaid < 0) participant.amountPaid = 0
        this.calculateSplit()
      }
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