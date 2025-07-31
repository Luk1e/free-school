import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for  request data
interface ValuesProps {
  classroomId: string | undefined;
  homeworkId: string | undefined;
}

// Interface for returned data
interface ActionProps {}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const deleteHomework = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "homework/delete",
  async ({ classroomId, homeworkId }, { rejectWithValue }) => {
    try {
      await useAuthAxios.delete(
        `/api/v1/classroom/${classroomId}/homeworks/${homeworkId}`
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

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
export const deleteHomeworkSlice = createSlice({
  name: "deleteHomework",
  initialState,
  reducers: {
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteHomework.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteHomework.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(deleteHomework.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = deleteHomeworkSlice.actions;
export default deleteHomeworkSlice.reducer;
