import { configureStore } from "@reduxjs/toolkit";
import picturesReducer from '../feature/picturesSlice';

export default configureStore({
  // Tous les reducers sont stockés ici
  reducer: {
    // picturesReducer est récupé depuis le slice
    pictures: picturesReducer,
  }
})
