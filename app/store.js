import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import crewReducer from "../features/crew/slice";
import pointReducer from "../features/points/slice";
import challengeReducer from "../features/challenge/slice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export default configureStore({
  reducer: {
    auth: authReducer,
    crew: crewReducer,
    point: pointReducer,
    challenge: challengeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
