# Atelier Project Desk

Atelier House coordinates client work across a small creative studio. The Project Desk gives producers and creative leads a shared view of briefs, owners, deadlines and handoffs without turning a simple planning ritual into a heavyweight project system.

## What it supports
The foundation presents a four-stage board, task ownership, due dates, priorities, team context, search, task creation and drag-and-drop movement. Tailwind CSS establishes utility and responsive foundations while project-specific CSS creates a warm paper-and-olive identity. React Icons supplies navigation and task symbols.

Tasks currently live in local React state and reset when the page reloads. The 30-day roadmap adds durable storage, project views, calendar and timeline modes, team collaboration, accessible movement controls, PDF/Excel exports and installable PWA behavior.

## Run locally
Use Node.js 20 or newer. The local .npmrc is ignored by Git and points npm to the configured Nexus mirror.

    npm install
    npm run dev

Use npm test, npm run typecheck and npm run build before a release. The app is responsive across phone, tablet and desktop widths and includes a light and dark theme.

## Product principles
Keep the board calm, legible and suitable for real studio work. Preserve task history and clear ownership as features are added. Support keyboard users alongside drag-and-drop, respect reduced motion, and never represent sample tasks as connected client work. Do not commit private client data or local registry configuration.
