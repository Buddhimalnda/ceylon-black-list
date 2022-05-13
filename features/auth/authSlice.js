import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getFirebase } from "../../app/config.firebase";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: false,
    userData: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    getUser: (state) => {},
    logout: (state) => {
      const { auth } = getFirebase();

      if (state.user) signOut(auth);
    },
    Login: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser, logout, Login, setUser } = authSlice.actions;

export default authSlice.reducer;
