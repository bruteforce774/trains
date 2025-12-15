# Arrow Function Basics

## 1. Basic Structure

```tsx
const functionName = (parameters) => returnValue
//    ^^^^^^^^^^^^^   ^^^^^^^^^^    ^^^^^^^^^^^^
//    variable name   input         output
```

## 2. Parameters - When to use parentheses

```tsx
// NO parameters - MUST use ()
const sayHello = () => "Hello"

// ONE parameter - parentheses OPTIONAL
const double = x => x * 2
const double = (x) => x * 2  // both work, same thing

// MULTIPLE parameters - MUST use ()
const add = (a, b) => a + b
```

## 3. Function Body - Curly braces vs. no braces

**No braces = implicit return** (one expression only)
```tsx
const double = (x) => x * 2
// Automatically returns x * 2
```

**With braces = explicit return needed** (can have multiple statements)
```tsx
const double = (x) => {
  const result = x * 2
  return result  // MUST use 'return' keyword
}
```

## 4. Returning JSX

**Implicit return with parentheses** (common in React)
```tsx
const MyComponent = () => (
  <div>
    <h1>Hello</h1>
  </div>
)
// Parentheses let you write multi-line JSX
// Automatically returns the JSX
```

**Explicit return with braces** (when you need logic first)
```tsx
const MyComponent = () => {
  const name = "World"
  return (
    <div>
      <h1>Hello {name}</h1>
    </div>
  )
}
```

## 5. The `const` Assignment

```tsx
const myFunction = (x) => x * 2
//    ^^^^^^^^^^^
//    This creates a variable named 'myFunction'
//    that stores the arrow function
```

**Think of it as:**
```tsx
// Regular function
function myFunction(x) {
  return x * 2
}

// Arrow function stored in a const variable
const myFunction = (x) => x * 2
```

## 6. Common React Patterns

**Array mapping (implicit return):**
```tsx
{trains.map((train) => (
  <tr key={train.uuid}>
    <td>{train.name}</td>
  </tr>
))}
```

**Array mapping (explicit return):**
```tsx
{trains.map((train) => {
  const isLate = train.delay > 5
  return (
    <tr key={train.uuid} className={isLate ? 'red' : 'green'}>
      <td>{train.name}</td>
    </tr>
  )
})}
```

**Event handlers:**
```tsx
// Simple
<button onClick={() => console.log('clicked')}>Click</button>

// With parameter
<button onClick={() => handleDelete(train.uuid)}>Delete</button>

// Reference to existing function
<button onClick={handleClick}>Click</button>
```

## 7. Quick Reference Chart

| Syntax | When to use |
|--------|-------------|
| `() =>` | No parameters |
| `x =>` | One parameter (parens optional) |
| `(x, y) =>` | Multiple parameters |
| `=> value` | Single expression, auto-return |
| `=> (JSX)` | Multi-line JSX, auto-return |
| `=> { return value }` | Need logic before return |

## Common Mistakes

```tsx
// ❌ WRONG - braces without return
const double = (x) => { x * 2 }  // returns undefined!

// ✅ CORRECT
const double = (x) => x * 2       // implicit return
const double = (x) => { return x * 2 }  // explicit return

// ❌ WRONG - trying to return object without parens
const makeObj = () => { name: "Bob" }  // JavaScript thinks {} is a code block!

// ✅ CORRECT
const makeObj = () => ({ name: "Bob" })  // Wrap object in parens
```
