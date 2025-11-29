
Next JS

Start up the development server:

```bash
npm run dev
```
- Local:        http://localhost:3000

---
# Sastrugus - Kanban Board Struktúra

## Általános Board Beállítások

### Project Alapadatok:

- **Project név**: Sastrugus Workshop Platform
    
- **Időtartam**: 1 hónap (4 sprint)
    
- **Csapat**: 2 Frontend, 1 Backend, 1 Designer
    
- **Sprint hossz**: 1 hét
    

---
## Kanban Board Szekciói

### Main Board: `Sastrugus-Main`

```text
┌─────────────────┬─────────────────┬──────────────┬─────────────┬─────────────┬───────────┐
│    BACKLOG      │  SPRINT READY   │  IN PROGRESS │ CODE REVIEW │   TESTING   │   DONE    │
├─────────────────┼─────────────────┼──────────────┼─────────────┼─────────────┼───────────┤
│ Összes task     │ Következő       │ Jelenleg     │ Review-ra   │ Tesztelésre │ Befejezett│
│ prioritás       │ sprintre        │ aktív        │ váró        │ váró        │ taskok    │
│ szerint         │ előkészítve     │ taskok       │ taskok      │ taskok      │           │
└─────────────────┴─────────────────┴──────────────┴─────────────┴─────────────┴───────────┘
```
---
## Task Template Struktúra

### Standard Task Template:
## [Task ID] - [Task Title]

**Sprint**: [Sprint Number]
**Priority**: [CRITICAL/HIGH/MEDIUM/LOW]
**Story Points**: [Number]
**Assignee**: [Name]
**Start Date**: [YYYY-MM-DD]
**Due Date**: [YYYY-MM-DD]

### Description
[Detailed description of what needs to be done]

### Acceptance Criteria
- [ ] [Specific measurable criterion 1]
- [ ] [Specific measurable criterion 2]
- [ ] [Specific measurable criterion 3]

### Technical Details
**Frontend Components**:
- [Component names]

**Backend Endpoints**:
- [API endpoints]

**Strapi Content-Types**:
- [Content-Type names]

**Dependencies**:
- [Blocking tasks]

### Resources
- [Figma link]
- [API documentation]
- [Related PR]
---
### Bug Report Template:
## [BUG] - [Brief description]

**Environment**: [Development/Staging/Production]
**Browser**: [Chrome/Firefox/Safari]
**Priority**: [CRITICAL/HIGH/MEDIUM/LOW]

### Bug Description
[What happens vs what should happen]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Evidence
[Screenshots/GIFs/Logs]

### Expected Behavior
[What should happen instead]

---
## Címke (Label) Rendszer
### Prioritás címkék:

- `priority:critical` - Blokkoló issue-k, azonnali megoldás szükséges
    
- `priority:high` - Fontos funkciók, következő sprintben kell
    
- `priority:medium` - Normál prioritású taskok
    
- `priority:low` - Nice-to-have feature-ök
    

### Technológiai címkék:

- `tech:frontend` - Frontend related task
    
- `tech:backend` - Backend/Strapi task
    
- `tech:design` - Design/Figma task
    
- `tech:api` - API integráció
    
- `tech:stripe` - Fizetés related
    

### Típus címkék:

- `type:feature` - Új funkcionalitás
    
- `type:bug` - Bug javítás
    
- `type:refactor` - Code refactor
    
- `type:documentation` - Dokumentáció
    
- `type:testing` - Tesztelés

---
## Daily Standup Struktúra
### Napi update template:
## Standup - [Name] - [Date]

### Yesterday
- [Task ID] - [Status]
- [Task ID] - [Status]

### Today  
- [Task ID] - [Plan]
- [Task ID] - [Plan]

### Blockers
- [Blocker description]
- [Help needed from?]

---
## Sprint Review Checklist
### Sprint Záró Template:
## Sprint [Number] Review - [Date]

### Completed
- [Task ID] - [Brief description]
- [Task ID] - [Brief description]

### Carry Over
- [Task ID] - [Reason for carry over]

### Metrics
- **Completed Story Points**: [X]/[Y]
- **Burndown Rate**: [Z]%
- **Blockers Resolved**: [Number]

### Next Sprint Focus
- [Main focus area 1]
- [Main focus area 2]

---
