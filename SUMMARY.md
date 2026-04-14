# Daily Activity Logger — Summary

## What Was Built
A fully client-side React + Vite single-page application for logging daily activities in the browser. No backend, no database — all data lives in React state (in-memory) for the duration of the browser session. Refreshing the page clears all entries, which is the expected behaviour per the PRD.

## Tech Stack
| Layer      | Choice                                |
|------------|---------------------------------------|
| Framework  | React 18 + Vite 5                     |
| Language   | JavaScript (JSX)                      |
| Styling    | Plain CSS with CSS custom properties  |
| State      | `useReducer` via custom hook          |
| Testing    | Vitest + @testing-library/react       |

## Project Structure
```
frontend/
  index.html
  vite.config.js
  package.json
  src/
    main.jsx                  ← entry point
    App.jsx / App.css         ← root; wires everything together
    index.css                 ← global reset + design tokens
    components/
      ActivityEntryForm.jsx   ← add / edit form with validation UI
      ActivityEntryForm.css
      ActivityList.jsx        ← renders all entries + empty state
      ActivityList.css
      ActivityItem.jsx        ← single entry; inline edit + confirm-delete
      ActivityItem.css
      Toast.jsx / Toast.css   ← auto-dismiss feedback notification
    hooks/
      useActivities.js        ← in-memory CRUD via useReducer
      useActivities.test.js   ← 8 unit tests
    utils/
      validation.js           ← validateActivity(), formatTimestamp(), nowDatetimeLocal()
      validation.test.js      ← 10 unit tests
```

## How to Run

### Development
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

### Production Build
```bash
cd frontend
npm run build
npm run preview
```

### Tests
```bash
cd frontend
npm test
```
Expected: **18 tests passed** across 2 test files.

## What to Test Manually
| Scenario | Steps | Expected |
|---|---|---|
| Add activity | Fill description + date/time → click "Add Activity" | Entry appears in list; toast "Activity logged!" |
| Validation — empty description | Submit with blank description | Error message shown; entry not added |
| Validation — no timestamp | Clear timestamp field → submit | Error message shown |
| Edit activity | Click ✏️ on an entry → change text → Save | Entry updates in place; toast "Activity updated." |
| Cancel edit | Click ✏️ → Cancel | Returns to normal view without changes |
| Delete activity | Click 🗑️ → "Yes" to confirm | Entry removed; toast "Activity deleted." |
| Cancel delete | Click 🗑️ → "No" | Entry stays; confirmation hides |
| Data loss on refresh | Add entries → refresh page | All entries cleared (in-memory only) |
| Empty state | No entries logged | Placeholder message with prompt to add first entry |
| Many entries | Add 20+ entries | UI remains responsive and scrollable |

## Known Limitations
- **No persistence:** All data is lost on page refresh (by design, per PRD).
- **Single-user, single-session:** No multi-user support (out of scope per PRD).
- **No export:** Cannot export/import entries (out of scope per PRD).
- **Date/time input UX:** Uses the browser's native `datetime-local` input, which varies slightly across browsers.

## Phases Completed
- ✅ Phase 1 — App shell and primary flow
- ✅ Phase 2 — In-memory store and validation
- ✅ Phase 3 — UX polish (toast feedback, inline edit, confirm delete, CSS)
- ✅ Phase 4 — Edge handling and tests (18 passing)
