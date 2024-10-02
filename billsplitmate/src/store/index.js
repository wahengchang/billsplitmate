import { createStore } from 'vuex'

export default createStore({
    state: {
        participants: []
    },
    getters: {
        getParticipants: state => state.participants
    },
    mutations: {
        SET_PARTICIPANTS(state, participants) {
            state.participants = participants
        }
    },
    actions: {
        updateParticipants({ commit }, participants) {
            commit('SET_PARTICIPANTS', participants)
        }
    }
})