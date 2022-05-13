import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getFirebase } from "../../app/config.firebase";

export const pointSlice = createSlice({
  name: "point",
  initialState: {
    point: false,
    points: [],
  },
  reducers: {
    setPoint: (state, action) => {
      state.crews = action.payload;
    },
    addPoint: (state, action) => {
      // const { auth } = getFirebase();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPoint, addPoint } = pointSlice.actions;

export const getPointList = (state) => state.crews;

export default pointSlice.reducer;
