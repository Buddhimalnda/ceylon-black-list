import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getFirebase } from "../../app/config.firebase";

export const raceSlice = createSlice({
  name: "race",
  initialState: {
    race: false,
    races: [],
  },
  reducers: {
    setRace: (state, action) => {
      state.races = action.payload;
    },
    addRace: (state, action) => {
      // const { auth } = getFirebase();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRace, addRace } = raceSlice.actions;

export const getRaceList = (state) => state.races;

export default raceSlice.reducer;
