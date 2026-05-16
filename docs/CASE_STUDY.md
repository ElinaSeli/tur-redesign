# Semester Project BI-TUR: Redesign of the ProgTest System

## Comprehensive Report on Research, Design, and User Evaluation (UCD)

**Team:** Elina Selivanova, Yelyzaveta Borysova, Yaroslava Panchenko\
**Semester:** Summer Semester 2025/2026 (FIT CTU)

## Division of Labor in the Team

| Team Member | Area of Responsibility |
|---|---|
| **Elina Selivanova** | Collection and analysis of questionnaire results; design and implementation of the final functional prototype in React (redesign of four key screens: Dashboard, Course Page, Task Page, Test Output); moderation of the Pluralistic Walkthrough. |
| **Yaroslava Panchenko** | Creation and distribution of the quantitative questionnaire (108 respondents); definition of three user personas (Eliška, Pepa, Zdeněk); specification of user and stakeholder goals; analysis of the teacher interface; conducting user interviews. |
| **Yelyzaveta Borysova** | Domain analysis and compilation of a glossary of 13 key terms; comparative analysis with competitors (LeetCode, CodeWars); analysis of the teacher interface; definition of three crisis scenarios (Walkthroughs of the old system); organization and preparation of Pluralistic Walkthrough scenarios with 5 students. |

