import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for request data
type ValuesProps = {
  classroomId: string | undefined;
};

// type for homework
export interface HomeworkType {
  homeworkId: string;
  title: string;
  // for student
  status: "ASSIGNED" | "SUBMITTED" | "GRADED";
  grade: number;
  totalGrade: number;

  // for teacher
  studentNumber: number;
  submittedNumber: number;
}

// Interface for returned data
type ActionProps = HomeworkType[];

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const getHomeworks = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("homework/getAll", async ({ classroomId }, { rejectWithValue }) => {
  try {
    // should return list of homeworks
    const response = await useAuthAxios.get(
      `/api/v1/classroom/${classroomId}/homeworks`
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

type HomeworkListProps = ActionProps | null;

// Interface for state
interface StateProps {
  homeworkList: HomeworkListProps;
  isLoading: boolean;
  error: any;
}

const initialState = {
  homeworkList: null,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const getHomeworksSlice = createSlice({
  name: "getHomeworks",
  initialState,
  reducers: {
    reset: (state) => {
      state.homeworkList = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeworks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHomeworks.fulfilled, (state, action) => {
      state.homeworkList = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getHomeworks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = getHomeworksSlice.actions;
export default getHomeworksSlice.reducer;
