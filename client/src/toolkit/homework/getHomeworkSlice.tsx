import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios, useAuthFileAxios } from "../../utils/hooks/useAxios";

// Interface for request data
type ValuesProps = {
  classroomId: string | undefined;
  homeworkId: string | undefined;
};

// type for fileDTO
type FileType = {
  name: string;
  size: number;
  downloadUrl: string;
};

// Interface for returned data
interface ActionProps {
  title: string;
  instruction: string;
  totalGrade: number;
  homeworkFile: FileType | null;
}

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const getHomework = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("homework/get", async ({ classroomId, homeworkId }, { rejectWithValue }) => {
  try {
    // should return homework
    const response = await useAuthAxios.get(
      `/api/v1/classroom/${classroomId}/homeworks/${homeworkId}/details`
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

interface UpdateHomeworkProps
  extends Omit<ActionProps, "homeworkFile">,
    ValuesProps {
  file: File | undefined;
}

export const updateHomework = createAsyncThunk<
  void,
  UpdateHomeworkProps,
  { rejectValue: RejectWithValueProps }
>(
  "homework/update",
  async (
    { title, instruction, totalGrade, file, classroomId, homeworkId },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("instruction", instruction);
      formData.append("totalGrade", totalGrade.toString()); // Convert to string

      // Handle file if present
      if (file) {
        formData.append("file", file);
      }

      await useAuthFileAxios.patch(
        `/api/v1/classroom/${classroomId}/homeworks/${homeworkId}/update`,
        formData
      );
    } catch (err: any) {
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

/* reducers */
export const removeHomeworkFile = createAsyncThunk<
  void,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>(
  "homework/removeHomeworkFile",
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

export type HomeworkType = ActionProps | null;

// Interface for state
interface StateProps {
  homework: HomeworkType;
  success: boolean;
  successRemoveHomework: boolean;
  isLoading: boolean;
  error: any;
}

const initialState = {
  homework: null,
  success: false,
  successRemoveHomework: false,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const getHomeworkSlice = createSlice({
  name: "getHomework",
  initialState,
  reducers: {
    reset: (state) => {
      state.homework = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomework.pending, (state) => {
      state.success = false;
      state.isLoading = true;
    });

    builder.addCase(updateHomework.pending, (state) => {
      state.success = false;
      state.isLoading = true;
    });

    builder.addCase(removeHomeworkFile.pending, (state) => {
      state.successRemoveHomework = false;
      state.isLoading = true;
    });

    builder.addCase(getHomework.fulfilled, (state, action) => {
      state.homework = action.payload;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(updateHomework.fulfilled, (state) => {
      state.success = true;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(removeHomeworkFile.fulfilled, (state) => {
      state.successRemoveHomework = true;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(getHomework.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateHomework.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(removeHomeworkFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = getHomeworkSlice.actions;
export default getHomeworkSlice.reducer;
