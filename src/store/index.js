import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import cart from './modules/cart'
import users from './modules/users'
// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    cart,
    users
  }
})

export default store;
