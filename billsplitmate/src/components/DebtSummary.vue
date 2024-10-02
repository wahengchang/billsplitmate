/* eslint-disable */
<template>
  <v-card>
    <v-card-title>Debt Summary</v-card-title>
    <v-list>
      <v-list-item v-for="(debt, index) in debts" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ debt.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ debt.balance > 0 ? 'Is owed: $' + debt.balance.toFixed(2) : 'Owes: $' + (-debt.balance).toFixed(2) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
/* eslint-disable vue/return-in-computed-property */
export default {
  name: 'DebtSummary',
  props: {
    participants: {
      type: Array,
      required: true
    }
  },
  computed: {
    debts() {
      const totalExpense = this.participants.reduce((sum, p) => sum + p.amountPaid, 0);
      const averageExpense = totalExpense / this.participants.length;
      
      const result = this.participants.map(participant => {
        const balance = participant.amountPaid - averageExpense;
        return {
          name: participant.name,
          balance: Number(balance.toFixed(2))
        };
      });

      return result;
    }
  }
}
</script>