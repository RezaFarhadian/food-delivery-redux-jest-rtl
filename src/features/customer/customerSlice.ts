import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CustomerState {
  authorized: boolean;
  email: string;
  token: string;
  message: string;
  address: string;
};

const initialState: CustomerState = {
  authorized: false,
  email: '',
  token: '',
  message: '',
  address: ''
};

type IncomingCustomerState = Omit<CustomerState, 'authorized' | 'email' | 'message' | 'address'>
type OutgoingCustomerState = {
  email: string;
  password: string;
};

export const fetchCredentials = createAsyncThunk<
  IncomingCustomerState,
  OutgoingCustomerState
>('auth/fetchCredentials', async ({ email, password }: OutgoingCustomerState, { rejectWithValue }) => {
  const res = await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const result = await res.json();
  if (res.status !== 200 ) return rejectWithValue({ token: undefined });
  return result;
})

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCredentials.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
      state.authorized = true;
      state.token = action.payload.token;
    });
    builder.addCase(fetchCredentials.rejected, (state) => {
      state.message = 'Something went wrong!';
    })
  },
});

export const { setAddress } = customerSlice.actions;
export const selectAuthorized = (state: RootState) => state.customer.authorized;
export const selectMessage = (state: RootState) => state.customer.message;
export const selectAddress = (state: RootState) => state.customer.address;

export default customerSlice.reducer;
