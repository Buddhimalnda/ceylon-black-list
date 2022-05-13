import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getFirebase } from "../../app/config.firebase";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    map: false,
    maps: [],
  },
  reducers: {
    setMap: (state, action) => {
      state.crews = action.payload;
    },
    addMap: (state, action) => {
      // const { auth } = getFirebase();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMap, addMap } = mapSlice.actions;

export const getMapList = (state) => state.crews;

export default mapSlice.reducer;
