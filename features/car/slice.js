import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getFirebase } from "../../app/config.firebase";

export const carSlice = createSlice({
  name: "car",
  initialState: {
    car: false,
    cars: [],
  },
  reducers: {
    setCar: (state, action) => {
      state.cars = action.payload;
    },
    addCar: (state, action) => {
      // const { auth } = getFirebase();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCar, addCar } = carSlice.actions;

export const getCarList = (state) => state.cars;

export default carSlice.reducer;
