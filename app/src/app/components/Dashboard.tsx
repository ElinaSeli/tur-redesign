import { Link } from "react-router";
import { Calendar, Award, AlertCircle } from "lucide-react";

export function Dashboard() {
  const upcomingDeadlines = [
    {
      id: "hw-5-bi-pa2",
      courseId: "bi-pa2",
      courseName: "BI-PA2",
      taskName: "Homework 5: Binary Trees",
      deadline: new Date("2026-04-15T23:59:59"),
      points: "15 pts",
      status: "critical" as const,
    },
    {
      id: "test-3-bi-ag1",
      courseId: "bi-ag1",
      courseName: "BI-AG1",
      taskName: "Knowledge Test 3",
      deadline: new Date("2026-04-17T14:00:00"),
      points: "20 pts",
      status: "warning" as const,
    },
    {
      id: "hw-4-bi-ps1",
      courseId: "bi-ps1",
      courseName: "BI-PS1",
      taskName: "Homework 4: Statistical Analysis",
      deadline: new Date("2026-04-21T23:59:59"),
      points: "12 pts",
      status: "normal" as const,
    },
  ];

  const getDeadlineText = (deadline: Date) => {
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) {
      if (diffHours <= 0) return "Due now";
      return `${diffHours}h left`;
    }
    if (diffDays === 1) return "Due tomorrow";
    if (diffDays < 7) return `${diffDays} days left`;
    return `${diffDays} days left`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const recentActivity = [
    {
      id: "1",
      course: "BI-PA2",
      task: "Homework 4: Linked Lists",
      action: "Submitted and passed all tests",
      score: "14/15 pts",
      time: "2 hours ago",
    },
    {
      id: "2",
      course: "BI-AG1",
      task: "Knowledge Test 2",
      action: "Completed",
      score: "18/20 pts",
      time: "1 day ago",
    },
    {
      id: "3",
      course: "BI-PS1",
      task: "Homework 3",
      action: "Submitted",
      score: "11/12 pts",
      time: "3 days ago",
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Anna Nováková",
      points: 342,
      avatar: "AN",
    },
    {
      rank: 2,
      name: "Petr Svoboda",
      points: 328,
      avatar: "PS",
    },
    {
      rank: 3,
      name: "Marie Dvořáková",
      points: 315,
      avatar: "MD",
    },
    {
      rank: 4,
      name: "John Doe",
      points: 287,
      isCurrentUser: true,
      avatar: "JD",
    },
    {
      rank: 5,
      name: "Tomáš Procházka",
      points: 276,
      avatar: "TP",
    },
    {
      rank: 6,
      name: "Jana Černá",
      points: 264,
      avatar: "JČ",
    },
    {
      rank: 7,
      name: "Jakub Veselý",
      points: 251,
      avatar: "JV",
    },
    {
      rank: 8,
      name: "Lucie Málková",
      points: 243,
      avatar: "LM",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Spring Semester 2026</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Active Courses */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Active Courses</div>
          <div className="text-3xl mb-4">3</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>BI-PA2</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>BI-AG1</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>BI-PS1</span>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Pending Tasks</div>
          <div className="text-3xl mb-4">{upcomingDeadlines.length}</div>
          <div className="flex items-center gap-2 text-sm text-warning">
            <AlertCircle className="w-4 h-4" />
            <span>{upcomingDeadlines.filter(d => d.status === "critical").length} urgent</span>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl">Upcoming Deadlines</h2>
        </div>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="divide-y divide-border">
            {upcomingDeadlines.map((item) => (
              <Link
                key={item.id}
                to={`/task/${item.id}`}
                className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs text-muted-foreground font-mono">
                      {item.courseName}
                    </span>
                    <span className="text-muted-foreground">/</span>
                    <span>{item.taskName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{item.deadline.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}</span>
                    <span>{item.points}</span>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-md border text-sm ${getStatusColor(
                    item.status
                  )}`}
                >
                  {getDeadlineText(item.deadline)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leaderboard */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl">Leaderboard</h2>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="divide-y divide-border">
              {leaderboard.map((student) => (
                <div
                  key={student.rank}
                  className={`flex items-center gap-4 p-4 ${
                    student.isCurrentUser ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="w-8 text-center">
                    {student.rank <= 3 ? (
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          student.rank === 1
                            ? "bg-warning text-warning-foreground"
                            : student.rank === 2
                            ? "bg-muted-foreground/30"
                            : "bg-warning/30"
                        }`}
                      >
                        {student.rank}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">{student.rank}</span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                    {student.avatar}
                  </div>
                  <div className="flex-1">
                    <div className={student.isCurrentUser ? "font-medium" : ""}>
                      {student.name}
                      {student.isCurrentUser && (
                        <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono">{student.points}</span>
                    <span className="text-muted-foreground ml-1">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl mb-4">Recent Activity</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="divide-y divide-border">
              {recentActivity.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-muted-foreground font-mono">
                          {item.course}
                        </span>
                        <span className="text-muted-foreground">/</span>
                        <span>{item.task}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.action}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm mb-1">{item.score}</div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
