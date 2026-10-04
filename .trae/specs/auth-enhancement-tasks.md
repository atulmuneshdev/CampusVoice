# CampusVoice Authentication Enhancement — Task Queue

Maps every Acceptance Criterion from [auth-enhancement-spec.md](file:///d:/Ajay%20P/complane-note/.trae/specs/auth-enhancement-spec.md) to atomic, dependency-ordered implementation tasks.

---

## Task 1: Create Auth Context module (`AuthContext.jsx`)

- **Priority**: high
- **Status**: pending
- **Maps ACs**: AC-R1, AC-R7
- **Scope**: New file `src/context/AuthContext.jsx` (or `src/auth/AuthContext.jsx` — pick `src/context/` to mirror common conventions and keep it top-level discoverable). Exports `AuthProvider`, `useAuth` hook. Provider reads `cv_users` + `cv_auth` from localStorage on mount (with try/catch). Provides:
  - `user` (null when logged out)
  - `isAuthenticated`
  - `loadingAuth` (brief flag on mount)
  - `login(collegeId, password): { ok, error }`
  - `register(fields): { ok, error, fieldErrors }`
  - `logout()`
  - `updateProfile(partial): void` (so Profile save reflects across app)
  - Validators reused by Login and Register pages:
    - `validateCollegeId(id)`
    - `validatePassword(pw)`
    - `validateEmail(email)`
  - Route guard helpers: `RequireAuth`, `RedirectIfAuthed` components moved out of `App.jsx` into this module for single source of truth.
- **Test Requirements (rule)**:
  - TR-T1-R1: Provider, on first load in a clean localStorage, exposes `user === null`, `isAuthenticated === false`.
  - TR-T1-R2: After writing a valid user to `cv_users` and calling `login`, `user.collegeId` and `user.name` reflect that record and `cv_auth` is set in localStorage.
  - TR-T1-R3: `logout()` clears `user` and removes `cv_auth`; subsequent `isAuthenticated` is false.
- **Test Requirements (rubric)**:
  - TR-T1-U1: Code structure: hook usage is ergonomic (no boilerplate on consumer side), context fallbacks are safe (no destructuring null). Score 0-2. Threshold ≥ 1.

---

## Task 2: Improve existing Login page (`pages/Login.jsx`)

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1
- **Maps ACs**: AC-R2, AC-R4, AC-R9, AC-U1, AC-U2
- **Scope**: Edit `src/pages/Login.jsx` in-place. Keep the existing two-column hero + forms layout, gradient brand panel, blur effects, and CampusVoice logo block. Changes:
  - Use `useAuth()` instead of raw localStorage for submitting.
  - Remove hardcoded profile object `{ name: 'Atul Munesh', ... }` from the submit handler — derive user fields from the registered user returned by `login()`.
  - Keep College ID, Academic Year dropdown, Password fields; add inline validation for each:
    - College ID: required + format regex message.
    - Academic Year: required.
    - Password: required + min length hint.
  - On submit, call `auth.login(collegeId, password)`. On failure, show the animated error banner with the returned message. On success, `navigate('/dashboard', { replace: true })`.
  - Show success banner when `location.search === '?registered=1'` (registration redirect).
  - Ensure single-column stacked layout on `< 1024px` already works (it does via existing `lg:grid-cols-2`). Double-check input paddings for mobile.
  - Add/improve a "Don't have an account? **Register**" link at the bottom of the form, styled consistently with existing page.
  - Preserve password show/hide toggle, remember-me, forgot-password text.
- **Test Requirements (rule)**:
  - TR-T2-R1: Empty submit → inline error messages appear and no redirect.
  - TR-T2-R2: With a known user in `cv_users`, correct credentials → lands on `/dashboard`. Wrong password → stays, shows error banner.
  - TR-T2-R3: `?registered=1` query param shows a success notice.
  - TR-T2-R4: No `'Atul Munesh'` string literal remains in this file.
- **Test Requirements (rubric)**:
  - TR-T2-U1: Visual consistency with the existing brand (spacing, borders, focus rings, gradient panel unchanged). Score 0-2. Threshold ≥ 1.

---

## Task 3: Add Registration page (`pages/Register.jsx`) + App router

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1
- **Maps ACs**: AC-R3, AC-R5, AC-U1, AC-U2
- **Scope**:
  - New file `src/pages/Register.jsx`. Mirror the Login page's two-column structure (brand gradient left, form right). Left-side hero text is slightly different: "Join CampusVoice. Raise your first complaint in minutes." Right-side fields: Full Name, College ID, College Email, Department (select: CSE, ECE, EEE, ME, CE, etc.), Course (B.Tech, B.Sc, BA, etc.), Year/Semester, Phone (optional), Password, Confirm Password.
  - Validation: inline per-field on blur and on submit. Use validator helpers from Task 1. Check duplicate College ID and email against `cv_users` via `auth.register()`'s returned `fieldErrors`.
  - On success: show inline success, then `navigate('/login?registered=1', { replace: true })`.
  - Link at bottom: "Already have an account? **Sign in**" → `/login`.
  - In `App.jsx`: import `Register`, add a new `/register` route wrapped in `RedirectIfAuthed` (from Task 1's new module) alongside the existing `/login` route.
- **Test Requirements (rule)**:
  - TR-T3-R1: Valid form creates a user in `cv_users[]` and redirects to `/login?registered=1`.
  - TR-T3-R2: Duplicate College ID submission shows per-field `collegeId` error and doesn't overwrite storage.
  - TR-T3-R3: Passwords < 8 chars or missing required complexity fail with per-field error. Confirm password mismatch fails with the confirmPassword field error.
  - TR-T3-R4: `/register` is accessible only when logged out (redirected to dashboard when authed).
- **Test Requirements (rubric)**:
  - TR-T3-U1: Visual match with Login page brand identity (same colors, inputs, button styles, hero text density). Score 0-2. Threshold ≥ 1.

---

## Task 4: Refactor route guards in App.jsx to use Auth Context

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1
- **Maps ACs**: AC-R1, AC-R7
- **Scope**: In `src/App.jsx`:
  - Wrap the entire `<BrowserRouter>` subtree in `<AuthProvider>` imported from Task 1's module.
  - Replace the inline `RequireAuth` and `RedirectIfAuthed` function components with the ones imported from the Auth module (so they consume context, not just raw localStorage).
  - Add the `/register` route (Task 3) inside the `RedirectIfAuthed` wrapper group with `/` and `/login`.
- **Test Requirements (rule)**:
  - TR-T4-R1: On a fresh browser session (no `cv_auth`), navigating to `/dashboard` redirects to `/login`.
  - TR-T4-R2: Logged-in user navigating to `/login` or `/register` redirects to `/dashboard`.
  - TR-T4-R3: All original routes (`/dashboard`, `/complaints`, `/complaints/new`, `/complaints/:id`, `/categories`, `/notifications`, `/notices`, `/profile`, `/help`) are still reachable inside the protected layout.

---

## Task 5: Make Navbar dynamic + Profile Dropdown

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1
- **Maps ACs**: AC-R5, AC-R8
- **Scope**: Edit `src/components/Navbar.jsx`:
  - Import `useAuth()`.
  - Derive initials and display name from `auth.user` (name split, take first letter of first/last, uppercase). Fall back to "?" if null (shouldn't happen inside protected routes).
  - Replace hardcoded `AM` initials → dynamic.
  - Replace hardcoded `"Atul"` name display → dynamic `user.name.split(' ')[0]`.
  - Replace the plain NavLink-to-profile chip with a profile dropdown (click the chip). Dropdown items: "My Profile" → `/profile`, "My Complaints" → `/complaints`, a disabled/dim "College ID: {user.collegeId}" info row, a divider, "Logout" action → calls `auth.logout()`.
  - Update the mobile drawer's footer section (lines ~193-200) to display dynamic user name and College ID from context.
- **Test Requirements (rule)**:
  - TR-T5-R1: After logging in as "Rahul Kumar" / "COL2026001", navbar shows initials `RK` and first name `Rahul`. Mobile drawer footer reads `Rahul Kumar` + `COL2026001`.
  - TR-T5-R2: Dropdown's My Profile, My Complaints links navigate to correct routes. Dropdown's Logout clears context and redirects to `/login`.
  - TR-T5-R3: No `'Atul'` / `'AM'` / `'CSE20260045'` literals remain as JSX display content in this file.

---

## Task 6: Make Sidebar user card dynamic

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 1, Task 11 (for counts)
- **Maps ACs**: AC-R5, AC-U3
- **Scope**: Edit `src/components/Sidebar.jsx`:
  - Import `useAuth()`.
  - Replace the hardcoded welcome-back block (line ~61) with dynamic `auth.user.name`, `auth.user.collegeId`, `auth.user.semester`.
  - Replace hardcoded "12 Complaints" / "5 Resolved" counts with derived counts from Task 11 (use a small re-exported helper from Complaints page, or compute inline from `window.__CV_COMPLAINTS__` + user college ID; keep the computation cheap on render).
  - Keep the existing `logout()` behavior but route through `auth.logout()` for consistency.
- **Test Requirements (rule)**:
  - TR-T6-R1: Sidebar shows the logged-in user's name. For a user with 2 submitted complaints (1 Resolved, 1 Pending), the mini stats reflect "2 Complaints • 1 Resolved" (or equivalent rounded numbers matching the data).
  - TR-T6-R2: Clicking Log Out in sidebar clears auth and redirects to `/login`.
  - TR-T6-R3: No `'Atul Munesh'` / `'CSE20260045'` literal strings remain in rendered JSX of this file (they can exist only in default fallback comments if any).

---

## Task 7: Update Dashboard greeting + stats to be per-user

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1, Task 11
- **Maps ACs**: AC-R5, AC-R10
- **Scope**: Edit `src/pages/Dashboard.jsx`:
  - Import `useAuth()`.
  - Replace the static `{greeting}, Atul {emoji}` line with dynamic `{greeting}, {firstName} {emoji}` where `firstName = user?.name?.split(' ')[0]`.
  - Recompute total/pending/review/resolved counts from the per-user filtered list (reuse filter helper from Task 11).
  - Recent Complaints card rows are also the filtered list (slice 0..4).
  - "Latest Updates" generic feed is OK to keep as-is (campus-wide notices, not student-specific).
- **Test Requirements (rule)**:
  - TR-T7-R1: Greeting uses current user's first name.
  - TR-T7-R2: Stat counts match the per-user filtered complaints list (verify with a registered user who has submitted 2 complaints; totals should reflect 2, not the demo 12).
  - TR-T7-R3: No `'Atul'` literal remains in Dashboard JSX.
- **Test Requirements (rubric)**:
  - TR-T7-U1: Stats feel "live" — numbers update after submitting a new complaint (without page reload via storage event listener already in Complaints; either add a similar effect or tolerate a single refresh-level lag; score 0-2 pass ≥ 1).

---

## Task 8: Attach user identity to new complaints in NewComplaint page

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1
- **Maps ACs**: AC-R6, AC-R11
- **Scope**: Edit `src/pages/NewComplaint.jsx`:
  - Import `useAuth()`.
  - In the submit handler (line ~106), add `studentName` and `studentCollegeId` fields to `newComplaint` from `auth.user.name` and `auth.user.collegeId`.
  - Replace the hardcoded first timeline entry `by: 'Atul Munesh'` → `by: auth.user.name`.
  - Optionally, show a read-only "You are submitting as: {name} • ID: {collegeId}" info block in the sidebar/review area to make the identity attachment transparent to users.
- **Test Requirements (rule)**:
  - TR-T8-R1: After submitting a complaint via form (use dev tools to inspect localStorage `cv_complaints[0]`), fields `studentName` and `studentCollegeId` are present and match current user.
  - TR-T8-R2: First timeline event's `by:` is the user's full name.
  - TR-T8-R3: No `'Atul Munesh'` literal remains in this file's submit logic.

---

## Task 9: Filter Complaints list by current student

- **Priority**: high
- **Status**: pending
- **Depends on**: Task 1
- **Maps ACs**: AC-R6, AC-R12
- **Scope**: Edit `src/pages/Complaints.jsx`:
  - Import `useAuth()`.
  - Add a filter step in `mergedList()` or on the resulting list before the `filtered` memo:
    - If complaint has `studentCollegeId`, keep only if `=== currentUser.collegeId`.
    - If complaint has no `studentCollegeId` (demo defaults), keep only if the timeline's first item `by:` matches `currentUser.name` (so demo complaints appear only when the demo user logs in via backward-compat). Otherwise hide.
  - Summary counts computed from the post-filter list (already based on `list` state so summary line and filter chips are correct).
  - Export a small helper `filterComplaintsByUser(list, user)` alongside the page (or keep it in the Auth module helpers section from Task 1) so Dashboard and Sidebar stats can reuse it (Task 6 & 7).
- **Test Requirements (rule)**:
  - TR-T9-R1: For a brand-new registered user "Rahul" with no submissions, Complaints page shows 0 total, 0 pending, and the empty-state banner (File Your First Complaint).
  - TR-T9-R2: After Rahul submits 1 complaint (Task 8), Complaints page shows exactly that 1.
  - TR-T9-R3: Demo user "Atul Munesh" (backward-compat login without registering) still sees the default seeded complaints.

---

## Task 10: Add student info block to ComplaintDetails

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 1
- **Maps ACs**: AC-R13
- **Scope**: Edit `src/pages/ComplaintDetails.jsx`:
  - In the info grid section (lines ~159-212), alongside Category / Location / Submitted / Updated cards, add a "Submitted by" card that displays the complaint's `studentName` + `studentCollegeId`. For legacy demo entries without those fields, fall back to the first timeline entry's `by:` name and a generic "College ID (demo)" hint.
  - Use `FiUser` icon with a sky/navy tint consistent with surrounding cards.
- **Test Requirements (rule)**:
  - TR-T10-R1: Newly submitted complaint details view shows Submitted-by card with the student's real name and College ID.
  - TR-T10-R2: Old demo complaint (no student fields) falls back to the timeline author name without erroring.

---

## Task 11: Ensure Profile page save updates Auth Context

- **Priority**: medium
- **Status**: pending
- **Depends on**: Task 1
- **Maps ACs**: AC-R14, AC-U3
- **Scope**: Edit `src/pages/Profile.jsx`:
  - Import `useAuth()` in addition to current localStorage logic.
  - Initialize profile state from `auth.user` first, with localStorage merge (keep current robustness).
  - On `saveEdit()`, after writing `cv_auth`, also call `auth.updateProfile({ name, collegeId, academicYear, department, semester, email })` so Navbar/Dashboard/Sidebar reflect edits instantly without a refresh.
  - Keep the existing Log Out modal flow; have it call `auth.logout()` for consistency.
  - The `defaultProfile` object still exists but should be used only for the remaining non-auth fields (phone, dob, address) when loading a profile. Name/collegeId/department/academicYear/semester/email should always come from `auth.user` when present.
- **Test Requirements (rule)**:
  - TR-T11-R1: Edit user's name on Profile page, save → Navbar and Sidebar display the new name without a page reload.
  - TR-T11-R2: Profile page Log Out clears context and redirects to `/login`.

---

## Task 12: End-to-end flow verification + lint

- **Priority**: high
- **Status**: pending
- **Depends on**: Tasks 1–11
- **Maps ACs**: AC-R10, NFR7 (all rules via manual run)
- **Scope**:
  - Manual walkthrough (record evidence for each rule AC):
    1. Register new user (valid data) → redirected to login + registered=1 success, user in `cv_users`.
    2. Attempt duplicate register → inline errors.
    3. Attempt weak password / mismatch → validation failures.
    4. Login with new user → dashboard shows dynamic name, correct initials in navbar/sidebar, complaints list empty → file 1 complaint → appears in list with correct "submitted by".
    5. Profile → edit name → navbar updates live.
    6. Logout via each of (a) Navbar dropdown, (b) Sidebar, (c) Profile page. All routes clear auth and land on login. Login page blocks if authed.
    7. Mobile 375px view: both Login and Register stack cleanly, no horizontal scroll, tap targets ≥ 40px.
  - Run `npm run lint` (oxlint) and fix any new warnings/errors introduced.
- **Test Requirements (rule)**:
  - TR-T12-R1: `npm run lint` exits 0 (no new lint errors).
  - TR-T12-R2: Every manual step above succeeds end-to-end with correct redirections.
- **Test Requirements (rubric)**:
  - TR-T12-U1: Overall flow smoothness (no flashes of wrong name, no reloads needed between pages, animations subtle and consistent). Score 0-2. Threshold ≥ 1.

---

## DAG Summary (ready order)

Ready immediately:
- Task 1 (Auth Context)

After Task 1:
- Task 2 (Login improvements)
- Task 3 (Register page + App.jsx route)
- Task 4 (App.jsx guards refactor)
- Task 5 (Navbar dynamic)
- Task 8 (NewComplaint identity attach)
- Task 9 (Complaints list filter)
- Task 10 (ComplaintDetails student info)
- Task 11 (Profile → context update)

After Task 9 (filter helper exists):
- Task 6 (Sidebar counts)
- Task 7 (Dashboard counts)

At end:
- Task 12 (Verify + lint)
