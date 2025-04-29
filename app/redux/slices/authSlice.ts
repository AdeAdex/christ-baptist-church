// /app/redux/slices/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChurchMember } from "@/app/types/user";

export interface AuthState {
  member: IChurchMember | null;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  member: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMember: (state, action: PayloadAction<{ member: IChurchMember; token: string; role: string | null }>) => {
      state.member = action.payload.member;
      state.token = action.payload.token;
      state.role = action.payload.role; // Assuming role is part of the member object
    },
    updateMember(state, action: PayloadAction<IChurchMember>) {
      if (state.member) {
        state.member = { ...state.member, ...action.payload };
      }
    },
    logout: (state) => {
      state.member = null;
      state.token = null;
    },
  },
});

export const { setMember, updateMember, logout } = authSlice.actions;
export default authSlice.reducer;
