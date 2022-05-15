import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const selectCounterValue = (state: RootState) => state.counter.value;

export const { decremented, incremented } = counterSlice.actions;

const { reducer } = counterSlice;

export default reducer;
