# Job Board

> A minimal SaaS-style job search tool that allows users to search, filter, and save jobs.  
> Built with Vanilla TypeScript — no frameworks, no bundlers.

---

## Features

### Core
- Fetch jobs from a remote API
- Display paginated jobs list
- Job details page
- Search by keyword
- Filter by location
- Save jobs to `localStorage`

### UX
- Loading state
- Error state
- Empty state

---

## Pages

| Page | Description |
|------|-------------|
| Home | Browse, search, and filter all available jobs |
| Job Details | View full job description and save the job |
| Saved Jobs | View all locally saved jobs |

---

## Data Model

```typescript
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  logo: string;
  postedAt: string;
}
```

---

## User Flow

```
User enters
    ↓
Loading spinner
    ↓
Jobs list rendered
    ↓
Search / Filter
    ↓
Click job card
    ↓
Job details page
    ↓
Save job
    ↓
Saved jobs page
```

---

## Tech Stack

- **TypeScript** — strictly typed, no frameworks
- **Vanilla JS** — no React, no Vue
- **HTML/CSS** — custom styling
- **ES Modules** — native browser module system
- **localStorage** — job persistence

---

## Project Goals

This project is built as a TypeScript training ground.  
The focus is on mastering: type safety, DOM manipulation, async data fetching, state management, and modular code structure — all without a framework.