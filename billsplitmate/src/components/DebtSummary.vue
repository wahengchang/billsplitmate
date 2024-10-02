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
import { mapGetters } from 'vuex'

export default {
  name: 'DebtSummary',
  computed: {
    ...mapGetters(['getDebts']),
    debts() {
      return this.getDebts
    }
  }
}
</script>