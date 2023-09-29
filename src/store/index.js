import { createStore } from 'vuex';

// Vuex store
const store = createStore({
  state() {
    return {
      testString: 'Vuex test',
    }
  },

  getters: {
    // Get the testing string
    getTestString(state) {
      return state.testString;
    },
  },

  mutations: {
    // Add 'A' char to testing string mutation
    addCharAtoString(state) {
      state.testString += 'A';
    },

    // Delete last char from testing string mutation
    deleteCharFromString(state) {
      state.testString = state.testString.slice(0, -1);
    },

    // Reset testing string mutation
    resetTestingString(state) {
      state.testString = 'Vuex test';
    }
  },

  actions: {
    // Reset testing string action
    resetTestingString(context) {
      context.commit('resetTestingString');
    },
  }
});

export default store;
