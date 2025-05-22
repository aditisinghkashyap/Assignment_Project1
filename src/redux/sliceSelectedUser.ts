import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType{
    selectedItem : number | null 
}

const initialState : InitialStateType = {
    selectedItem : null
}
const sliceSelectedUsers = createSlice({
    name : 'sliceSelectedUsers' ,
    initialState ,
    reducers : {
         changeState : ( state , action : PayloadAction<number|null> ) => {
            state.selectedItem =  action.payload ;  
         }
    }

})

export const { changeState } = sliceSelectedUsers.actions  ;
export default sliceSelectedUsers.reducer ;