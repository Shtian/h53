# Feature Specification: Global Cabin Header

**Feature Branch**: `001-header`  
**Created**: 2025-09-27  
**Status**: Draft  
**Input**: User description: "Add a global header for my page. It should have a H53 logo, links to \"articles\" and \"guestbook\", weather status from yr.no and clerk login/profile button. It should collapse to a burger menu on smaller screens."

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers
- 🔒 Assume cabin features are member-only; explicitly call out if a public experience is required.

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies  
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As an authenticated H53 cabin member, I want a consistent site-wide header so that I can quickly navigate to articles, review the guestbook, see the current cabin weather, and manage my account from any page.

### Acceptance Scenarios
1. **Given** an authenticated H53 member on any page, **When** the page renders, **Then** the header displays the H53 logo, navigation links to articles and guestbook, the latest yr.no weather snapshot, and the Clerk profile button.
2. **Given** an authenticated member viewing the site on a viewport below the defined breakpoint, **When** they tap the burger menu, **Then** the navigation links expand in an accessible overlay or drawer while the weather badge and Clerk controls remain reachable.
3. **Given** an authenticated member already located on the homepage (`/`), **When** they click the H53 logo, **Then** the page does not reload and focus remains on the current view.

### Edge Cases
- Weather service unreachable: show a "Weather unavailable" fallback without breaking layout.
- Weather cache stale or missing: trigger a fresh fetch while keeping UI responsive.
- Member not authenticated: enforce Clerk sign-in gate before header content renders.
- Extremely small screens (<320px): navigation collapses without truncating critical actions.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST present a persistent header component on all authenticated pages containing the H53 logo, articles link, guestbook link, weather summary, and Clerk user button.
- **FR-002**: System MUST fetch the current yr.no snapshot via the existing weather integration and render temperature plus condition.
- **FR-003**: System MUST collapse navigation links behind an accessible burger menu at the Tailwind `md` breakpoint or below while keeping account access visible.
- **FR-004**: System MUST cache the weather snapshot using Next.js data caching (e.g., `fetch` with `revalidate: 3600` or `React.cache`) so the value persists for roughly one hour without writing to Convex.
- **FR-005**: System MUST surface a graceful fallback message when the weather snapshot request fails or times out.
- **FR-006**: System MUST log weather fetch failures and menu toggle errors via the shared logging utilities for observability.
- **FR-007**: System MUST keep the header sticky at the top of the viewport across all device sizes so navigation, weather, and account controls remain visible during scroll.
- **FR-008**: System MUST present the mobile burger menu using a shadcn drawer that fills the viewport below the sticky header, provides accessible focus trapping/ESC dismissal, and exposes the articles and guestbook links alongside the weather badge and account controls.
- **FR-009**: System MUST display the weather temperature in Celsius only, rounding to one decimal place, alongside the weather condition text.
- **FR-010**: System MUST link the H53 logo to the homepage (`/`) but suppress navigation when the current route is already `/` to avoid unnecessary reloads.

### Key Entities *(include if feature involves data)*
- No new persistent entities are introduced; the feature consumes existing weather helpers and relies on Next.js request caching rather than Convex storage.

---

## Clarifications

### Session 2025-09-27
- Q: To confirm the navigation experience: should the global header stay visible while members scroll? → A: Keep the header sticky at the top on all viewports
- Q: When the burger menu opens on small screens, how should it present the navigation? → A: Full-screen overlay that slides in from the right
- Q: How should we present the weather measurement? → A: Display temperature in Celsius only
- Q: What should happen when members click the H53 logo while already on the homepage? → A: Do nothing when already on `/`

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed
- [ ] Authentication expectations captured (member-only by default unless explicitly justified)

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities marked
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Review checklist passed

---
