# Daily Activity Logger Frontend PRD

## Purpose
The Daily Activity Logger allows users to manually log and manage their daily activities through a web interface, focusing on simplicity and ease of use without persistent storage.

## Responsibilities
- Capture and validate user input for daily activities.
- Manage in-memory data operations for creating, editing, deleting, and viewing activity entries.
- Provide a user-friendly interface for interacting with activity data.

## Integration Contract (From Main PRD — Do Not Change Without Updating Main PRD)
### Core Entities
- **ActivityEntry:** Represents a single logged activity with a description and timestamp.

### API Contract
No backend API required.


## Views / Screens
- **Activity Entry Form:** Allows users to input new activities.
- **Activity List View:** Displays all logged activities for the current session.
- **Activity Edit/Delete Controls:** Provides options to modify or remove existing entries.

## User Flow
1. User accesses the Activity Entry Form to log a new activity.
2. The form validates input data before submission.
3. Upon submission, the activity is added to the in-memory data store.
4. The Activity List View updates to display the new entry.
5. Users can edit or delete entries directly from the list view.
6. All changes are reflected immediately in the UI.

## Components
- **ActivityEntryForm:** Captures user input for new activities.
- **ActivityList:** Displays current session's activities.
- **ActivityItem:** Represents individual activity entries with edit/delete options.
- **ValidationLogic:** Ensures input data is complete and correctly formatted.

## State Model
- **ActivityEntries:** Array of current session's activities stored in memory.
- **UIState:** Manages visibility and interaction states for forms and lists.

## API Usage (Must match API Contract)
No backend API required.


## UX / Loading / Error Handling
- Display loading indicators during data processing.
- Show error messages for invalid inputs or failed operations.
- Provide feedback on successful activity creation, editing, or deletion.

## Out of Scope
- Persistent data storage.
- User authentication and multi-user support.
- Exporting or importing activity data.

## Implementation Phases

### Phase 1 — App shell and primary flow
- Implement the basic React app structure with routing.
- Create the Activity Entry Form and Activity List View.
- Acceptance: User can navigate between form and list view; form is displayed correctly.

### Phase 2 — API wiring and state handling
- Set up in-memory data store and connect it with UI components.
- Implement client-side validation logic for activity entries.
- Acceptance: Valid activities are added to the list; invalid inputs show error messages.

### Phase 3 — Output rendering and UX polish
- Enhance UI with styling and user feedback (e.g., loading indicators).
- Implement edit and delete functionality for activity entries.
- Acceptance: User can edit/delete entries; UI updates reflect changes immediately.

### Phase 4 — Edge handling and cleanup
- Handle edge cases such as empty inputs and excessive entries.
- Optimize performance for large numbers of activities in a session.
- Acceptance: Application remains responsive with many entries; no crashes or unhandled errors.
