
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}
export const clear = ({commit}) =>{
	commit('CLEAR')
}

export const updateSrc = ({commit},src) =>{
	commit('UPDATESRC',src)
}

export const sendUser = ({commit},userid) =>{
	commit('SENDUSER',userid)
}
export const sendResourceId = ({commit},uid) =>{
	commit('SENDRESOURCEID',uid)
}
export const searchKey = ({commit},key) =>{
	commit('SEARCHKEY',key)
}

export const setMessNumber = ({commit},num) =>{
	commit('SETMESSNUMBER',num)
}
export const setMyResourceS = ({commit},data) =>{
	commit('SENDMYRESOURCE',data)
}
export const setmyNoDemandS = ({commit},data) =>{
	commit('SENDNODEMEND',data)
}
export const setmyInvalidS = ({commit},data) =>{
	commit('SENDINVALID',data)
}
export const setmyReturnS = ({commit},data) =>{
	commit('SENDMYRETURN',data)
}
export const setmyCustomerS = ({commit},data) =>{
	commit('SENDMYCUSTOMER',data)
}
export const setmyStudentS = ({commit},data) =>{
	commit('SENDMYSTUDENT',data)
}
export const setmyContractS = ({commit},data) =>{
	commit('SENDMYCONTRACT',data)
}
export const setmyTeachS = ({commit},data) =>{
	commit('SENDMYTEACH',data)
}
export const setmyActS = ({commit},data) =>{
	commit('SENDMYACT',data)
}
export const setmyGAL = ({commit},data) =>{
	commit('SENDMYGAL',data)
}