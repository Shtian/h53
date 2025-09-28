# Quickstart: Guestbook Memory Entries

## Prerequisites
- Clerk invite for a test family account.
- Convex dev server running (`npx convex dev`).
- Next.js dev server running (`npm run dev`).
- Mobile device or simulator available to validate photo upload (iOS Safari and Android Chrome preferred).

## Manual Verification Checklist

### Status Log (2025-09-28)
- Authenticate & load guestbook → Pending manual run (local Convex/Next servers unavailable in CLI session).
- Create a memory → Pending manual run; validated expected behaviour via zod schema and Convex mutation review.
- Edit a memory → Pending manual run; optimistic update and storage cleanup confirmed in code.
- Delete a memory → Pending manual run; soft-delete path confirmed by Convex mutation logic.
- Negative & observability checks → Pending manual run; logging hooks added in UI and Convex handlers.

### 1. Authenticate & Load Guestbook
- Sign in with the invited family account.
- Navigate to `/guestbook` and confirm existing entries render with image, title, description, and date.
- Confirm the Add Entry button is visible and opens the modal dialog.

### 2. Create a Memory
- From the modal, upload a JPEG photo under 10 MB (test both desktop drag-drop and mobile picker).
- Enter a title (≥3 chars) and leave the description empty; submit.
- Verify the modal closes, the new entry appears at the top with today’s date, and the empty description collapses gracefully.
- Reopen the modal and submit again with an over-10 MB file to confirm client-side validation error messaging.

### 3. Edit a Memory
- Select the entry created above and choose “Edit”.
- Replace the photo with a PNG, update the title and add a description (~50 chars), then save.
- Confirm the card updates in place without reload, date remains unchanged, and updated content persists on refresh.

### 4. Delete a Memory
- Trigger the delete action for the edited entry.
- Confirm a confirmation step appears; accept it.
- Verify the entry disappears from the grid and does not return after page refresh.

### 5. Negative & Observability Checks
- Attempt to invoke add/edit/delete after signing out; ensure guards prevent the action and the modal is inaccessible.
- Verify Convex logs (terminal) include create/update/delete entries with user and storage IDs.
- If possible, throttle network to simulate upload failure; ensure retry messaging appears and manual retry succeeds.

## Rollback / Cleanup
- Remove any test entries (delete flow) to keep the guestbook clean.
- Revoke the upload URL if the session remains idle (Convex handles expiration automatically).
