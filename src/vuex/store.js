import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
// let user = sessionStorage.getItem('user');
// if(user){
// var user1 = JSON.parse(user);
// var avatar = user1.avatar; 
// }else{
// var avatar = ''
// }
Vue.use(Vuex)

// 应用初始状态
const state = {
    // count: 0,
    // src: avatar,
    // user_id:'',
    // u_id:'',
    // u_status:'',
    // u_resource:'',
    searchKey:'',
    messageNumber:'',
    myResourceS:{},
    myNoDemandS:{},
    myInvalidS:{},
    myReturnS:{},
    myCustomerS:{},
    myStudentS:{},
    myContractS:{},
    myTeachS:{},
    myActS:{},
    myGal:'',
    
}

// 定义所需的 mutations
const mutations = {
    SENDMYRESOURCE(state,data){
        state.myResourceS = data;
    },
    SENDNODEMEND(state,data){
        state.myNoDemandS = data;
    },
    SENDINVALID(state,data){
        state.myInvalidS = data;
    },
    SENDMYRETURN(state,data){
        state.myReturnS = data;
    },
    SENDMYCUSTOMER(state,data){
        state.myCustomerS = data;
    },
    SENDMYSTUDENT(state,data){
        state.myStudentS = data;
    },
    SENDMYCONTRACT(state,data){
        state.myContractS = data;
    },
    SENDMYTEACH(state,data){
        state.myTeachS = data;
    },
    SENDMYACT(state,data){
        state.myActS = data;
    },
    SENDMYGAL(state,data){
        state.myGal = data;
    },
    // INCREMENT(state) {
    //     state.count++
    // },
    // DECREMENT(state) {
    //     state.count--
    // },
    // CLEAR(state){
    //     state.count = 0
    // },
    // UPDATESRC(state,src){
    //     state.src = src
    // },
    // SENDUSER(state,userid){
    //     state.user_id = userid
    // },
    // SENDRESOURCEID(state,uid){
    //     state.u_id = uid.u_id;
    //     state.u_status = uid.u_status;
    //     state.u_resource = uid.u_resource
    // },
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