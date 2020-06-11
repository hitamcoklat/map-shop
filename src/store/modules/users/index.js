import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default {
    state: {
        dataUser: [],
        isLoggedIn: false
    },
    getters: {
        getUser: (state) => {
            return state.dataUser;
        },
        getLoginStatus: (state) => {
            return state.isLoggedIn
        }
    },
    mutations: {

        resetUser: (state) => {
            state.isLoggedIn = false;
            state.dataUser = []
        },

        addToUser: (state, itemUser) => {
            state.isLoggedIn = true;
            state.dataUser = itemUser;
        },
    }
};