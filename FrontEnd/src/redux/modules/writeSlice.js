import { createSlice} from "@reduxjs/toolkit";

const writeSlice = createSlice({
    name: "cat",
    initialState: {
        name: "펄이 고양이",
        age: 5,
    },
    reducers: {
        changeName: (state, action)=>{
            state.name = action.payload;
        }
    }
});

export const{changeName} = writeSlice.actions;
export default writeSlice.reducer;