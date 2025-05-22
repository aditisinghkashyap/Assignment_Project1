import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface bodyType {
    loading : boolean ,
    history : { role : string , content : string }[],
    error : string | null 
}
const initialState : Record<string,bodyType> =  {} ;

const sliceMessages = createSlice({
    name : 'sliceMessages' ,
    initialState ,
    reducers : {
       fetchUser : ( state , action : PayloadAction<string> ) => {
         if( !state[action.payload] ){
            state[ action.payload ] = { 
                loading : false, 
                history : [] ,
                error : null
            }
         }
         
         state[ action.payload ].loading = true ;   
       },
       fetchUserSuccess : ( state , action : PayloadAction<{ id : string , role : string , content : string}>) => {
          state[ action.payload.id ].loading = false ;
          state[ action.payload.id ].history.push({ role : action.payload.role , content : action.payload.content}) ;
       },
       fetchUserFailed : ( state , action : PayloadAction<{ id : string , error : string }> ) => {
          state[ action.payload.id ].loading = false ;
          state[ action.payload.id ].error = action.payload.error 

       },
       addMessage : ( state , action : PayloadAction<{ id : string , role : string , content : string }> ) => {
           state[ action.payload.id ].history.push({ role : action.payload.role , content : action.payload.content }) ;
       }
    }
})

export const { fetchUser , fetchUserSuccess , fetchUserFailed , addMessage} = sliceMessages.actions ;
export default sliceMessages.reducer ;
