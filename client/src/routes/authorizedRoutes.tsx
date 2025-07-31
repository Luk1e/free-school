import { lazyLayouts } from "../layouts";
import { lazyPages } from "../pages";

import RouterProps from "./RouterProps";

// Export Public router
export default function AuthorizedRoutes({ user, loading }: RouterProps) {
  const { AuthorizedLayout } = lazyLayouts;

  return {
    path: "/",
    element: <AuthorizedLayout user={user} loading={loading} />,
    children: [
      // Classrooms
      {
        path: "classroom",
        element: <lazyPages.ClassroomsPage />,
      },

      // Classroom
      {
        path: "classroom/:id",
        element: <lazyPages.ClassroomPage />,
      },

      // Classroom students
      {
        path: "classroom/:id/students",
        element: <lazyPages.StudentsPage />,
      },

      // Create homework
      {
        path: "classroom/:id/homeworks/create",
        element: <lazyPages.CreateHomeworkPage />,
      },

      // Update homework
      {
        path: "classroom/:id/homeworks/:homeworkId/update",
        element: <lazyPages.UpdateHomeworkPage />,
      },

      // Students' homeworks
      {
        path: "classroom/:id/homeworks/:homeworkId",
        element: <lazyPages.StudentHomeworksPage />,
      },

      // Homework
      {
        path: "classroom/:id/homework/:homeworkId",
        element: <lazyPages.HomeworkPage />,
      },

      // Notifications
      {
        path: "/notifications",
        element: <lazyPages.NotificationPage />,
      },
    ],
  };
}
