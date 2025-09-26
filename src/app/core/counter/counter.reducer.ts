import { createReducer,on } from "@ngrx/store";
import {increment,setcount,decrement} from './counter.action'

export const initialState=0;

export const counterReducer=createReducer(
    initialState,
    on(increment,(state)=>state+1),
    on(setcount,(_,{value})=>value),
    on(decrement, (state) => state > 0 ? state - 1 : 0)

);