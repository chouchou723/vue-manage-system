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
<<<<<<< HEAD
=======

export const sendResourceId = ({commit},uid) =>{
	commit('SENDRESOURCEID',uid)
}
>>>>>>> a93aa82b3ccc697119e50f1e17fb1b2ebada015f
