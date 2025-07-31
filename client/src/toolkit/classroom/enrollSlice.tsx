import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for request data
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
export const enrollClassroom = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("classroom/enroll", async (values, { rejectWithValue }) => {
  try {
    await useAuthAxios.post(`/api/v1/classroom/enroll`, values);
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
export const enrollClassroomSlice = createSlice({
  name: "enrollClassroom",
  initialState,
  reducers: {
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(enrollClassroom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(enrollClassroom.fulfilled, (state) => {
      state.success = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(enrollClassroom.rejected, (state, action) => {
      state.success = false;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = enrollClassroomSlice.actions;
export default enrollClassroomSlice.reducer;
