import React, { useMemo } from "react";
import { formatRoutePath, sortRoutes } from "./utils/routeUtils";

/**
 * Generate routes using convention-based file structure
 * This function scans your project's folder structure and generates routes
 */
export function generateRoutes() {
  // This uses Vite's import.meta.glob to dynamically import route components
  const modules = import.meta.glob("/src/routes/**/Index.jsx");

  const routes = Object.keys(modules).map((path) => {
    // Convert file path to route path (e.g., "/src/routes/user/[id]/Index.jsx" → "/user/:id")
    const routePath = formatRoutePath(path);
    
    // Create lazy-loaded component
    const Component = React.lazy(() =>
      modules[path]().then((mod) => {
        // Support both default and named exports
        const namedExports = Object.keys(mod).filter((key) => key !== "default");
        const component = mod.default || mod[namedExports[0]];
        return { default: component };
      })
    );

    // Return route object for React Router
    return {
      path: routePath === "" ? "/" : `/${routePath.toLowerCase()}`,
      element: <Component />,
    };
  });

  // Sort routes by priority
  return sortRoutes(routes);
}

/**
 * React hook for consuming the routes in your application
 * Wraps generateRoutes in a useMemo to prevent unnecessary recalculations
 */
export function useFolderRoutes() {
  return useMemo(() => {
    return generateRoutes();
  }, []);
}