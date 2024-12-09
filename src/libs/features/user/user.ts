import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/types/User";
import { VoucherOrder } from "@/types/Voucher";

const initialState: UserState = {
  token: null,
  voucher: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setVoucher(state, action: PayloadAction<VoucherOrder>) {
      state.voucher = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
