import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "active",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

const { actions, reducer } = filterSlice;

export default reducer;

export const { setFilter } = actions;
