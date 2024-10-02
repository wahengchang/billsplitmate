const state = {
    list: []
}

const mutations = {
    ADD_PARTICIPANT(state, participant) {
        state.list.push(participant)
    }
}

const actions = {
    addParticipant({ commit }, participant) {
        commit('ADD_PARTICIPANT', participant)
    }
}

const getters = {
    allParticipants: state => state.list
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}