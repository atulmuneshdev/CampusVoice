# CampusVoice Authentication Enhancement — Specification

## Problem

The existing CampusVoice (College Complaint Box) application currently stores authenticated user profiles in `localStorage` under the `cv_auth` key, but user information (name, College ID) is **hardcoded** across multiple components (Navbar `AM`, Sidebar `Atul Munesh`, Dashboard greeting, complaint timeline submissions). The login page injects a hardcoded name regardless of the College ID entered. There is no registration flow, no centralized auth state management, and complaints are not tied to the submitting student — every complaint shows a generic author and all complaints are visible to every logged-in user.

## Users

- **New Students**: Need to create an account and log in to submit complaints.
- **Existing Students**: Need to log in with their College ID + password and see only their own complaint history, with their identity auto-attached to new submissions.
- **Application UI**: Must render the current student's name, College ID, email, department, and semester dynamically throughout the dashboard, navbar, sidebar, profile, and complaint submission flows.

## Goals

1. Create a **centralized Auth Context** (reusing the existing `cv_auth` localStorage contract) so all components consume the same user state via a hook instead of duplicating raw `localStorage` access.
2. **Improve the existing Login page** — keep the existing two-column layout and visual brand; add:
   - Field-level validation (College ID format, required fields, password min length).
   - Real error / success states with animated messages.
   - Loading state that disables the form.
   - Password show/hide toggle (existing).
   - A clearly styled "Don't have an account? Register" link.
   - Responsive tweaks for small screens (single column, proper tap targets).
3. **Registration page** that matches the Login page visual language and integrates into the existing router.
   - Fields: Full Name, College ID, College Email, Department, Course, Year/Semester, Phone (optional), Password, Confirm Password.
   - Validation: required fields, College ID regex, email format, password strength (min 8 chars, upper+lower+digit), confirm-match, prevent duplicate College ID/email via `cv_users` localStorage store.
   - On success → animated success message + redirect to `/login` with query param to highlight "Account created".
4. **Navbar & Sidebar & Dashboard** — remove all hardcoded "Atul Munesh", "AM", "CSE20260045" strings and replace with dynamic data from the Auth Context hook.
   - Navbar profile pill: initials from user name, dynamic name display; add a dropdown with My Profile, My Complaints, College ID, Logout.
   - Sidebar user card: dynamic name, College ID, semester, per-user complaint counts (from filtered complaints).
   - Dashboard greeting: dynamic name + per-user statistics (total / pending / review / resolved).
5. **Complaint integration**:
   - New complaints auto-attach the submitting student's `name` + `collegeId` to the complaint object.
   - Timeline `by:` field uses the authenticated user name dynamically.
   - **Complaints list page** (`/complaints`) filters and displays only complaints submitted by the currently logged-in student. Default/complaints-in-`cv_complaints` entries that do not match the current user are hidden (or tagged as demo/sample data if authored by the demo user).
   - Complaint details page shows the student block (name, College ID) next to category/location info.
