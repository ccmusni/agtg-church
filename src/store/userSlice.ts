import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/auth-helpers-nextjs";

export interface IUserState {
  userState: User;
}

const initialState: IUserState = {
  userState: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<User>) => {
      state.userState = action.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;