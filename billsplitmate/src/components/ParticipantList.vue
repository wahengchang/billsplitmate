<template>
  <v-card>
    <v-card-title class="text-subtitle-1 font-weight-bold primary white--text d-flex justify-start align-center">
      Bill Split Calculator
      <v-btn icon x-small @click="resetParticipants" flat>
        <v-icon x-small color="red">mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle class="pt-2 text-caption">
      Add participants and their expenses to calculate the split
    </v-card-subtitle>
    <v-card-text>
      <v-row align="center" class="mb-2">
        <v-col cols="12" sm="6">
          <h3 class="text-subtitle-2">Participants</h3>
        </v-col>
        <v-col cols="12" sm="6" class="text-sm-right">
          <v-btn color="primary" small @click="addParticipant">
            <v-icon small left>mdi-plus</v-icon>
            Add Participant
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="participantsWithCalculations"
        :items-per-page="-1"
        hide-default-footer
        dense
        class="smaller-text"
      >
        <template #[`item.name`]="{ item }">
          <v-text-field
            v-model="item.name"
            @input="updateParticipant(item)"
            dense
            hide-details
            single-line
            class="smaller-input"
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
            class="smaller-input"
          ></v-text-field>
        </template>
        <template #[`item.toPay`]="{ item }">
          <v-chip
            :color="getChipColor(item.toPay)"
            text-color="white"
            x-small
          >
            {{ item.toPay.toFixed(2) }}
          </v-chip>
        </template>
        <template #[`item.toReceive`]="{ item }">
          <v-chip
            :color="getChipColor(item.toReceive)"
            text-color="white"
            x-small
          >
            {{ item.toReceive.toFixed(2) }}
          </v-chip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn icon x-small @click="removeParticipant(item.id)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ParticipantList',
  props: {
    participants: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        { title: '#', value: 'index', width: '5%' },
        { title: 'Name', value: 'name', width: '35%' },
        { title: 'Amount Paid', value: 'amountPaid', width: '20%' },
        { title: 'To Pay', value: 'toPay', width: '15%' },
        { title: 'To Receive', value: 'toReceive', width: '15%' },
        { title: 'Actions', value: 'actions', sortable: false, width: '10%' }
      ]
    }
  },
  computed: {
    participantsWithCalculations() {
      const totalPaid = this.participants.reduce((sum, p) => sum + p.amountPaid, 0);
      const averagePaid = totalPaid / this.participants.length;

      return this.participants.map((participant, index) => {
        const balance = participant.amountPaid - averagePaid;
        return {
          ...participant,
          index: index + 1,
          toPay: balance < 0 ? -balance : 0,
          toReceive: balance > 0 ? balance : 0
        };
      });
    }
  },
  methods: {
    addParticipant() {
      this.$emit('add-participant', {
        name: `Participant ${this.participants.length + 1}`,
        amountPaid: 0
      })
    },
    removeParticipant(id) {
      this.$emit('remove-participant', id)
    },
    updateParticipant(item) {
      this.$emit('update-participant', {
        ...item,
        amountPaid: Number(item.amountPaid)
      })
    },
    getChipColor(value) {
      if (value === 0) return 'gray';
      return value > 0 ? 'green' : 'red';
    },
    resetParticipants() {
      this.$emit('reset-participants')
    }
  }
}
</script>

<style scoped>
.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: auto;
}

.smaller-text ::v-deep .v-data-table__wrapper {
  font-size: 0.875rem;
}

.smaller-input ::v-deep input {
  font-size: 0.875rem;
}

.v-chip {
  font-size: 0.75rem;
}
</style>