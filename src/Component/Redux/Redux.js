import { createSlice } from "@reduxjs/toolkit";
import MainJsonArray from "../Json/Main.json"

export const Redux=createSlice({
    name:"book my show",
    initialState:{
        ticketArray:[],
        array_recommended:  MainJsonArray.array_recommended, 
        CarouselOneImg: MainJsonArray.CarouselOneImg,
        LiveEvent:  MainJsonArray.LiveEvent,
        array_cast: MainJsonArray.array_cast,
        theater: MainJsonArray.Theater,
        duplicateTheaterSeat:[],
        defaultLocation:"Chennai",
        arrayTicketCount:MainJsonArray.seatCount,
        snackList:MainJsonArray.snacksItems,
        theaterAplhabet:MainJsonArray.theaterAplhabet,
        searchValues:[]
    },
    reducers:{
        updateTicketArray:(state,action)=>{
            state.ticketArray=action.payload
        },
        updateduplicateTheaterSeat:(state,action)=>{
            state.duplicateTheaterSeat=action.payload
        },
        updatedefaultLocation:(state,action)=>{
            state.defaultLocation=action.payload
        },
        updateTheater:(state,action)=>{
            state.theater=action.payload
        },
        updateSearch:(state,action)=>{
            state.searchValues=action.payload
        }
    }
})
export default Redux.reducer
export const{updateduplicateTheaterSeat,updatedefaultLocation,updateTicketArray,updateTheater,updateSearch}=Redux.actions