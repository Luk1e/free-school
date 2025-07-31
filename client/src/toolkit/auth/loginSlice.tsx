import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAxios } from "../../utils/hooks/useAxios";
import { authenticate } from "./authSlice";

// Interface for request data
interface ValuesProps {
  email: string;
  password: string;
  t?: any;
}

// Interface for returned data
interface ActionProps {}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducer */
export const login = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("auth/login", async (values, { dispatch, rejectWithValue }) => {
  try {
    await useAxios.post(`/api/v1/auth/login`, values);
    dispatch(authenticate());
  } catch (err: any) {
    if (err.response.status === 401) {
      return rejectWithValue(values.t("validation.invalid credentials") as any);
    }
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
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.success = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = loginSlice.actions;
export default loginSlice.reducer;
