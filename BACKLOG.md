# 30-day delivery plan
## Daily operating loop
Review the previous implementation and Git diff, inspect the backlog, and debug open defects first. Add or update tests for changed task behavior, deliver today's scoped feature, run tests/typecheck/build, update documentation and this backlog, then leave tomorrow ready. Record blocked checks with reasons; continue useful code review and static checks. Add newly discovered work with priority and rationale.

## Foundation status
Day 00 board foundation includes task search, creation, drag movement and theme toggle. Dependencies and lockfile are installed; smoke test (1/1), typecheck and production build passed. This Vite template has no standalone lint script. The local Nexus .npmrc is ignored.

## Daily tickets
### Day 00 verification
Nexus returned 404 for packages used by this project. Following the user's approval, dependencies were installed with npmjs fallback; the ignored local .npmrc keeps Nexus as default and contains only required scope overrides. Day 01 has not started.

| Day | Deliverable |
|---|---|
| 01 | **Done** — specify task/project/label models, validated date-only due dates, and one-step stage-transition rules; apply rules to board drops. |
| 02 | **Done** — adjacent-stage buttons, focused task detail and rejected-drop feedback; PR #4 merged through the GitHub panel. |
| 03 | **Done** — validated task editor for title, current owner, date-only due date and priority; column quick-add keeps its chosen stage. PR #5 was reviewed and merged to `main`; see the Day 04 reconciliation and workspace receipt. |
| 04 | **Done** — add an accessible project switcher, project-scoped board/counts, preserved task-stage state across switches, and create tasks in the selected project. |
| 05 | Add filter chips for owner, due date, priority and tag. |
| 06 | Add sortable board and saved filter views. |
| 07 | Review week-one board interactions, add tests and fix keyboard/drag defects. |
| 08 | Add local persistence with migration-safe storage adapter. |
| 09 | Add activity history for creation, editing and stage changes. |
| 10 | Add due-date calendar with overdue and upcoming views. |
| 11 | Add timeline view that groups work by project milestone. |
| 12 | Add team member profile and workload summaries. |
| 13 | Add task comments and mention presentation. |
| 14 | Review state, history and navigation flows; add regression tests. |
| 15 | Add file attachment metadata and graceful upload limits. |
| 16 | Add project templates for launch, editorial and product delivery. |
| 17 | Add CSV and XLSX exports for board and workload views. |
| 18 | Add print-friendly PDF board report with project metadata. |
| 19 | Refine mobile board navigation and horizontal stage movement. |
| 20 | Audit theme contrast, focus order and reduced-motion behavior. |
| 21 | Run screen-reader and keyboard review; resolve priority findings. |
| 22 | Add PWA installation guidance and offline read-only board state. |
| 23 | Add notification preferences and in-app due-date reminders. |
| 24 | Add global search across projects, tasks and people. |
| 25 | Add board permissions and clear guest/member roles. |
| 26 | Add archive/restore flows and safe deletion confirmation. |
| 27 | Add backup/import format and validate malformed files. |
| 28 | Run cross-device regression review and address defects. |
| 29 | Complete onboarding, privacy, keyboard and export documentation. |
| 30 | Release-candidate review, all checks, release notes and known limits. |

Mark each day Done, In progress or Blocked after work. Update new findings and keep tomorrow's ticket ready.

- Day 01: Done. Sample tasks now use typed project/label references and stage transitions reject skipped steps.
- Day 02: Done. PR #4 was reviewed at `2eb07742b61b520c73b416f0c16ded98b03462f4` and merged to `main` with merge commit `44ba555aab350beb30dd1003e84ede025f7bcc84`; the former keyboard and invalid-drop carry-over is delivered.
- Day 03: Done. The required title, owner initials, date-only due date and priority are validated before a task is created. Stage-specific column quick-add is preserved. PR #5 merged after the earlier browser warning was resolved; its merge receipt is reconciled in the Day 04 log.
- Day 04: Done. The native project selector scopes task cards and column counts, leaves each task's stage in shared session state, and determines the new-task destination. At All projects, creation defaults to Atelier / New work.
- Next: Day 05 — add filter chips for owner, due date, priority and tag.

## Process change effective Day 02 — 2026-10-27

Apply [DELIVERY-POLICY.md](DELIVERY-POLICY.md) to every remaining ticket: finish Atelier Project Desk before the next repository, use meaningful scope-driven commits and deliver through its own reviewed PR. A blocked external gate needs a concrete record and next action. This adds delivery gates without moving Day 02–30 product work or changing completed history.

## Contribution integration — 2026-10-27

Effective Day 02: apply [CONTRIBUTING.md](CONTRIBUTING.md) inside existing tickets. At already scheduled weekly reviews, assess real feedback such as a keyboard-only task-move reproduction with preserved fields and focus notes; at documentation/setup tickets, improve a small board walkthrough showing valid and invalid transitions. Day 30 records actual contribution evidence and outstanding external dependencies. No day is renumbered and no quota or badge is a completion criterion. Next scope remains: Day 02 — keyboard-accessible move controls and focused task detail.
