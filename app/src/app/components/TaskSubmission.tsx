import { useParams } from "react-router";
import { useState } from "react";
import {
  Download,
  Upload,
  Calendar,
  Award,
  CheckCircle2,
  XCircle,
  ChevronDown,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";

export function TaskSubmission() {
  const { taskId } = useParams();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const taskData: Record<string, any> = {
    "hw-2-1": {
      course: "BI-PA2",
      title: "Linked Lists Implementation",
      description:
        "Implement a doubly-linked list data structure with insertion, deletion, and search operations. Your implementation should handle edge cases and manage memory correctly.",
      deadline: new Date("2026-04-07T23:59:59"),
      maxScore: 15,
      score: 14,
      submissionTime: new Date("2026-04-06T18:32:15"),
      status: "completed",
      testResults: [
        {
          id: "test-1",
          name: "Basic Operations",
          status: "passed",
          points: 3,
          maxPoints: 3,
          details: "All basic insertion and deletion operations working correctly.",
        },
        {
          id: "test-2",
          name: "Edge Cases",
          status: "passed",
          points: 3,
          maxPoints: 3,
          details: "Empty list, single element, and boundary conditions handled.",
        },
        {
          id: "test-3",
          name: "Memory Management",
          status: "passed",
          points: 4,
          maxPoints: 4,
          details: "No memory leaks detected. Proper cleanup on destruction.",
        },
        {
          id: "test-4",
          name: "Performance",
          status: "failed",
          points: 1,
          maxPoints: 2,
          details:
            "Search operation exceeded time limit on large datasets. Expected O(n), got O(n²).",
          error:
            "Test case 'large_dataset_search' took 2.3s, expected < 1.0s\nInput size: 100,000 elements\nSuggestion: Check for nested loops in search function",
        },
        {
          id: "test-5",
          name: "Advanced Operations",
          status: "passed",
          points: 3,
          maxPoints: 3,
          details: "Reverse, merge, and split operations implemented correctly.",
        },
      ],
    },
    "hw-2-2": {
      course: "BI-PA2",
      title: "Binary Trees",
      description:
        "Implement a binary search tree with insertion, deletion, search, and traversal operations. Include balancing mechanisms to maintain optimal performance.",
      deadline: new Date("2026-04-15T23:59:59"),
      maxScore: 15,
      score: 0,
      status: "pending",
      testResults: [],
    },
  };

  const task = taskData[taskId || ""] || taskData["hw-2-1"];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    setShowConfirmModal(false);
    console.log("Submitting file:", selectedFile);
  };

  const getDeadlineText = () => {
    const now = new Date();
    const diffMs = task.deadline.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays < 0) return { text: "Overdue", color: "text-destructive" };
    if (diffDays === 0) return { text: `${diffHours}h left`, color: "text-destructive" };
    if (diffDays <= 3) return { text: `${diffDays} days left`, color: "text-destructive" };
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: "text-warning" };
    return { text: `${diffDays} days left`, color: "text-muted-foreground" };
  };

  const deadlineInfo = getDeadlineText();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm text-muted-foreground mb-2">{task.course}</div>
        <h1 className="text-3xl mb-4">{task.title}</h1>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Due:</span>
            <span>
              {task.deadline.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className={deadlineInfo.color}>({deadlineInfo.text})</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Points:</span>
            <span>
              {task.score} / {task.maxScore}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg mb-3">Description</h2>
        <p className="text-muted-foreground leading-relaxed">{task.description}</p>
      </div>

      {/* File Submission Section */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg mb-4">Submit Solution</h2>

        <div className="flex items-center gap-4 mb-4">
          <label className="flex-1">
            <input
              type="file"
              accept=".cpp,.c,.h,.zip"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
              {selectedFile ? (
                <div>
                  <div className="text-sm mb-1">{selectedFile.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Click to select a file or drag and drop
                </div>
              )}
            </div>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            <span>Download Files</span>
          </button>

          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={!selectedFile}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Solution</span>
          </button>
        </div>

        {task.submissionTime && (
          <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
            Last submitted:{" "}
            {task.submissionTime.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>

      {/* Test Results */}
      {task.testResults.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg mb-4">Test Results</h2>

          <Accordion.Root type="multiple" className="space-y-2">
            {task.testResults.map((test: any) => (
              <Accordion.Item
                key={test.id}
                value={test.id}
                className={`border rounded-lg overflow-hidden ${
                  test.status === "passed"
                    ? "border-success/30"
                    : "border-destructive/30"
                }`}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      {test.status === "passed" ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      <span>{test.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {test.points} / {test.maxPoints} pts
                      </span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="p-4 pt-0 space-y-3">
                    <div className="text-sm text-muted-foreground">{test.details}</div>
                    {test.error && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                        <pre className="text-xs text-destructive font-mono whitespace-pre-wrap">
                          {test.error}
                        </pre>
                      </div>
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {task.testResults.filter((t: any) => t.status === "passed").length} /{" "}
                {task.testResults.length} tests passed
              </div>
              <div className="text-xl">
                Total Score: {task.score} / {task.maxScore}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Dialog.Root open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <Dialog.Title className="text-xl mb-3">Confirm Submission</Dialog.Title>
            <Dialog.Description className="text-muted-foreground mb-6">
              Are you sure you want to submit your solution? This will replace your previous
              submission and be evaluated immediately.
            </Dialog.Description>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Confirm
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
