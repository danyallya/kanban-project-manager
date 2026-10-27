# Atelier Project Desk

Atelier House coordinates client work across a small creative studio. The Project Desk gives producers and creative leads a shared view of briefs, owners, deadlines and handoffs without turning a simple planning ritual into a heavyweight project system.

## What it supports
The foundation presents a four-stage board, task ownership, due dates, priorities, team context, search, task creation and drag-and-drop movement. Tailwind CSS establishes utility and responsive foundations while project-specific CSS creates a warm paper-and-olive identity. React Icons supplies navigation and task symbols.

Tasks currently live in local React state and reset when the page reloads. The 30-day roadmap adds durable storage, project views, calendar and timeline modes, team collaboration, accessible movement controls, PDF/Excel exports and installable PWA behavior.

## Run locally
Use Node.js 20 or newer. The project-local `.npmrc` is ignored by Git because registry configuration is machine-specific. Use `npm ci`; npmjs is an approved fallback if a configured mirror is missing a dependency.

    npm ci
    npm run dev

Use npm test, npm run typecheck and npm run build before a release. The app is responsive across phone, tablet and desktop widths and includes a light and dark theme.

## Product principles
Keep the board calm, legible and suitable for real studio work. Preserve task history and clear ownership as features are added. Support keyboard users alongside drag-and-drop, respect reduced motion, and never represent sample tasks as connected client work. Do not commit private client data or local registry configuration.

### Board model and stage rules
`src/domain/board.ts` defines task, project, label, priority, date, and stage types. Tasks reference projects and labels by ID and store due dates as validated `YYYY-MM-DD` values. A task may move one stage at a time: Up Next ↔ In Progress ↔ In Review ↔ Complete, with the completed task reopening to In Review. The sample board is fictional, stored in local React state, and resets on reload; it is not connected to client work.
