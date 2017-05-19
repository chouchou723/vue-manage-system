import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
let user = localStorage.getItem('user');
if(user){
var user1 = JSON.parse(user);
var avatar = user1.avatar; 
}else{
var avatar = ''
}
Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 0,
    src: avatar
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    CLEAR(state){
        state.count = 0
    },
    UPDATESRC(state,src){
        state.src = src
    }
}

// 创建 store 实例
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})