import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export let getTrending = createAsyncThunk('movies/gettrending', async (type) => {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=5a85e1a3818a5372ba0f9e7742424f0f`);

    return data.results
 })


let initialState = { trendingMovies:[] , loading: false}
let moviesSlice = createSlice({
    name:"movies",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getTrending.fulfilled, (state,action) => {
            state.trendingMovies= action.payload;
        })
    }

})


export let moviereducer = moviesSlice.reducer;