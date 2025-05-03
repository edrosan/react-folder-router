/**
 * Sort routes in priority order:
 * 1. Static routes first (e.g., "/about")
 * 2. Dynamic routes with params (e.g., "/user/:id")
 * 3. Catch-all routes last (e.g., "/*")
 */
export function sortRoutes(routes) {
  return routes.sort((a, b) => {
    // Catch-all routes go last
    if (a.path === "/*") return 1;
    if (b.path === "/*") return -1;
    
    // Dynamic routes with parameters
    const aIsDynamic = a.path.includes(":");
    const bIsDynamic = b.path.includes(":");
    
    if (aIsDynamic && !bIsDynamic) return 1;
    if (!aIsDynamic && bIsDynamic) return -1;
    
    // Sort by path segments (more specific routes first)
    return a.path.split("/").length - b.path.split("/").length;
  });
}

/**
 * Convert file path to route path
 * Examples:
 * - "/src/routes/Index.jsx" → "/"
 * - "/src/routes/about/Index.jsx" → "/about"
 * - "/src/routes/user/[id]/Index.jsx" → "/user/:id"
 * - "/src/routes/[...notFound]/Index.jsx" → "/*"
 */
export function formatRoutePath(path) {
  return path
    .replace(/^\/src\/routes\//, "")         // Remove base path
    .replace(/(?:^|\/)Index\.jsx$/, "")      // Remove Index.jsx
    .replace(/\[\.\.\.(\w+)\]/g, "*")        // [...param] → *
    .replace(/\[(\w+)\]/g, ":$1")            // [param] → :param
    .replace(/\/+/g, "/");                   // Fix double slashes
}