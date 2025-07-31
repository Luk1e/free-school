import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";
import {
  gradeHomework,
  removeSolution,
  submitSolution,
} from "./homeworkActions";

// Interface for request data
type ValuesProps = {
  classroomId: string | undefined;
  homeworkId: string | undefined;
  studentId: string | null;
};

// type for fileDTO
type FileType = {
  name: string;
  size: number;
  downloadUrl: string;
};

// Interface for returned data
interface ActionProps {
  homeworkId: string;
  title: string;
  instruction: string;
  grade: number;
  totalGrade: number;
  homeworkFile: FileType | null;
  solutionFile: FileType | null;
  status: "ASSIGNED" | "SUBMITTED" | "GRADED";
}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

export type HomeworkType = ActionProps | null;

/* reducers */
export const getStudentHomework = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "homework/getStudentHomework",
  async ({ classroomId, homeworkId, studentId }, { rejectWithValue }) => {
    try {
      // should return homework
      const response = await useAuthAxios.get(
        `/api/v1/classroom/${classroomId}/homeworks/${homeworkId}/${studentId}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

type HomeworkProps = ActionProps | null;

// Interface for state
interface StateProps {
  homework: HomeworkProps;
  success: boolean;
  isLoading: boolean;
  error: any;
}

const initialState = {
  homework: null,
  success: false,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const homeworkSlice = createSlice({
  name: "homework",
  initialState,
  reducers: {
    reset: (state) => {
      state.homework = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudentHomework.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(gradeHomework.pending, (state) => {
      state.success = false;
      state.isLoading = false;
    });

    builder.addCase(submitSolution.pending, (state) => {
      state.success = false;
      state.isLoading = false;
    });

    builder.addCase(removeSolution.pending, (state) => {
      state.success = false;
      state.isLoading = false;
    });

    builder.addCase(getStudentHomework.fulfilled, (state, action) => {
      state.homework = action.payload;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(gradeHomework.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(submitSolution.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(removeSolution.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(getStudentHomework.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(gradeHomework.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(submitSolution.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(removeSolution.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = homeworkSlice.actions;
export default homeworkSlice.reducer;
