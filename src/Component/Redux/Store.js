import { configureStore } from "@reduxjs/toolkit";
import Array from "./Redux"

export const Store=configureStore({
    reducer:{
        data:Array
    }
})