# Table of Contents
1. [Introduction and Project Methodology](#1-introduction-and-project-methodology)
2. [Domain Analysis and Semantic Unification](#2-domain-analysis-and-semantic-unification)
   - [2.1 Glossary of 13 Key Terms](#21-glossary-of-13-key-terms)
   - [2.2 Extended Domain Specification](#22-extended-domain-specification)
   - [2.3 Stakeholders](#23-stakeholders)
   - [2.4 Comparative Analysis with Modern Competitors](#24-comparative-analysis-with-modern-competitors-leetcode-codewars)
3. [User Research, Context, Problem Identification, and Mental Models](#3-user-research-context-problem-identification-and-mental-models)
   - [3.1 Demographic Data and Context of Use](#31-demographic-data-and-context-of-use)
   - [3.2 Mental Model and Emergency Procedures](#32-mental-model-and-emergency-procedures)
   - [3.3 Information Needs of Students](#33-information-needs-of-students)
   - [3.4 Identification of Main Problems](#34-identification-of-main-problems)
   - [3.5 User Personas](#35-user-personas)
4. [Task Analysis and Crisis Scenarios (Walkthroughs of the Old System)](#4-task-analysis-and-crisis-scenarios-walkthroughs-of-the-old-system)
5. [Analysis of the Teacher Interface](#5-analysis-of-the-teacher-interface)
6. [Comparison of the Current State and the Final Prototype](#6-comparison-of-the-current-state-and-the-final-prototype)
7. [User Evaluation of the Final Design: Pluralistic Walkthrough](#7-user-evaluation-of-the-final-design-pluralistic-walkthrough)
8. [Conclusion](#8-conclusion)

---

## 1. Introduction and Project Methodology

This project focuses on the redesign of the academic evaluation platform **ProgTest** (FIT CTU). We proceeded strictly according to the **User-Centered Design (UCD)** methodology with the goal of optimizing the interface based on real user needs and their work environment.

When designing for a system with thousands of active users, we deliberately ruled out a complete visual rewrite into modern trends. A radical change would bring high development costs, the risk of incompatibility, and would disrupt the established mental models of users. Therefore, we chose a strategy of **evolutionary redesign**:

- **Preservation of Visual Identity:** The tabular layout and standard typography were retained to respect users' habits.
- **Surgical UX Fixes:** Targeted repair of cognitive barriers that cause errors and disorientation in crisis situations.

This approach dramatically increases the usability and safety of the system with minimal implementation costs.

---

## 2. Domain Analysis and Semantic Unification

To prevent confusion and ensure semantic integrity and agreement between the system's language and users' expectations (Nielsen's heuristic of matching the system with the real world), we performed a domain analysis, compiled a glossary of terms, described stakeholders, and compared the existing system with modern competitors.

### 2.1 Glossary of 13 Key Terms

This glossary serves as a critical basis for the **information architecture** of the entire project and unifies the system language with the mental model of both students and teachers:

| Term | Exact Definition in the System |
|---|---|
| **1. Submission Deadline** | The time limit by which the completed task must be uploaded to the system. |
| **2. Evaluation** | The resulting score for a task, composed of base points, bonuses, and potential penalties. |
| **3. Task** | A specific study assignment within a course requiring the development and submission of a solution. |
| **4. Reference Solution** | A model, optimal solution to a programming task written by instructors to check efficiency. |
| **5. Hint** | Access to detailed information about errors in tests (can be free or penalized). |
| **6. Tests** | Automated sets of input data verifying the functionality, stability, and efficiency of the submitted code. |
| **7. Submission** | Uploading the completed source file to the system and triggering its automatic evaluation. |
| **8. Semester** | A time period of teaching (e.g., winter/summer semester of a specific academic year). |
| **9. Course** | An organizational unit of teaching (e.g., BI-PA2), which is part of a specific semester. |
| **10. Starter Pack** | Originally confusingly named "Sample Data". A template of source code and local tests to start work. |
| **11. SW Metrics** | Static analysis of complexity, number of lines, and cyclomatic complexity of the submitted code. |
| **12. Compiler** | A remote compiler on the server checking the syntactic correctness of the sent code. |
| **13. Results Table** | A complete overview of points obtained by a student for all assignments within a course. |

### 2.2 Extended Domain Specification

For a deeper understanding of the system's internal logic, we described subcategories of key entities:

- **Types of Deadlines:**
  - *Early Submission:* A time limit in which the student receives bonus points for speed.
  - *Regular Deadline:* The standard time limit for obtaining full base points.
  - *Late Submission:* Submission after the regular deadline, usually associated with a 100% penalty (0 points).
- **Types of Tasks:**
  - *Programming Task:* Requires writing and sending source code, which is compiled and tested.
  - *Knowledge Test:* Verification of theoretical knowledge in the form of a quiz.
- **Categories of Tests:**
  - *Basic:* Public tests on sample inputs from the assignment.
  - *Hidden:* Secret inputs checking the robustness of the program (Boundary values, Incorrect inputs, Random inputs).
  - *Bonus:* Optional tests (e.g., speed test).
- **Evaluation Composition:** Consists of *base points*, *bonus points*, and *penalties*.
- **Types of Hints:** *Free* hint (limited number of free attempts) and *penalized* hint (deduction of a percentage from the evaluation).

### 2.3 Stakeholders

The system serves two main groups with different, often conflicting goals:

| Role | Who is it? | Main Goal in the System |
|---|---|---|
| **Student** | A user enrolled in a course, solving and submitting tasks. | Fast and error-free code submission, easy debugging, and gaining points. |
| **Teacher** | An instructor or assistant who assigns tasks, performs code reviews, and grades students. | Easy assignment, recording grades, and an overview of class success. |

### 2.4 Comparative Analysis with Modern Competitors (LeetCode, CodeWars)

We conducted a competitive analysis to compare the features of the old ProgTest with modern standards:

| Element | ProgTest (Current State) | Modern Standard (LeetCode) | Benefit of the New Solution |
|---|---|---|---|
| **Visual Design** | Dated gray UI, only light mode, no responsive design. | Modern, clean interface, Dark Mode support, polished mobile version. | Higher comfort for tired eyes during night work, ability to check status from mobile. |
| **Error Display** | Raw, unformatted text output of tests on the server. | Interactive comparison of outputs with highlighted differences. | Immediate identification of the exact line and character where the program failed. |
| **Code Work** | Only uploading local files, absence of any editor. | Integrated web development environment directly in the browser. | Ability to make minor corrections to syntax errors without running a local IDE. |
| **Navigation** | Confusing and non-transparent. | Persistent side panel and clearly structured navigation menu. | Faster orientation between courses and tasks, less risk of getting lost. |

---

## 3. User Research, Context, Problem Identification, and Mental Models

User research was carried out in the form of a quantitative questionnaire survey and subsequent analysis of the psychological aspects of students' work in the system.

### 3.1 Demographic Data and Context of Use

**108 respondents** participated in the survey:
- **Sample Composition:** **50%** freshmen, **31%** intermediate, **19%** experienced students.
- **Usage Patterns:** **57%** use the system several times a week, **30%** once a week.
- **Workflows:** Students switch constantly between the browser, local IDE (CLion, VS Code), terminal, and study materials. ProgTest acts as the endpoint for validation.
- **Environment:** Mostly home (92%) with night work, some in labs (8%) with high stress before the end of class.

### 3.2 Mental Model and Emergency Procedures

- **Mental Model:** Students often perceive ProgTest as a "strict, uncompromising robot-judge" rather than a partner tool, which increases stress levels.
- **Emergency Procedures:** If the system fails or has long response times close to the deadline (e.g., Sunday at 23:50), students activate unofficial channels (MS Teams, Discord, emailing code to teachers).

### 3.3 Information Needs of Students

Users need fast access to:
- Interface of required functions and assignment restrictions.
- Examples of inputs and outputs.
- Exact time of the regular deadline.
- Clear status information on the result of the last attempt.

### 3.4 Identification of Main Problems

**UI:**
- **Absence of hierarchy and typography:** Texts are cramped; small line spacing causes reading difficulties.
- **Scale problems:** Miniaturized interface on modern monitors; students use 130-150% zoom.
- **"Depressive" palette:** Gray, gloomy colors and lack of dark mode.
- **Poor sorting:** Tasks and semesters are not always logically sorted.

**UX:**
- **Mixing content:** Current semesters mix with past ones.
- **Knowledge tests:** Manual saving of each question leads to data loss on connection drop.
- **Absurd timer:** Displaying time in seconds for deadlines a week away is stressful.
- **Unresponsive buttons:** Lack of confirmation dialog; accidental double submissions.
- **Nomenclature:** "Sample Data" is confusing as it contains code skeletons.
- **Cold communication:** Feels like a machine with no emotion (unlike other systems like MARAST).
- **Vague feedback:** Doesn't distinguish between a slow program and an infinite loop.

### 3.5 User Personas

We created 3 personas:
1. **Freshman Eliška:** Starts with programming, gets lost in text, stressed by technical errors. Needs humanized feedback and mobile support.
2. **Regular Programmer Pepa:** 3rd year, uses plugins to fix UI, works at night. Needs Dark Mode, human-readable timers, and fast navigation.
3. **Teacher Zdeněk:** Manages exercises, grades students. Needs summarized tables, better navigation in history, and less information overload.

---

## 4. Task Analysis and Crisis Scenarios (Walkthroughs of the Old System)

We analyzed three key tasks and their cognitive failures in the original interface:

### 📌 Task 1: First Encounter with the Interface and Submission
- **Goal:** Read assignment, check deadline, submit task.
- **Persona:** Freshman Eliška.
- **Old System Obstacles:** No responsive design (horizontal scrolling on mobile), manual saving in tests, cold feedback.

### 📌 Task 2: Night Debugging and Race Against Time
- **Goal:** Locate error, use hint, fix solution.
- **Persona:** Regular Programmer Pepa.
- **Old System Obstacles:** No Dark Mode, timer in seconds, "Wall of Text" error logs, page jumps to top on refresh.

### 📌 Task 3: Navigation Between Courses and Finding Reference Codes
- **Goal:** Switch between courses or find old code in archive.
- **Persona:** Regular Programmer Pepa.
- **Old System Obstacles:** No persistent navigation, must return to homepage, archive looks identical to active semester.

---

## 5. Analysis of the Teacher Interface

We identified four main ergonomic deficiencies in the teacher interface:
1. **Loss of local awareness:** Title area is unused; teacher doesn't see which group they are viewing.
2. **Horizontal information overload:** Tables are too wide, requiring horizontal scrolling.
3. **Dropdown interaction barrier for grades:** Grades are hidden behind specific date terms in dropdowns.
4. **Cognitive noise in side menu:** Flat list of 16 items without grouping.

*(Note: Due to lack of access to the backend, the prototype focuses exclusively on the student part).*

---

## 6. Comparison of the Current State and the Final Prototype

The final functional prototype was programmed in React.

| Interface Area | Original State (Visual Chaos and Cognitive Barriers) | New Solution (Clear Hierarchy and Safety) |
|---|---|---|
| **Main Page (Dashboard)** | Merging of years. Long gray list requires searching and burdens memory. | Active semester isolated at the top in a green box. Old years collapsed in `<details>`. Reduction of choices according to **Hick's Law**. |
| **Course Page** | All information (tasks, polls, results) on one confusing page. | Introduction of tabs (*Card Tabs*) with clear boundaries. Leaderboard moved to a separate tab to prevent distraction. |
| **Task Page** | Download and submit buttons tightly adjacent. Immediate irreversible action on submission. | Two-column layout (separation of Starter Pack download from submission). Introduced a confirmation modal (**error prevention**). |
| **Test Output** | Monochrome black-and-white "Wall of Text". Requires linear reading line by line. | Collapsible test blocks. Successful sets (green) are collapsed. Unsuccessful ones (red) expand automatically. Fast **visual scanning**. |

---

## 7. User Evaluation of the Final Design: Pluralistic Walkthrough

We chose the **Pluralistic Walkthrough** method to verify usability.

### 7.1 Methodology and Group Composition
- **Group:** 2 Freshmen, 1 Sophomore, 2 Seniors, 3 Developers (authors), 1 Moderator.
- **Process:** Moderator presented scenarios; participants wrote down intended actions silently first, then discussed.

### 7.2 Results: Solving Problem Paths of the Old Solution

1. **Submission Path (Scenario 1):**
   - *Old:* Accidental double submissions, no confirmation.
   - *New:* Modal shows file name being uploaded. Async submission prevents page jumping. Stres levels dropped.
2. **Debugging Path (Scenario 2):**
   - *Old:* Searching through "Wall of Text".
   - *New:* Red `[ FAIL ]` blocks identified immediately. Green blocks collapsed. Hints loaded async without losing scroll position.
3. **Archive Path (Scenario 3):**
   - *Old:* Archive looks identical to active semester.
   - *New:* Contrast yellow bar `⚠️ Archive View` added. A "Back to Active Course" button allows instant return.

### 7.3 Evaluation Summary
All 5 representatives agreed the new design brings huge relief. Freshmen praised cognitive safety, the sophomore praised log clarity, and seniors confirmed it respects their fast work pace.

---

## 8. Conclusion

The project practically verified that **a successful UX redesign of a complex system does not have to mean a complete rewrite or a radical change in visual style**. Our approach in React fully preserved ProgTest's visual identity, respecting long-standing habits and mental models.

By conducting a **Pluralistic Walkthrough**, we proved that merely changing the arrangement of elements based on HCI laws, semantic unification, and cognitive soft-barriers can eliminate fatal errors and reduce stress. This evolutionary approach is highly effective with minimal development costs.
