# React Patterns Reference

A guide to the core React patterns used in this project.

---

## 1. Component Structure

**Basic pattern:**
```tsx
import type { SomeType } from './types'

type ComponentProps = {
  propName: PropType
}

function ComponentName({ propName }: ComponentProps) {
  return (
    <div>
      {/* JSX here */}
    </div>
  )
}

export default ComponentName
```

**Key points:**
- Props are typed with TypeScript interfaces/types
- Props are destructured in the function parameters
- Components return JSX
- Default export for single component per file

---

## 2. Props - Data Flows Down

**Parent passes data to child:**

```tsx
// Parent (App.tsx)
function App() {
  const data = [/* array of items */]
  return <ChildComponent items={data} />
}

// Child component
type ChildProps = {
  items: ItemType[]
}

function ChildComponent({ items }: ChildProps) {
  // Use items here
}
```

**Props are read-only** - child components cannot modify them directly.

---

## 3. State Management with useState

**Pattern:**
```tsx
import { useState } from 'react'

function Component() {
  const [value, setValue] = useState<Type>(initialValue)

  // Update state
  setValue(newValue)
}
```

**With initializer function** (runs only once on mount):
```tsx
const [trains, setTrains] = useState<Train[]>(() => {
  // Complex initialization logic
  const stored = localStorage.getItem('trains')
  return stored ? JSON.parse(stored) : defaultData
})
```

**Key points:**
- State changes trigger component re-renders
- Never mutate state directly - always use setter function
- State is local to the component (unless passed down as props)

---

## 4. Callback Props - Events Flow Up

**Pattern for child to communicate with parent:**

```tsx
// Parent defines handler
function Parent() {
  const handleAction = (id: string) => {
    // Do something with id
  }

  return <Child onAction={handleAction} />
}

// Child receives and calls it
type ChildProps = {
  onAction: (id: string) => void  // Function type
}

function Child({ onAction }: ChildProps) {
  return (
    <button onClick={() => onAction(someId)}>
      Click me
    </button>
  )
}
```

**This is React's equivalent to Vue's `$emit`**

**Naming convention:** Callback props typically start with `on` (onDelete, onClick, onSubmit)

---

## 5. Mapping Arrays to JSX

**Pattern:**
```tsx
{array.map((item) => (
  <Element key={item.uniqueId}>
    {item.property}
  </Element>
))}
```

**Real example from Timetable:**
```tsx
{trains.map((train) => (
  <tr key={train.uuid}>
    <td>{train.trainIdent}</td>
    <td>{train.endStation}</td>
    <td>{train.arrival}</td>
  </tr>
))}
```

**Key points:**
- Always include `key` prop with unique identifier
- Use implicit return `() => ()` for simple JSX
- Use explicit return `() => { return (...) }` when logic is needed first

---

## 6. Event Handlers

**Inline arrow function** (when you need to pass parameters):
```tsx
<button onClick={() => handleDelete(train.uuid)}>
  Delete
</button>
```

**Direct reference** (when no parameters needed):
```tsx
<button onClick={handleClick}>
  Click
</button>
```

**Why the difference?**
- `onClick={handleClick}` - passes function reference
- `onClick={() => handleClick()}` - calls function immediately (wrong!)
- `onClick={() => handleClick(id)}` - creates function that calls with parameter (correct!)

---

## 7. localStorage Integration

**Pattern for persistent state:**

```tsx
const [data, setData] = useState<Type[]>(() => {
  // Load from localStorage or use default
  const stored = localStorage.getItem('key')
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem('key', JSON.stringify(defaultData))
  return defaultData
})

// When updating state, also update localStorage
const updateData = (newData: Type[]) => {
  setData(newData)
  localStorage.setItem('key', JSON.stringify(newData))
}
```

**Key points:**
- localStorage stores strings only - use `JSON.stringify/parse`
- Initialize state from localStorage on mount
- Keep localStorage in sync when state changes

---

## 8. Data Flow Architecture

```
┌─────────────────────────────────────┐
│           Parent (App)              │
│                                     │
│  - Manages state (useState)         │
│  - Defines handlers                 │
│  - Updates localStorage             │
│                                     │
│  Data ↓          Callbacks ↓        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         Child (Timetable)           │
│                                     │
│  - Receives data via props          │
│  - Displays data                    │
│  - Calls callbacks on user actions  │
│  - No state management              │
│                                     │
│          Events ↑                   │
└─────────────────────────────────────┘
```

**Principle:** Data flows down, events flow up

---

## 9. TypeScript Patterns

**Importing types:**
```tsx
import type { Train } from './types'  // Type-only import
```

**Typing props:**
```tsx
type ComponentProps = {
  data: DataType[]
  onAction: (id: string) => void
  optional?: string
}
```

**Typing state:**
```tsx
const [value, setValue] = useState<Type>(initial)
const [value, setValue] = useState<Type[]>([])
```

**Type assertions:**
```tsx
const data = importedData as Type[]
```

---

## 10. Common Patterns Summary

| Pattern | Purpose | Example |
|---------|---------|---------|
| Props | Pass data down | `<Child data={value} />` |
| Callback props | Pass events up | `<Child onDelete={handler} />` |
| useState | Manage component state | `const [x, setX] = useState(0)` |
| .map() | Render lists | `{items.map(item => <div>{item}</div>)}` |
| Arrow functions | Event handlers with params | `onClick={() => delete(id)}` |
| localStorage | Persist data | `localStorage.setItem/getItem` |

---

## Real Example: Delete Functionality

Putting it all together:

```tsx
// Parent (App.tsx)
function App() {
  // State with localStorage
  const [trains, setTrains] = useState<Train[]>(() => {
    const stored = localStorage.getItem('trains')
    return stored ? JSON.parse(stored) : defaultTrains
  })

  // Handler
  const handleDelete = (uuid: string) => {
    const updated = trains.filter(t => t.uuid !== uuid)
    setTrains(updated)
    localStorage.setItem('trains', JSON.stringify(updated))
  }

  // Pass data down, callback down
  return <Timetable trains={trains} onDelete={handleDelete} />
}

// Child (Timetable.tsx)
type TimetableProps = {
  trains: Train[]
  onDelete: (uuid: string) => void
}

function Timetable({ trains, onDelete }: TimetableProps) {
  return (
    <tbody>
      {trains.map(train => (
        <tr key={train.uuid}>
          <td>{train.trainIdent}</td>
          <td>
            <button onClick={() => onDelete(train.uuid)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
```

**Flow:**
1. User clicks delete button
2. `onDelete(train.uuid)` is called
3. This calls parent's `handleDelete(uuid)`
4. Parent filters trains array
5. Parent updates state with `setTrains`
6. Parent updates localStorage
7. Component re-renders with new data
8. Train is gone from UI

---

## Quick Reference

**When to use what:**
- **useState**: When data needs to change and trigger re-renders
- **Props**: To pass data or functions to child components
- **Callback props**: When child needs to notify parent of events
- **.map()**: To render arrays of data
- **Arrow functions in JSX**: When passing parameters to event handlers
- **localStorage**: When data should persist across page reloads
