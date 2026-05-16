import { Outlet, Link, useLocation } from "react-router";
import {
  BookOpen,
  Settings,
  Code2,
  HelpCircle,
  User,
  LogOut,
  ChevronDown,
  Home
} from "lucide-react";
import { useState } from "react";

export function RootLayout() {
  const location = useLocation();
  const [showArchived, setShowArchived] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isCourseActive = (courseId: string) => location.pathname.includes(`/course/${courseId}`);

  const currentSemesterCourses = [
    { id: "bi-pa2", name: "BI-PA2", fullName: "Programming and Algorithmics 2" },
    { id: "bi-ag1", name: "BI-AG1", fullName: "Algorithms and Graphs 1" },
    { id: "bi-ps1", name: "BI-PS1", fullName: "Probability and Statistics 1" },
  ];

  const archivedCourses = [
    { id: "bi-pa1", name: "BI-PA1", fullName: "Programming and Algorithmics 1" },
    { id: "bi-ep1", name: "BI-EP1", fullName: "Electrical Engineering 1" },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
        {/* Logo/Header */}
        <div className="px-6 py-5 border-b border-border">
          <h1 className="text-xl tracking-tight">ProgTest</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Spring 2026</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Dashboard */}
          <div className="px-3 mb-6">
            <Link
              to="/"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Current Semester Courses */}
          <div className="px-3 mb-6">
            <h3 className="px-3 mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              Current Semester
            </h3>
            <div className="space-y-1">
              {currentSemesterCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isCourseActive(course.id)
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <div className="flex-1 min-w-0">
                    <div>{course.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Archived Semesters */}
          <div className="px-3 mb-6">
            <button
              onClick={() => setShowArchived(!showArchived)}
              className="flex items-center gap-2 px-3 py-2 w-full text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showArchived ? "rotate-180" : ""
                }`}
              />
              <span className="text-xs uppercase tracking-wider">Archived Semesters</span>
            </button>
            {showArchived && (
              <div className="space-y-1 mt-2">
                {archivedCourses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>{course.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Tools */}
          <div className="px-3">
            <h3 className="px-3 mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              Tools
            </h3>
            <div className="space-y-1">
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full">
                <Code2 className="w-5 h-5" />
                <span>Compiler</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full">
                <HelpCircle className="w-5 h-5" />
                <span>FAQ</span>
              </button>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors mb-1">
            <User className="w-5 h-5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm">John Doe</div>
              <div className="text-xs text-muted-foreground">john.doe@fit.cvut.cz</div>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
