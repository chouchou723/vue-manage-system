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
    src: avatar,
    user_id:'',
    u_id:'',
    u_status:'',
    u_resource:'',
    searchKey:'',
    messageNumber:''
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
    },
    SENDUSER(state,userid){
        state.user_id = userid
    },
    SENDRESOURCEID(state,uid){
        state.u_id = uid.u_id;
        state.u_status = uid.u_status;
        state.u_resource = uid.u_resource
    },
    SEARCHKEY(state,key){
        state.searchKey = key
    },
    SETMESSNUMBER(state,num){
        state.messageNumber = num
    }
}

// 创建 store 实例
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})