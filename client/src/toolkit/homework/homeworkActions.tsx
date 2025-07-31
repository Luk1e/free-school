import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAuthAxios, useAuthFileAxios } from "../../utils/hooks/useAxios";

// Interface for request data
type ValuesProps = {
  classroomId: string | undefined;
  homeworkId: string | undefined;
  studentId: string | null;
  grade: number;
};

// Interface for returned data
interface ActionProps {}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducer */
export const gradeHomework = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "homework/grade",
  async (
    { classroomId, homeworkId, studentId, grade },
    { rejectWithValue }
  ) => {
    try {
      await useAuthAxios.patch(
        `/api/v1/classroom/${classroomId}/homeworks/${homeworkId}/${studentId}/grade`,
        grade
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

// Interface for request data
type SolutionValuesProps = {
  classroomId: string | undefined;
  homeworkId: string | undefined;
  file: File | undefined;
};

/* reducer */
export const submitSolution = createAsyncThunk<
  ActionProps,
  SolutionValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "homework/submit",
  async ({ classroomId, homeworkId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }

      await useAuthFileAxios.patch(
        `/api/v1/classroom/${classroomId}/homeworks/${homeworkId}/submit`,
        formData
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

// Interface for request data
type removeSolutionValuesProps = {
  classroomId: string | undefined;
  homeworkId: string | undefined;
};

/* reducer */
export const removeSolution = createAsyncThunk<
  ActionProps,
  removeSolutionValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "homework/removeSolutionFile",
  async ({ classroomId, homeworkId }, { rejectWithValue }) => {
    try {
      await useAuthAxios.patch(
        `/api/v1/classroom/${classroomId}/homeworks/${homeworkId}/remove`
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);
