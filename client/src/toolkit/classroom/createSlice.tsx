import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for  request data
interface ValuesProps {
  name: string;
}

// Interface for returned data
interface ActionProps {}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const createClassroom = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("classroom/create", async (values, { rejectWithValue }) => {
  try {
    // should return classroom id (long value)
    const response = await useAuthAxios.post<number>(
      `/api/v1/classroom`,
      values
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

// Interface for state
interface StateProps {
  success: object | null;
  isLoading: boolean;
  error: any;
}

const initialState = {
  success: null,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const createClassroomSlice = createSlice({
  name: "createClassroom",
  initialState,
  reducers: {
    reset: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createClassroom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createClassroom.fulfilled, (state, action) => {
      state.success = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(createClassroom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = createClassroomSlice.actions;
export default createClassroomSlice.reducer;
