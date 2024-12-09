import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalStoreState {
  lng: string;
}

const initialState: GlobalStoreState = {
  lng: "en",
};

const globalStoreSlice = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    setLng(state, action: PayloadAction<string>) {
      state.lng = action.payload;
    },
  },
});

export const { setLng } = globalStoreSlice.actions;
export default globalStoreSlice.reducer;
