# Feature Specification: Guestbook Memory Entries

**Feature Branch**: `003-guestbook-my-family`  
**Created**: 2025-09-28  
**Status**: Draft  
**Input**: User description: "Guestbook. My family should be able to add new memories to this site. The add entry button should trigger a shadcn dialog with a form. They need to be able to upload images from their phone and write title and an optional description. Each entry on the main page should have an image, date, title and description (as the current example has)."

## Execution Flow (main)

```
1. Parsed guestbook enhancement request focused on family memory submissions.
2. Extracted key concepts: invited family members (actors), add-entry trigger, modal form, single-image upload, title, optional description, main page presentation, and post-submission management.
3. Confirmed modal styling will follow the existing guestbook shadcn dialog and the memory date will use the submission timestamp.
4. Defined primary user story plus acceptance scenarios covering successful submissions and optional description usage.
5. Authored functional requirements for modal behaviour, validation, upload handling, feed updates, error messaging, and post-submission edits.
6. Identified Memory Entry entity with required descriptive fields, image constraints, contributor linkage, and update history.
7. Ran review checklist and flagged measurable success criteria as the remaining follow-up item.
8. Status: WARN (spec has uncertainties awaiting clarification).
```

---

## ⚡ Quick Guidelines

- Prioritise a warm, memory-focused experience that feels inviting to non-technical family members on mobile and desktop.
- Minimise steps in the add-entry flow so a photo, title, and optional description can be captured quickly without leaving the main page.
- Ensure the modal reuses the existing guestbook shadcn dialog styling so visuals stay consistent; coordinate with design only if new patterns are required.
- Manual verification: on staging, confirm photo uploads work from iOS and Android, the new entry appears with correct formatting, and an empty description still renders cleanly.

### Section Requirements

- **Mandatory sections**: User scenarios, functional requirements, key entities, and review checklist must all be validated before hand-off.
- **Optional sections**: Any additional metadata (e.g., analytics, localization) may be added later if product identifies the need.

## Clarifications

### Session 2025-09-28

- Q: Who is allowed to add guestbook memories and how do they authenticate? → A: Only invited family members who sign in with their personal accounts.
- Q: Who should be able to view the guestbook entries on the main page? → A: Anyone logged in.
- Q: How many images should a family member be able to attach to a single memory entry? → A: Exactly one photo per entry.
- Q: What image formats and maximum file size should we accept for the single photo upload? → A: JPEG or PNG up to 10 MB.
- Q: Should family members be able to edit or delete a memory after it’s submitted? → A: Authors may edit everything and delete their own entries.

---

## User Scenarios & Testing _(mandatory)_

### Primary User Story

A signed-in family member wants to add a new memory by uploading a photo, giving it a title, and optionally adding a short description so the rest of the invited family group can see it alongside existing guestbook entries while they are signed in.

### Acceptance Scenarios

1. **Given** a family member is viewing the guestbook page after signing in, **When** they click the Add Entry button and submit a valid photo and title (with or without a description), **Then** the modal closes and the new memory appears on the main page with image, date, title, and description populated.
2. **Given** the form enforces required fields, **When** a family member attempts to submit without a photo or title, **Then** the system surfaces clear error messaging and prevents submission until the missing information is provided.
3. **Given** a family member previously submitted a memory, **When** they choose to edit or delete it, **Then** the system must let them update the photo, title, and description or remove the entry entirely, and reflect changes immediately on the guestbook.

### Edge Cases

- What happens when the image upload fails because of slow or lost connectivity on a phone?
- How does the system handle a description left blank or containing very long text?
- What confirmation or undo options appear if an author deletes a memory?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST let authorised family members open a modal dialog from the Add Entry button without navigating away from the guestbook.
- **FR-002**: Modal form MUST require a photo and title, allow an optional description field, and communicate required inputs clearly.
- **FR-003**: System MUST support uploading a single photo directly from mobile devices, showing a preview (or filename) before submission, and restrict uploads to JPEG or PNG images up to 10 MB.
- **FR-004**: Form submission MUST validate inputs, block submission when validation fails, and present actionable error messages for missing photo, missing title, unsupported file format, oversize file, or upload errors.
- **FR-005**: Upon successful submission, system MUST create a new memory entry capturing the uploaded image, title, optional description, contributing family member, and an auto-generated submission timestamp that serves as the displayed date.
- **FR-006**: Newly created memory MUST appear on the main guestbook immediately, positioned according to the agreed ordering (e.g., newest first), without requiring the user to refresh the page.
- **FR-007**: Each memory on the main page MUST display the image, date, title, and description, gracefully handling cases where the description is empty.
- **FR-008**: System MUST provide user feedback if an image upload fails mid-process, allowing the family member to retry or cancel without losing entered text.
- **FR-009**: System MUST limit add-entry access to members authenticated through their personal accounts, preventing any other visitor from submitting memories.
- **FR-010**: Guestbook entries MUST only be visible to authenticated members; anyone not signed in MUST see a prompt to log in before accessing entries.
- **FR-011**: System MUST allow the original author to edit an existing memory, including replacing the photo and updating the title or description, with the update reflected immediately on the main page.
- **FR-012**: System MUST allow the original author to delete their memory entry, remove it from the guestbook listing, and provide a confirmation step before the deletion completes.

### Key Entities _(include if feature involves data)_

- **Memory Entry**: Represents a family memory with attributes for title (required), description (optional text), primary image (required media reference limited to one JPEG or PNG up to 10 MB), auto-generated submission date used for display, contributor identity, last updated timestamp, and display order metadata; supports author-driven edits and deletions.
- **Family Member**: Invited individual with personal account credentials, authorised to add, edit, delete, and view memories in the guestbook; invitation list managed by the site owner.

---

## Review & Acceptance Checklist

_GATE: Automated checks run during main() execution_

### Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed
- [x] Authentication expectations captured (member-only by default unless explicitly justified)
- [x] Manual verification expectations noted (what needs to be checked before release)

### Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [ ] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

---

## Execution Status

_Updated by main() during processing_

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [ ] Review checklist passed

---
