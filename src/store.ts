import { configureStore } from "@reduxjs/toolkit";
import reducerSelected from '@/redux/sliceSelectedUser'
import reducerMessages from '@/pages/MessageBox/redux/sliceMessages'
import reducerAiResponse from '@/pages/AiBox/redux/sliceAiResponse'

const store = configureStore({
     reducer : {
        reducerSelected,
        reducerMessages,
        reducerAiResponse 
     }
})
export type RootState = ReturnType<typeof store.getState>;
export default store ;