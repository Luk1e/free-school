import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for request data
type ValuesProps = {
  classroomId: string | undefined;
  homeworkId: string | undefined;
};

// type for student homework
export interface StudentHomeworkType {
  studentId: number;
  firstName: string;
  lastName: string;
  grade: number;
  status: "ASSIGNED" | "SUBMITTED" | "GRADED";
}

// Interface for returned data
interface ActionProps {
  title: string;
  totalGrade: number;
  studentHomeworkDTOS: StudentHomeworkType[];
}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const getStudentHomeworks = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "homework/getAllStudentHomework",
  async ({ classroomId, homeworkId }, { rejectWithValue }) => {
    try {
      // should return list of homeworks
      const response = await useAuthAxios.get(
        `/api/v1/classroom/${classroomId}/homeworks/${homeworkId}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

type StudentHomeworkListProps = ActionProps | null;

// Interface for state
interface StateProps {
  studentHomeworkList: StudentHomeworkListProps;
  isLoading: boolean;
  error: any;
}

const initialState = {
  studentHomeworkList: null,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const getStudentHomeworksSlice = createSlice({
  name: "getStudentHomeworks",
  initialState,
  reducers: {
    reset: (state) => {
      state.studentHomeworkList = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudentHomeworks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStudentHomeworks.fulfilled, (state, action) => {
      state.studentHomeworkList = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getStudentHomeworks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = getStudentHomeworksSlice.actions;
export default getStudentHomeworksSlice.reducer;
