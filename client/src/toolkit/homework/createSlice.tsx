import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthFileAxios } from "../../utils/hooks/useAxios";

// Interface for  request data
interface ValuesProps {
  classroomId: string | undefined;
  title: string;
  instruction: string;
  totalGrade: number;
  file: File | undefined;
}

// Interface for returned data
interface ActionProps {}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const createHomework = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("homework/create", async (values, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("instruction", values.instruction);
    formData.append("totalGrade", values.totalGrade.toString()); // Convert to string

    // Handle file if present
    if (values.file) {
      formData.append("file", values.file);
    }

    // should return homework id (long value)
    const response = await useAuthFileAxios.post<number>(
      `/api/v1/classroom/${values.classroomId}/homeworks`,
      formData
    );

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

// Interface for state
interface StateProps {
  homeworkId: object | null;
  isLoading: boolean;
  error: any;
}

const initialState = {
  homeworkId: null,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const createHomeworkSlice = createSlice({
  name: "createHomework",
  initialState,
  reducers: {
    reset: (state) => {
      state.homeworkId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createHomework.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createHomework.fulfilled, (state, action) => {
      state.homeworkId = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(createHomework.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = createHomeworkSlice.actions;
export default createHomeworkSlice.reducer;
