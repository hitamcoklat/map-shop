import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default {
    state: {
        dataUser: []
    },
    getters: {
        getUser: (state) => {
            return state.dataUser;
        }
    },
    mutations: {

        resetUser: (state) => {
            state.dataUser = []
        },

        addToUser: (state, itemUser) => {
            state.dataUser = itemUser;
        },
    }
};