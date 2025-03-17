import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        filterChange(state, { payload }){
            return payload
        }
    }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer