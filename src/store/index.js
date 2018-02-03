import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    adminInfo: {
        defaultImg: 'default.png'
    }
}
const mutations = {}
const actions = {
    getAdminData({commit}) {}
}

export default new Vuex.Store({
    state,
    mutations,
    actions
}) 