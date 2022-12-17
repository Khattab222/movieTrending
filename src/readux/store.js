import { configureStore } from "@reduxjs/toolkit";
import { moviereducer } from "./moviesREducer";
import { counterreducer } from './reducer';





let store = configureStore({
    reducer:{
        counter: counterreducer,
        movie:moviereducer
    }
})


export default store;