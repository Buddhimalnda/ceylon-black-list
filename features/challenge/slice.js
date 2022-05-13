import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getFirebase } from "../../app/config.firebase";

export const challengeSlice = createSlice({
  name: "challenge",
  initialState: {
    challenge: false,
    challenges: [],
  },
  reducers: {
    setChallenge: (state, action) => {
      state.challenges = action.payload;
    },
    addChallenge: (state, action) => {
      // const { auth } = getFirebase();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChallenge, addChallenge } = challengeSlice.actions;

export const getChallengeList = (state) => state.challenge;

export default challengeSlice.reducer;
