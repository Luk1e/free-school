import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for request data
type ValuesProps = void;

// Interface for returned data
interface ActionProps {
  firstName: string;
  lastName: string;
  email: string;
  status: "TEACHER" | "STUDENT";
}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const authenticate = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("auth/authentication", async (_, { rejectWithValue }) => {
  try {
    const { data } = await useAuthAxios.get(`/api/v1/auth/authenticate`);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

export const refresh = createAsyncThunk<
  any,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("auth/refresh", async (_, { dispatch, rejectWithValue }) => {
  try {
    await useAuthAxios.post(`/api/v1/auth/refresh`);
    dispatch(authenticate());
  } catch (err: any) {
    dispatch(logout());
    return rejectWithValue(err.response.data.errors[0]);
  }
});

export const logout = createAsyncThunk<
  any,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await useAuthAxios.post(`/api/v1/auth/logout`);
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

export type AuthUserProps = ActionProps | null;

// Interface for state
interface StateProps {
  user: AuthUserProps;
  isLoading: boolean;
  error: any;
}

const initialState = {
  user: null,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
