import { useParams, Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

export function CourseDetail() {
  const { courseId } = useParams();

  const courseData: Record<string, any> = {
    "bi-pa2": {
      name: "BI-PA2",
      fullName: "Programming and Algorithmics 2",
      instructor: "Ing. Jan Novák, Ph.D.",
      tabs: ["Homework 1", "Homework 2", "Knowledge Tests"],
      tasks: {
        "Homework 1": [
          {
            id: "hw-1-1",
            title: "Dynamic Memory Allocation",
            deadline: new Date("2026-03-10T23:59:59"),
            score: 15,
            maxScore: 15,
            status: "completed",
          },
          {
            id: "hw-1-2",
            title: "String Manipulation",
            deadline: new Date("2026-03-17T23:59:59"),
            score: 14,
            maxScore: 15,
            status: "completed",
          },
          {
            id: "hw-1-3",
            title: "File I/O Operations",
            deadline: new Date("2026-03-24T23:59:59"),
            score: 13,
            maxScore: 15,
            status: "completed",
          },
        ],
        "Homework 2": [
          {
            id: "hw-2-1",
            title: "Linked Lists Implementation",
            deadline: new Date("2026-04-07T23:59:59"),
            score: 14,
            maxScore: 15,
            status: "completed",
          },
          {
            id: "hw-2-2",
            title: "Binary Trees",
            deadline: new Date("2026-04-15T23:59:59"),
            score: 0,
            maxScore: 15,
            status: "pending",
          },
          {
            id: "hw-2-3",
            title: "Hash Tables",
            deadline: new Date("2026-04-28T23:59:59"),
            score: 0,
            maxScore: 15,
            status: "locked",
          },
        ],
        "Knowledge Tests": [
          {
            id: "test-1",
            title: "Pointers and Memory",
            deadline: new Date("2026-03-20T14:00:00"),
            score: 19,
            maxScore: 20,
            status: "completed",
          },
          {
            id: "test-2",
            title: "Data Structures Basics",
            deadline: new Date("2026-04-10T14:00:00"),
            score: 17,
            maxScore: 20,
            status: "completed",
          },
          {
            id: "test-3",
            title: "Advanced Algorithms",
            deadline: new Date("2026-05-08T14:00:00"),
            score: 0,
            maxScore: 20,
            status: "locked",
          },
        ],
      },
    },
    "bi-ag1": {
      name: "BI-AG1",
      fullName: "Algorithms and Graphs 1",
      instructor: "doc. Ing. Marie Svobodová, Ph.D.",
      tabs: ["Homework 1", "Homework 2", "Knowledge Tests"],
      tasks: {
        "Homework 1": [
          {
            id: "hw-ag-1-1",
            title: "Graph Traversal",
            deadline: new Date("2026-03-12T23:59:59"),
            score: 12,
            maxScore: 12,
            status: "completed",
          },
          {
            id: "hw-ag-1-2",
            title: "Shortest Path Algorithms",
            deadline: new Date("2026-03-26T23:59:59"),
            score: 11,
            maxScore: 12,
            status: "completed",
          },
        ],
        "Homework 2": [
          {
            id: "hw-ag-2-1",
            title: "Minimum Spanning Tree",
            deadline: new Date("2026-04-09T23:59:59"),
            score: 10,
            maxScore: 12,
            status: "completed",
          },
          {
            id: "hw-ag-2-2",
            title: "Network Flow",
            deadline: new Date("2026-04-23T23:59:59"),
            score: 0,
            maxScore: 12,
            status: "pending",
          },
        ],
        "Knowledge Tests": [
          {
            id: "test-ag-1",
            title: "Graph Theory Basics",
            deadline: new Date("2026-03-18T14:00:00"),
            score: 16,
            maxScore: 20,
            status: "completed",
          },
          {
            id: "test-ag-2",
            title: "Advanced Graph Algorithms",
            deadline: new Date("2026-04-17T14:00:00"),
            score: 0,
            maxScore: 20,
            status: "pending",
          },
        ],
      },
    },
  };

  const course = courseData[courseId || ""] || courseData["bi-pa2"];

  const getDeadlineText = (deadline: Date) => {
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    if (diffDays < 7) return `${diffDays} days left`;
    return `${diffDays} days left`;
  };

  const getDeadlineColor = (deadline: Date, status: string) => {
    if (status === "completed") return "text-muted-foreground";
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "text-destructive";
    if (diffDays <= 3) return "text-destructive";
    if (diffDays <= 7) return "text-warning";
    return "text-muted-foreground";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Course Header */}
      <div className="mb-8">
        <div className="text-sm text-muted-foreground mb-2">{course.name}</div>
        <h1 className="text-3xl mb-2">{course.fullName}</h1>
        <p className="text-muted-foreground">{course.instructor}</p>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Score</div>
          <div className="text-2xl">
            {Object.values(course.tasks)
              .flat()
              .reduce((sum: number, task: any) => sum + task.score, 0)}
            {" / "}
            {Object.values(course.tasks)
              .flat()
              .reduce((sum: number, task: any) => sum + task.maxScore, 0)}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Completed Tasks</div>
          <div className="text-2xl">
            {
              Object.values(course.tasks)
                .flat()
                .filter((task: any) => task.status === "completed").length
            }
            {" / "}
            {Object.values(course.tasks).flat().length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Pending Tasks</div>
          <div className="text-2xl">
            {
              Object.values(course.tasks)
                .flat()
                .filter((task: any) => task.status === "pending").length
            }
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={course.tabs[0]} className="w-full">
        <TabsList className="flex gap-2 border-b border-border mb-6">
          {course.tabs.map((tab: string) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="px-4 py-2 text-sm border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-colors hover:text-foreground"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {course.tabs.map((tab: string) => (
          <TabsContent key={tab} value={tab}>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 border-b border-border text-sm text-muted-foreground">
                <div className="col-span-1">Status</div>
                <div className="col-span-5">Task</div>
                <div className="col-span-3">Deadline</div>
                <div className="col-span-3 text-right">Score</div>
              </div>

              {/* Task Rows */}
              <div className="divide-y divide-border">
                {course.tasks[tab].map((task: any) => (
                  <Link
                    key={task.id}
                    to={task.status === "locked" ? "#" : `/task/${task.id}`}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 transition-colors ${
                      task.status === "locked"
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={(e) => task.status === "locked" && e.preventDefault()}
                  >
                    <div className="col-span-1 flex items-center">
                      {getStatusIcon(task.status)}
                    </div>
                    <div className="col-span-5 flex items-center">
                      <span>{task.title}</span>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span
                        className={`text-sm ${getDeadlineColor(
                          task.deadline,
                          task.status
                        )}`}
                      >
                        {task.deadline.toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {task.status !== "completed" && task.status !== "locked" && (
                          <span className="ml-2">({getDeadlineText(task.deadline)})</span>
                        )}
                      </span>
                    </div>
                    <div className="col-span-3 flex items-center justify-end">
                      <span className={task.score === task.maxScore ? "text-success" : ""}>
                        {task.score} / {task.maxScore}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
