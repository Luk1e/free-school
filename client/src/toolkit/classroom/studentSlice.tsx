import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for request data
type ValuesProps = {
  id: string | undefined;
};

// type for student
export interface StudentProps {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  status: "PENDING" | "APPROVED";
}

// Interface for returned data
type ActionProps = StudentProps[];

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const getStudents = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("classroom/getStudents", async ({ id }, { rejectWithValue }) => {
  try {
    // should return list of students
    const response = await useAuthAxios.get(`/api/v1/classroom/${id}/students`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

type CustomActionProps = void;
type CustomValuesProps = {
  classroomId: string | undefined;
  studentId: string | undefined;
};

export const acceptStudent = createAsyncThunk<
  CustomActionProps,
  CustomValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "classroom/acceptStudent",
  async ({ classroomId, studentId }, { rejectWithValue }) => {
    try {
      await useAuthAxios.patch(
        `/api/v1/classroom/${classroomId}/students/${studentId}/accept`
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const rejectStudent = createAsyncThunk<
  CustomActionProps,
  CustomValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "classroom/rejectStudent",
  async ({ classroomId, studentId }, { rejectWithValue }) => {
    try {
      await useAuthAxios.delete(
        `/api/v1/classroom/${classroomId}/students/${studentId}/reject`
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const removeStudent = createAsyncThunk<
  CustomActionProps,
  CustomValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "classroom/removeStudent",
  async ({ classroomId, studentId }, { rejectWithValue }) => {
    try {
      await useAuthAxios.delete(
        `/api/v1/classroom/${classroomId}/students/${studentId}/remove`
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

type StudentListProps = ActionProps | null;

// Interface for state
interface StateProps {
  studentList: StudentListProps;
  success: boolean;
  isLoading: boolean;
  error: any;
}

const initialState = {
  studentList: null,
  success: false,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    reset: (state) => {
      state.studentList = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get students request
    builder.addCase(getStudents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.studentList = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getStudents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Accept student request
    builder.addCase(acceptStudent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(acceptStudent.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(acceptStudent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Reject student request
    builder.addCase(rejectStudent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(rejectStudent.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(rejectStudent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Remove student request
    builder.addCase(removeStudent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeStudent.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(removeStudent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
