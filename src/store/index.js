import { createStore } from 'vuex';
import auth from './modules/auth/auth';
import users from './modules/users/users';
import companies from './modules/companies/companies';
import quizzes from './modules/quizzes/quizzes';
import notifications from './modules/notifications/notifications';
import VuexPersistence from 'vuex-persist';

// Enable save the state of the app after reloading a page
const vuexLocal = new VuexPersistence({
  storage: window.localStorage // save in Local storage
})

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

    // Return page size number (doesn't work properly with returning state)
    getPageSize() {
      return 12;
    },
  },

  actions: {
    // Reset testing string action
    resetTestingString(context) {
      context.commit('resetTestingString');
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

  // All modules
  modules: {
    auth,
    users,
    companies,
    quizzes,
    notifications,
  },

  // All plugins
  plugins: [vuexLocal.plugin]
});

export default store;
