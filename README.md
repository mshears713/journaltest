# Daily Activity Logger PRD

## Overview
The Daily Activity Logger allows individual users to manually log their daily activities through a web interface. It provides core functionalities such as creating, editing, deleting, and viewing activity entries for the current day. The core value lies in its simplicity and ease of use for tracking daily tasks without persistent storage.

## System Contract (Source of Truth)
- frontend_required: true

### 1. Core Entities
- **ActivityEntry:** Represents a single logged activity with a description and timestamp.

### 2. API Contract
No backend API required.

### 3. Data Flow
1. User submits activity data via React UI, captured in the form.
2. Client-side Validation checks the input for format and completeness.
3. Activity Management Logic processes the request and updates the in-memory data store.
4. In-memory Data Store holds the data, making it available for the current session.
5. User requests to view activities, and React UI retrieves data from the in-memory store.
6. User edits or deletes an entry, and Activity Management Logic updates the in-memory store.
7. User closes the browser, resulting in data loss as there is no persistence.

### 4. Frontend / Backend Boundary
**Frontend Responsibilities**
- Capture user input and display activity data.
- Validate input data before processing.
- Manage in-memory data operations for CRUD activities.

**Backend Responsibilities**
- None, as there is no backend component.

### 5. State Model (lightweight)
**Client State**
- Holds current session's activity entries in memory.
- Manages UI state for displaying activities.

**Server State**
- None, as there is no server-side state.

## Architecture
The system is structured as a purely frontend application using React. It includes components for the user interface, client-side validation, and activity management logic. All data is stored temporarily in the browser's memory, with no backend or persistent storage. The React UI interacts with the client-side logic to perform CRUD operations on activity entries.

## Components
### React UI
- **Responsibility:** Provides the user interface for logging and viewing activities.
- **Interface:** Users interact with forms and buttons to manage activities.
- **Key logic:** Renders activity data and captures user input.

### Client-side Validation
- **Responsibility:** Ensures input data is valid before processing.
- **Interface:** Called by the React UI to validate user input.
- **Key logic:** Checks for required fields and correct data formats.

### Activity Management Logic
- **Responsibility:** Handles creation, editing, and deletion of activity entries.
- **Interface:** Invoked by the React UI to perform CRUD operations.
- **Key logic:** Updates the in-memory data store with user actions.

## API Usage
No external APIs required.

## Database Design
No persistent storage required.

## Test Cases
| Test | Input | Expected Output | Type |
|------|-------|-----------------|------|
| Create Activity | Valid description and timestamp | Activity added to in-memory store | unit |
| Edit Activity | Valid updated description | Activity updated in-memory store | unit |
| Delete Activity | Valid activity ID | Activity removed from in-memory store | unit |
| View Activities | Request to view | List of activities displayed | integration |
| Invalid Input | Missing description | Error message displayed | unit |
| Data Loss on Refresh | Refresh browser | All activities lost | e2e |

## Implementation Notes for Build Agents
- This PRD is a coordination layer that downstream agents will use to generate `backend_prd.md` and `frontend_prd.md`.
- The **System Contract (Source of Truth)**, especially the **API Contract**, must NOT be changed downstream.
- Implementation phases will be defined separately in each downstream PRD.

IMPLEMENTATION FOCUS
- Each component must contain enough detail for a developer to begin implementation
- Avoid vague descriptions — include specific behaviors, inputs, and outputs