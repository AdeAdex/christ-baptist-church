import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChurchMember } from "@/app/types/user";

interface AlMembersState {
  members: IChurchMember[];
}

const initialState: AlMembersState = {
  members: [],
};

const alMembersSlice = createSlice({
  name: "alMembers",
  initialState,
  reducers: {
    setAlMembers: (state, action: PayloadAction<IChurchMember[]>) => {
      state.members = action.payload;
    },
    updateAlMember: (state, action: PayloadAction<IChurchMember>) => {
      state.members = state.members.map((member) =>
        member._id === action.payload._id ? { ...member, ...action.payload } : member
      );
    },
  },
});

export const { setAlMembers, updateAlMember } = alMembersSlice.actions;
export default alMembersSlice.reducer;
