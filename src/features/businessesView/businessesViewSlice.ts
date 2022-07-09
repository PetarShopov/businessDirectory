import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IBusiness } from '../../interfaces';
import BusinessService from '../../services/businessService';

export interface BusinessesViewState {
  businesses: IBusiness[];
  isBusinessesLoading: boolean;
  currentBusiness: IBusiness | undefined;
  nearbyBusinesses: IBusiness[];
}

const initialState: BusinessesViewState = {
  businesses: [],
  isBusinessesLoading: false,
  currentBusiness: undefined,
  nearbyBusinesses: [],
};

export const businessesViewSlice = createSlice({
  name: 'businessesView',
  initialState,
  reducers: {
    setBusinesses: (state, action: PayloadAction<IBusiness[]>) => {
      state.businesses = action.payload;
      state.isBusinessesLoading = false;
    },
    setBusinessesLoading: (state, action: PayloadAction<boolean>) => {
      state.isBusinessesLoading = action.payload;
    },
    setCurrentBusiness: (state, action: PayloadAction<IBusiness | undefined>) => {
      const nearbyBusinesses = state.businesses.filter((item: IBusiness) => {
        return item?.address?.city === action.payload?.address?.city && item?.id !== action.payload?.id;
      })
      state.currentBusiness = action.payload;
      state.nearbyBusinesses = nearbyBusinesses;
      state.isBusinessesLoading = false;
    },
  },
});

export const { setBusinesses, setBusinessesLoading, setCurrentBusiness } = businessesViewSlice.actions;

export const selectBusinesses = (state: RootState) => state.businessesView.businesses;
export const selectIsBusinessesLoading = (state: RootState) => state.businessesView.isBusinessesLoading;
export const selectCurrentBusiness = (state: RootState) => state.businessesView.currentBusiness;
export const selectNearbyBusinesses = (state: RootState) => state.businessesView.nearbyBusinesses;

export const getBusinesses = (): AppThunk => async (dispatch, getState) => {
  const businessService = new BusinessService();
  dispatch((setBusinessesLoading(true)));
  const result: IBusiness[] = await businessService.getBusinesses();
  dispatch((setBusinesses(result)));
};

export default businessesViewSlice.reducer;
