const state = {
    list: []
}

const mutations = {
    ADD_EXPENSE(state, expense) {
        state.list.push(expense)
    }
}

const actions = {
    addExpense({ commit }, expense) {
        commit('ADD_EXPENSE', expense)
    }
}

const getters = {
    allExpenses: state => state.list
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}