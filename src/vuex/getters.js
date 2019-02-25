//test
export const getCount = state => {
    return state.count
},
export const getStorage = state => {
    if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
    }
    return state.user
}
