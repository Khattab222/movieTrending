import { createSlice } from "@reduxjs/toolkit";

let initialState = { counter: 0 , name: 'ahmed'}


let counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increass: (state) =>{state.counter +=1},
        decreass: (state) =>{state.counter -=1},
        increamentbyamount: (state,action) =>{
            state.counter += action.payload
        },
        reset:( state,action)=>{
                state.counter = 0
        }
    }
})

export let counterreducer = counterSlice.reducer;
export let {increass,decreass,increamentbyamount,reset} = counterSlice.actions;