import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getFirebase } from "../../app/config.firebase";

export const crewSlice = createSlice({
  name: "crew",
  initialState: {
    crew: false,
    crews: [],
  },
  reducers: {
    setCrew: (state, action) => {
      state.crews = action.payload;
    },
    addCrew: (state, action) => {
      // const { auth } = getFirebase();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCrew, addCrew } = crewSlice.actions;

export const getCrewList = (state) => state.crews;

export default crewSlice.reducer;
