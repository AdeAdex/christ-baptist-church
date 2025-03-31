import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MinistriesState {
  ministries: string[];
}

const initialState: MinistriesState = {
  ministries: [],
};

const ministriesSlice = createSlice({
  name: "ministries",
  initialState,
  reducers: {
    setMinistries: (state, action: PayloadAction<string[]>) => {
      state.ministries = action.payload;
    },
  },
});

export const { setMinistries } = ministriesSlice.actions;
export default ministriesSlice.reducer;
