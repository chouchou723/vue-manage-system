//test
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