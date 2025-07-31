import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for  request data
interface ValuesProps {
  id: string | undefined;
}

// Interface for returned data
interface ActionProps {}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const deleteClassroom = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("classroom/delete", async ({ id }, { rejectWithValue }) => {
  try {
    await useAuthAxios.delete(`/api/v1/classroom/${id}`);
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
export const deleteClassroomSlice = createSlice({
  name: "deleteClassroom",
  initialState,
  reducers: {
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteClassroom.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteClassroom.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(deleteClassroom.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = deleteClassroomSlice.actions;
export default deleteClassroomSlice.reducer;
