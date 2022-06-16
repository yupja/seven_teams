import { createSlice } from "@reduxjs/toolkit";

const writeSlice = createSlice({
  name: "write",
  initialState: {
    name: "펄이 고양이",
    write_data: [],
    age: 100,
  },
  reducers: {
    changeName: (state, action) => {
      state.write_data = action.payload;
    },
    completeName: (state, action) => {
      state.write_data = action.payload;
    },
  },
});

export const { changeName } = writeSlice.actions;
export default writeSlice.reducer;
