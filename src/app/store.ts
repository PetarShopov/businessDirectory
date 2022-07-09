import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import businessesViewReducer from '../features/businessesView/businessesViewSlice';

export const store = configureStore({
  reducer: {
    businessesView: businessesViewReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
