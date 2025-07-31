// Import Redux toolkit
import { configureStore } from "@reduxjs/toolkit";
// Import root reducer
import rootReducer from "./rootReducer";

// Export store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof rootReducer>;
