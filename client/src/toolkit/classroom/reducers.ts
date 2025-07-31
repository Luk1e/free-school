import createClassroomSlice from "./createSlice";
import enrollClassroomSlice from "./enrollSlice";
import getClassroomsSlice from "./getAllSlice";
import deleteClassroomSlice from "./deleteSlice";
import studentSlice from "./studentSlice";

export const classroomReducers = {
  createClassroom: createClassroomSlice,
  enrollClassroom: enrollClassroomSlice,
  getClassrooms: getClassroomsSlice,
  deleteClassroom: deleteClassroomSlice,

  students: studentSlice,
};
