import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";

// Interface for request data
type ValuesProps = void;

// type for notification
export interface NotificationType {
  notificationId: number;
  text: string;
  dateTime: string;
  status: "READ" | "UNREAD";
}

export interface LatestNotificationDTO {
  numberOfUnreadNotification: number;
  latestNotifications: NotificationType[];
}

// Interface for returned data
type ActionProps = LatestNotificationDTO;

// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const getLatestNotifications = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("user/getLatestNotifications", async (_, { rejectWithValue }) => {
  try {
    // should return list of latest notifications with unread notification numbe
    const response = await useAuthAxios.get(
      `/api/v1/user/notifications/latest`
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

type NotificationListProps = ActionProps | null;

// Interface for state
interface StateProps {
  latestNotifications: NotificationListProps;
  isLoading: boolean;
  error: any;
}

const initialState = {
  latestNotifications: null,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const getLatestNotificationsSlice = createSlice({
  name: "getLatestNotifications",
  initialState,
  reducers: {
    reset: (state) => {
      state.latestNotifications = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLatestNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLatestNotifications.fulfilled, (state, action) => {
      state.latestNotifications = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getLatestNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = getLatestNotificationsSlice.actions;
export default getLatestNotificationsSlice.reducer;
