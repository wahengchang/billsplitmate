import { createStore } from 'vuex'

export default createStore({
    state: {
        expenses: [],
        participants: []
    },
    mutations: {
        ADD_EXPENSE(state, expense) {
            state.expenses.push(expense)
        },
        ADD_PARTICIPANT(state, participant) {
            state.participants.push(participant)
        }
    },
    actions: {
        addExpense({ commit }, expense) {
            commit('ADD_EXPENSE', expense)
        },
        addParticipant({ commit }, participant) {
            commit('ADD_PARTICIPANT', participant)
        }
    },
    getters: {
        allExpenses: state => state.expenses,
        allParticipants: state => state.participants
    }
})