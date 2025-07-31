import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for request data
type ValuesProps = void;

// type for classroom
interface Classroom {
  classroomId: number;
  name: string;
}

// Interface for returned data
type ActionProps = Classroom[];

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const getClassrooms = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("classroom/getAll", async (_, { rejectWithValue }) => {
  try {
    // should return list of classrooms
    const response = await useAuthAxios.get(`/api/v1/classroom`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

type ClassroomListProps = ActionProps | null;

// Interface for state
interface StateProps {
  classroomList: ClassroomListProps;
  isLoading: boolean;
  error: any;
}

const initialState = {
  classroomList: null,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const getClassroomsSlice = createSlice({
  name: "getClassrooms",
  initialState,
  reducers: {
    reset: (state) => {
      state.classroomList = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClassrooms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClassrooms.fulfilled, (state, action) => {
      state.classroomList = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getClassrooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = getClassroomsSlice.actions;
export default getClassroomsSlice.reducer;
