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
| 01 | Specify task/project/label models and stage-transition rules. |
| 02 | Add keyboard-accessible move controls and focused task detail. |
| 03 | Add task editor with owner, due date, priority and validation. |
| 04 | Add project switcher and project-specific board state. |
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
