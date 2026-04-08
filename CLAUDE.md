# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cooperative Accounting Dashboard** (branded as "COOPERIFY") is a React web application for managing cooperative societies, members, and financial contributions. It was generated from a Figma design file: https://www.figma.com/design/FPZg6B8Qy1vGkQD2bp7tkE/Cooperative-Accounting-Dashboard.

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173 by default)
npm run dev

# Build for production
npm run build
```

There are no linting, testing, or formatting scripts configured in this project.

## Architecture

### Technology Stack
- **Framework**: React 18.3.1 with React Router 7.13.0 for client-side routing
- **Build Tool**: Vite 6.3.5 with React and Tailwind CSS plugins
- **Styling**: Tailwind CSS 4.1.12 + Emotion (for component styling)
- **UI Components**: Radix UI primitives with shadcn-style wrapper components
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Icons**: Lucide React and MUI Icons
- **Other**: React DnD (drag-and-drop), react-resizable-panels, embla-carousel

### Directory Structure

```
src/
├── main.tsx              # Application entry point
├── app/
│   ├── App.tsx          # Router setup
│   ├── Root.tsx         # Layout root with sidebar navigation
│   ├── routes.tsx       # Route definitions (see below)
│   ├── pages/           # Page components (Dashboard, Societies, Members, Contributions)
│   └── components/
│       ├── ui/          # Shadcn-style UI components (button, input, dialog, etc.)
│       └── figma/       # Figma-specific components (ImageWithFallback)
├── styles/              # Global stylesheets (tailwind.css, theme.css, fonts.css)
└── imports/             # Static assets (CSV, PDF files)
```

**Path Alias**: `@` maps to `./src` directory (see vite.config.ts).

### Routing Structure

The application uses React Router v7. Routes are defined in `src/app/routes.tsx`:

- `/` - Dashboard (home page)
- `/societies` - Societies list
- `/societies/:id` - Society details
- `/members` - Members list
- `/members/:id` - Member details
- `/contributions` - Contributions list
- `/contributions/new` - Create new contribution
- `/contributions/:id` - Contribution details

The layout root (`Root.tsx`) provides:
- Fixed sidebar with navigation links
- Search bar
- User menu with avatar
- Active route highlighting

### Pages

Each page is a top-level route component in `src/app/pages/`:

- **Dashboard.tsx**: Overview and analytics with charts
- **Societies.tsx & SocietyDetails.tsx**: Manage cooperative societies
- **Members.tsx & MemberDetails.tsx**: Manage society members
- **Contributions.tsx, ContributionEntry.tsx, ContributionDetails.tsx**: Track financial contributions

### UI Components

Shadcn-style UI components are in `src/app/components/ui/`. They wrap Radix UI primitives with Tailwind styling. Examples include:
- `button.tsx`, `input.tsx`, `dialog.tsx`, `accordion.tsx`
- `badge.tsx`, `avatar.tsx`, `breadcrumb.tsx`
- `select.tsx`, `dropdown-menu.tsx`, `tabs.tsx`

These follow Radix UI composition patterns and use CVA (class-variance-authority) for variant styling.

## Key Development Notes

- **Figma Origin**: This codebase was generated from Figma. The `src/app/components/figma/ImageWithFallback.tsx` component handles image assets from the design.
- **Vite Configuration**: The `vite.config.ts` includes React and Tailwind plugins which are required for the Figma Make integration—do not remove these even if they appear unused.
- **Asset Imports**: SVG and CSV files can be imported directly as assets (see `assetsInclude` in vite.config.ts).
- **Styling Approach**: Combine Tailwind CSS utilities with Emotion-styled components where needed. Prefer Tailwind for layout and spacing.
- **Component Composition**: Use Radix UI primitives as building blocks. Refer to existing UI components for patterns.
