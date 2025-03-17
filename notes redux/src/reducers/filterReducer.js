export const filterChange = (value) => ({
    type: 'SET_FILTER',
    payload: value
})

const filterReducer = (state = 'ALL', {type, payload}) => {
    switch (type) {
        case 'SET_FILTER': return payload
        default: return state
    }
}

export default filterReducer