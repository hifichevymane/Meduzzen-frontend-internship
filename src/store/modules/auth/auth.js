// Import states, actions, getters, mutations
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

// Auth module
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}