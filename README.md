# ProgTest Redesign — UCD Case Study & React Prototype

A comprehensive redesign of the **ProgTest** academic evaluation platform used at FIT CTU (Czech Technical University in Prague). This project follows the **User-Centered Design (UCD)** methodology to solve real usability issues and delivers a functional prototype built in React.

> [!NOTE]
> This project was created as a semester project for the course BI-TUR (Creation of User Interfaces) at FIT CTU.
> The detailed Case Study and documentation are in **Czech**, as required by the course.

## 🎯 Project Overview

ProgTest is a powerful but notoriously dated system used by thousands of students for automatic code evaluation. This project aimed to perform an **evolutionary redesign**—preserving the core visual identity to respect users' mental models while surgically fixing critical cognitive barriers and UX flaws.

### Key Achievements:
- **User Research:** Analyzed data from **108 respondents** to identify pain points.
- **Methodology:** Applied HCI principles (Hick's Law, Fitts's Law, Gestalt principles).
- **Implementation:** Developed a functional prototype in **React** covering 4 key screens.
- **Evaluation:** Validated the design via a **Pluralistic Walkthrough** with 5 users, proving a significant reduction in stress and error rates.

---

## 👩‍💻 My Role & Contributions

In this team project, I was responsible for:
- **Lead Frontend Developer:** Designed and implemented the final functional prototype in **React** (Dashboard, Course Page, Task Page, and Test Output).
- **Researcher:** Analyzed and synthesized the results of the quantitative questionnaire (108 respondents).
- **Moderator:** Led the Pluralistic Walkthrough usability testing session with students.

---

## 📂 Repository Structure

```text
progtest-redesign/
├── app/                  # Functional React prototype (Vite, TypeScript, shadcn/ui)
│   ├── src/              # Application source code
│   └── package.json      # Dependencies and scripts
└── docs/
    └── CASE_STUDY.md     # Full detailed project report
    └── presentation.pdf  # Final presentation (in Czech)
```

---

## 🚀 How to Run the Prototype

To run the functional prototype locally, follow these steps:

1. Navigate to the app directory:
   ```bash
   cd app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the address shown in the terminal (usually `http://localhost:5173`).

---

## 📄 Case Study Summary (TL;DR)

For a deep dive into the research, personas, and design decisions, please read the full [CASE_STUDY.md](docs/CASE_STUDY.md).

Here are the main problems we solved:
- **Task Submission Stress:** Added a confirmation modal and visual feedback to prevent accidental duplicate submissions.
- **The "Wall of Text" in Logs:** Redesigned test outputs with collapsible blocks (green for success, red for fail) to allow quick visual scanning.
- **Navigation & Context Loss:** Added a yellow "Archive" banner and a "Back to Active Course" button to prevent students from accidentally submitting to previous years.

---

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Methodology:** User-Centered Design (UCD), Pluralistic Walkthrough
