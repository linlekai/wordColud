const state = {
    main: 0,
    createOption: {

    },
    openTextarea: false,
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
    },
    SETTEXTAREA(state, bool) {
        state.openTextarea = bool
    }
}

const actions = {
    someAsyncTask({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    },
    saveOption({ commit }, n) {
        commit("SAVEOPTION", n)
    },
    setTextarea({ commit }, bool) {
        commit("SETTEXTAREA", bool)
    }
}

export default {
    state,
    mutations,
    actions
}