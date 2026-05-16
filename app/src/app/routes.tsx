import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./components/Dashboard";
import { CourseDetail } from "./components/CourseDetail";
import { TaskSubmission } from "./components/TaskSubmission";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "course/:courseId", Component: CourseDetail },
      { path: "task/:taskId", Component: TaskSubmission },
    ],
  },
]);
