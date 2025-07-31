import { combineReducers } from "redux";
import { authReducers } from "../toolkit/auth/reducers";
import { classroomReducers } from "../toolkit/classroom/reducers";
import { homeworkReducers } from "../toolkit/homework/reducers";
import { notificationReducers } from "../toolkit/notification/reducers";

const rootReducer = combineReducers({
  ...authReducers,
  ...classroomReducers,
  ...homeworkReducers,
  ...notificationReducers,
});

export default rootReducer;
