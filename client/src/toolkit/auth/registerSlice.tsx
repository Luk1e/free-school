import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAxios } from "../../utils/hooks/useAxios";
import { authenticate } from "./authSlice";

// Interface for request data
interface ValuesProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  status: number;
}

// Interface for returned data
interface ActionProps {}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducer */
export const register = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("auth/register", async ({ data, status }, { dispatch, rejectWithValue }) => {
  try {
    await useAxios.post(`/api/v1/auth/register?status=${status}`, data);
    dispatch(authenticate());
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

// Interface for state
interface StateProps {
  success: boolean;
  isLoading: boolean;
  error: any;
}

const initialState = {
  success: false,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = registerSlice.actions;
export default registerSlice.reducer;