6. **Protected routes**: Refine `RequireAuth` / `RedirectIfAuthed` in [App.jsx](file:///d:/Ajay%20P/complane-note/src/App.jsx) to rely on the Auth Context (with a sync fallback to localStorage on first render) so stale or malformed tokens are rejected.
7. **Logout flow**: The Navbar dropdown's Logout, Sidebar's Log Out button, and Profile page's Log Out button all clear `cv_auth` and redirect to `/login`. Add a "You've been logged out" optional toast on the login page when redirected.

## Non-Goals

- Do NOT replace the existing UI theme (gradients, glassmorphism, navy/violet palette, component style).
- Do NOT add a real API backend — authentication and user storage continue to use localStorage, mirroring the current app's offline-first design.
- Do NOT restructure routes or remove any existing pages.
- Do NOT change the complaint category selection, upload, or timeline step UX beyond attaching the student identity.
- Do NOT introduce Redux or new state libraries beyond the built-in Context API.

## Functional Requirements

| ID | Requirement |
|---|---|
| FR1 | `AuthContext` + `useAuth()` hook provide: `user`, `login(collegeId, password)`, `register({...fields})`, `logout()`, `isAuthenticated`, `loadingAuth`. |
| FR2 | Users stored in `localStorage('cv_users')[]` with `{ collegeId, email, password, name, department, course, year, semester, phone, createdAt }`. |
| FR3 | Login checks College ID (case-insensitive) + password match against `cv_users`. Falls back to legacy demo-login path for backward-compat (any password logs in the stored profile if `cv_users` is empty). |
| FR4 | Successful login writes `cv_auth` with the registered user's profile (same shape as today: `name, collegeId, academicYear, department, semester, email`). |
| FR5 | Registration validates: required fields, College ID pattern (`^[A-Z]{2,4}\d{6,8}$`), email (`@`), password ≥ 8 with uppercase/lowercase/digit, confirm-match, unique College ID and email. |
| FR6 | Login page field-level inline validation errors appear under each input, with an animated top-level error banner for credential mismatches. A small success banner appears on redirect from registration. |
| FR7 | `/register` route added to router, wrapped in `RedirectIfAuthed`. Link "Don't have an account? Register" in Login navigates there. Register page has a "Already have an account? Sign in" link back. |
| FR8 | Navbar shows the logged-in user's initials, first name. A hover/tap profile dropdown contains "My Profile", "My Complaints", a disabled "College ID: XXXX" row, and "Logout" — each with working navigation/action. |
| FR9 | Sidebar welcome card displays dynamic `user.name`, `user.collegeId`, and `user.semester`. |
| FR10 | Dashboard hero greets with dynamic first name. Stat cards and "Recent Complaints" are filtered to the current user's complaints. |
| FR11 | NewComplaint page writes `studentName` and `studentCollegeId` onto the new complaint object. The first timeline event's `by:` is the student's full name. |
| FR12 | Complaints page filters the merged list (`cv_complaints` + default data) to entries whose `studentCollegeId === currentUser.collegeId` OR `studentCollegeId` is not set but the legacy timeline `by:` entry matches the current user's name (for demo defaults). |
| FR13 | ComplaintDetails adds a "Submitted by" info card showing the student's name and College ID. |
| FR14 | Profile page continues to read and edit the `cv_auth` profile; save updates reflect instantly across the app via context. |
| FR15 | `RequireAuth` redirects to `/login` when no valid auth. `RedirectIfAuthed` redirects authed users away from `/login`, `/register`, `/` landing. |
| FR16 | Logout from Navbar, Sidebar, or Profile clears context + localStorage then redirects to `/login`. |

## Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR1 | All pages (Login, Register, Dashboard, Complaints, Navbar, Sidebar) remain fully responsive at breakpoints: < 640px mobile, 640–1023 tablet, ≥ 1024 desktop. No horizontal scroll or overflow on 375px viewport. |
| NFR2 | Accessible inputs: every input has a `<label>`, ARIA labels for icon-only buttons, keyboard navigation works (Tab order, Enter submits forms). |
| NFR3 | Animations are subtle (Framer Motion already in use). Keep existing entry animations; do not add heavy transforms that cause layout shift. |
| NFR4 | No hardcoded student names or IDs remain in the UI. Lint/grep should find 0 occurrences of "Atul" or the sample "CSE20260045" used as a display string in JSX (data file demo entries are OK but should be tagged by author). |
| NFR5 | Error handling for localStorage corruption (JSON.parse try/catch already used — preserved in Context). |
| NFR6 | No new dependencies beyond the existing stack (React, Framer Motion, React Router, Tailwind, react-icons). |
| NFR7 | `oxlint` passes with no new errors. |

## Constraints, Dependencies, Assumptions

- **Constraints**: localStorage-only backend (per existing architecture). Must keep existing routes working.
- **Dependencies**: React 19 + Context API, React Router v7 `BrowserRouter`/`Navigate`/`Link`, Framer Motion `motion`, `react-icons/fi`.
- **Assumptions**:
  - Passwords are stored in plaintext in `cv_users` since this is a demo frontend-only app (no backend to hash them). This is acceptable for the project's educational/demo scope.
  - The default complaints in `data/complaints.js` authored by "Atul Munesh" will be associated with the demo user (any user whose College ID matches the stored auth). For newly registered users, these demo complaints are hidden so the list is personal.
  - "Academic Year" on the existing login dropdown is preserved as a selectable field during Login (stored in `academicYear` of `cv_auth`) and optional defaulted during Register from the `year` field.

## Open Questions

None identified — all decisions align with the existing frontend-only localStorage pattern.

---

## Acceptance Criteria

### Rules

- **AC-R1 (Auth Context)**: `useAuth()` is exported from a single context module and used in place of raw `localStorage.getItem('cv_auth')` in Navbar, Sidebar, Dashboard, NewComplaint, Complaints, Profile, and the route guards in `App.jsx`.
- **AC-R2 (Login works)**: When a user exists in `cv_users` with matching College ID and password, login succeeds and the Dashboard renders that user's name and College ID in all dynamic slots. A non-matching College ID/password shows an animated error banner and stays on `/login`.
- **AC-R3 (Register works)**: Creating an account with valid data stores the user in `cv_users`, shows a success message, and redirects to `/login` where the banner confirms the account was created. Attempting to register a duplicate College ID or email shows the corresponding inline error and does not write to storage.
- **AC-R4 (Validation)**: Invalid forms (empty required fields, bad College ID format, weak password, mismatched confirm, or malformed email) block submission and display per-field validation text plus a top-level summary banner.
- **AC-R5 (Dynamic identity)**: After login with user "Rahul Kumar" / "COL2026001", navbar shows `RK` initials + "Rahul", sidebar says "Welcome back Rahul Kumar 👋 COL2026001 …", dashboard says "Good Morning, Rahul", Profile page displays Rahul Kumar's info. No hardcoded "Atul" strings appear in rendered UI.
- **AC-R6 (Complaint ownership)**: New complaint submitted by Rahul Kumar carries `studentName: "Rahul Kumar"`, `studentCollegeId: "COL2026001"` in localStorage entry. Rahul's Complaints list page shows only his own complaints (no unrelated defaults). Complaints he didn't author do not appear.
- **AC-R7 (Route guards)**: Visiting `/dashboard` without `cv_auth` redirects to `/login`. Visiting `/login` or `/register` when already authenticated redirects to `/dashboard`.
- **AC-R8 (Logout)**: Clicking Logout from Navbar dropdown, Sidebar, or Profile clears the context + `cv_auth` and lands on `/login`. Navbar no longer shows the profile pill.
- **AC-R9 (Responsive)**: Login and Register pages render a single stacked column on < 1024px with no overflow. Mobile menu in Navbar still works and shows dynamic user info in its footer.
- **AC-R10 (Lint)**: `npm run lint` reports no new errors.

### Rubrics

- **AC-U1 (Visual coherence, 0-3)**: Login & Register pages consistently reuse the existing gradient-split two-column design language, spacing tokens, input borders, focus rings, button styles, and animation timings. Pass threshold ≥ 2.
- **AC-U2 (UX polish, 0-3)**: Inputs have focus animations, password toggle is present and functional, loading state disables inputs and shows spinner, success/error banners animate in smoothly, form labels and icons match existing Login. Pass threshold ≥ 2.
- **AC-U3 (Auth seamlessness, 0-3)**: Once logged in, navigating between Dashboard, Complaints, NewComplaint, Profile, and back never shows a stale name; the entire UI instantly reflects the context user. Pass threshold ≥ 2.
