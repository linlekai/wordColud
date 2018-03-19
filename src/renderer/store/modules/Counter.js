const state = {
    main: 0,
    createOption: {

    },
    isCreated: false
}

const mutations = {
    DECREMENT_MAIN_COUNTER(state) {
        state.main--
    },
    INCREMENT_MAIN_COUNTER(state) {
        state.main++
    },
    SAVEOPTION(state, n) {
        state.createOption = n
        state.isCreated = true
    }
}

const actions = {
    someAsyncTask({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    },
    saveOption({ commit }, n) {
        commit("SAVEOPTION", n)
    }
}

export default {
    state,
    mutations,
    actions
}