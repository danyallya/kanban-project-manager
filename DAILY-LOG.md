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

## Review workflow maintenance — 2026-10-27

- The user requested careful sequential project execution, commit content/counts suited to each product and an independent branch/PR per repository with panel review and merge.
- Atelier review must preserve one-step task transitions, date-only due dates and ownership while proving keyboard alternatives to board dragging and announcing rejected moves. Added a standalone delivery policy and entry points in AGENTS, README and BACKLOG.
- Documentation-only maintenance on `docs/atelier-board-review`; Markdown diff reviewed and `git diff --check` used. No application tests/build rerun for this process change. Next product work: Day 02 — keyboard-accessible move controls and focused task detail.
- This is the pre-merge log state. The portfolio workspace DELIVERY-RECEIPTS.md records the actual PR URL, checked head, panel gates, merge SHA and sync afterward; reconcile it here in the next authorized update.

## Contribution guidance maintenance — 2026-10-27

- User request: integrate achievable GitHub profile goals naturally into future project work. Added Atelier Project Desk contribution guidance around a keyboard-only task-move reproduction with preserved fields and focus notes and useful documentation examples. Preserved the daily backlog and all delivery gates.
- Previous delivery-policy PR #1 is merged in origin/main; this maintenance starts from that merged history. No badge, collaborator, star or accepted answer is claimed.
- Documentation-only scope on docs/atelier-task-collaboration; reviewed Markdown and git diff --check. App tests/build are not rerun because runtime behavior is unchanged.
- Publication is pre-merge here; the final PR/head/panel/check/merge/sync evidence goes in the workspace DELIVERY-RECEIPTS.md after completion. Next: Day 02 — keyboard-accessible move controls and focused task detail. Wait for the user's day trigger.

## Day 02 — keyboard task handoffs — 2026-10-28

- Reconciled merged policy/contribution PRs #1/#2 from workspace receipts; started from origin/main 9a24abb. Reviewed task stages, metadata and previous transition diff. Drag-only movement and silent rejected drops were the specific Day 01 carry-over.
- Added adjacent-stage native buttons, shared transition feedback and a focused non-modal task detail with owner/date/priority. Move from card restores title focus; detail transitions focus the updated heading; Close/Escape restores the opener. Drag cancellation clears its source. Metadata and local-only sample scope are preserved.
- Final npm test -- --reporter=dot --maxWorkers=1 passed (3 files, 8 tests); npm run build passed including typecheck/PWA; git diff --check passed. No lint script. Tests cover movement/focus, detail metadata/Escape and rejected skipped-stage drop. Read all changed files locally; private configuration/build output excluded.
- External delivery gate: Work browser access disabled today. Actual browser keyboard/responsive/both-theme review, PR creation, panel Files changed/Checks/conversation review and merge/sync pending. Branch day-02/keyboard-task-handoffs pushed separately; final head in workspace receipt. No badge or CI outcome claimed.
- Next: finish pending Day 02 panel/UI gates, then Day 03 task editor with owner, due date, priority and validation when triggered.
