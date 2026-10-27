# Daily work log

## Day 00 — foundation (2026-10-26, Asia/Tehran)

- Prepared the project-specific React/TypeScript workspace, responsive interface, light/dark theme, React Icons, PWA shell, README, AGENTS.md and 30-day backlog.
- Review: inspected the starter UI, tests, dependency graph, PWA output, Git ignore rules and local registry setup; corrected issues found by tests before recording a passing result.
- Dependencies: generated package-lock.json and installed packages after Nexus 404s. The user approved npmjs fallback. Local .npmrc remains ignored, preserves Nexus as default and maps only required scopes. No private registry config is tracked.
- Checks: npm test -- --reporter=dot passed (1/1), npm run typecheck passed, and npm run build passed; no standalone lint script is configured in this Vite project. The PWA build generated its service worker and manifest.
- GitHub: Day 00 foundation commit 420efef is pushed to both main and day-00-foundation: https://github.com/danyallya/kanban-project-manager. Day 01 has not started.
- Schedule: Day 01 has not started. The next task is Day 01 in BACKLOG.md; wait for the user to trigger that day.

## Day 01 — task and project models (2026-10-27, Asia/Tehran)

- Review: board task stages and project/label relationships were untyped strings; drag-and-drop allowed skipping stages; due dates were presentation text; the footer implied live synchronization. Added explicit models and one-step transition rules, stored due dates as validated ISO calendar days, and labeled the board as fictional local preview data.
- Implementation: tasks now reference typed project and label fixtures; stage drops apply only the allowed transition map, completed tasks can reopen into review, and due labels are calculated from stored dates.
- Tests: `npm test -- --reporter=dot` passed (2 files, 5 tests); `npm run typecheck` passed; `npm run build` passed, including PWA asset generation.
- Documentation: README documents board types and transition semantics; BACKLOG marks Day 01 done and records the remaining keyboard and invalid-drop announcement work for Day 02.
- Git: implementation commit `af7afae` (`feat: define typed board models and stage rules`) is pushed to `day-01/task-models` and fast-forwarded to `main`. This daily-log entry is included in the final synchronization of both branches. No `.npmrc`, environment files, credentials, or generated build output are tracked.
- Next: Day 02 — add keyboard-accessible move controls and focused task detail.
