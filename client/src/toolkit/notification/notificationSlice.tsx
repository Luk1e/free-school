import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuthAxios } from "../../utils/hooks/useAxios";
import { getLatestNotifications } from "./latestNotificationSlice";

// Interface for request data
type ValuesProps = void;

// type for notification
export interface NotificationType {
  notificationId: number;
  text: string;
  dateTime: string;
  status: "READ" | "UNREAD";
}

export interface NotificationGroupedByDateDTO {
  date: string;
  notifications: NotificationType[];
}

// Interface for returned data
type ActionProps = NotificationGroupedByDateDTO[];
// Interface for Rejected State (optional, for more granular error handling)
interface RejectWithValueProps {
  error: string;
}

/* reducers */
export const getNotifications = createAsyncThunk<
  ActionProps,
  ValuesProps,
  { rejectValue: RejectWithValueProps }
>("user/getNotifications", async (_, { dispatch, rejectWithValue }) => {
  try {
    // set status of notification as "READ"
    await useAuthAxios.put(`/api/v1/user/notifications/read`);
    // should return list of notifications
    const response = await useAuthAxios.get(`/api/v1/user/notifications`);
    dispatch(getLatestNotifications());
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.errors[0]);
  }
});

type NotificationListProps = ActionProps | null;

// Interface for state
interface StateProps {
  notificationList: NotificationListProps;
  isLoading: boolean;
  error: any;
}

const initialState = {
  notificationList: null,
  isLoading: false,
  error: null,
} satisfies StateProps as StateProps;

/* slice */
export const getNotificationsSlice = createSlice({
  name: "getNotifications",
  initialState,
  reducers: {
    reset: (state) => {
      state.notificationList = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notificationList = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(getNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = getNotificationsSlice.actions;
export default getNotificationsSlice.reducer;
