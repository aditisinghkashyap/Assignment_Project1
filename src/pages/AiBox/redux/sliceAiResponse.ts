import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface InitialStateType{
    error : string | null ,
    response : {role : string , content : string }[]
}

const initialState : InitialStateType = {
    error : null , 
    response  : []
}
const sliceAiResponse = createSlice({
    name : 'sliceAiResponse' ,
    initialState ,
    reducers : {
        addPrompt : ( state , action : PayloadAction<{ role : string ,content : string }>) => {
           state.response.push( action.payload)
        } ,
         aiResponseSuccess : ( state , action : PayloadAction<{ role : string ,  content : string }> ) => {
              state.response.push(action.payload) ;
              state.error =null;
         },
         aiResponseFailed : ( state , action :PayloadAction<string> ) => {
              state.error = action.payload ;
         }
    } 
})

export const { aiResponseSuccess , aiResponseFailed ,addPrompt } = sliceAiResponse.actions ;
export default sliceAiResponse.reducer 