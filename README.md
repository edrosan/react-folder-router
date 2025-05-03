# react-folder-router
=======
# React Folder Router 🗂️➡️🚪

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![npm version](https://img.shields.io/npm/v/react-folder-router.svg)](https://www.npmjs.com/package/react-folder-router)

A file-system based router for React that automatically generates React Router v6+ routes from your folder structure.  
Note: Requires `react-router-dom` as a peer dependency.

## Key Features
- ✅ Zero-config: convention-over-configuration
- 🔥 Static, dynamic (`[param]`), and catch-all (`[...all]`) routes
- 🚀 Built-in lazy loading for each page component
- 🎯 Automatic route priority sorting
- 📁 Uses your `src/routes/` folder structure

## Installation

```bash
npm install react-folder-router react-router-dom
# or
yarn add react-folder-router react-router-dom
```

## Basic Usage

```jsx
import { Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useFolderRoutes } from "react-folder-router"

export default function App() {
  const routes = useFolderRoutes()

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

## Folder Structure Convention

Place your page components under `src/routes/`, following these rules:

```
src/
└── routes/
    ├── Index.jsx              -> `/`
    ├── about/
    │   └── Index.jsx          -> `/about`
    ├── blog/
    │   ├── Index.jsx          -> `/blog`
    │   └── [slug]/            -> `/blog/:slug`
    │       └── Index.jsx
    ├── user/
    │   └── [id]/              -> `/user/:id`
    │       └── Index.jsx
    └── [...notFound]/         -> Catch-all `/*`
        └── Index.jsx
```

## Naming Rules

- `Index.jsx` files define route components  
- Folder names become path segments  
- `[paramName]` folder → `:paramName` dynamic route  
- `[...wildcard]` folder → `*` catch-all route

## Route Priority

Routes are automatically sorted in this order:
1. Static routes (e.g., `/about`)
2. Dynamic routes with parameters (e.g., `/user/:id`)
3. Catch-all routes (e.g., `/*`)

## Examples

### Home Page

```jsx
// src/routes/Index.jsx
export default function Home() {
  return <h1>Home Page</h1>
}
```

### Dynamic User Page

```jsx
// src/routes/user/[id]/Index.jsx
import { useParams } from "react-router-dom"

export default function User() {
  const { id } = useParams()
  return <h1>User ID: {id}</h1>
}
```

### 404 Page

```jsx
// src/routes/[...404]/Index.jsx
export default function NotFound() {
  return <h1>404 — Page Not Found</h1>
}
```

## License

MIT © edrosan

