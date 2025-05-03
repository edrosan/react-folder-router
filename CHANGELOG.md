# Changelog

All notable changes to the `react-folder-router` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-05-03

### Added
- Initial release of react-folder-router
- File-system based route generation
- Support for static routes (`/about`)
- Support for dynamic routes with parameters (`/user/[id]`)
- Support for catch-all routes (`[...404]`)
- Automatic route priority sorting
- Built-in lazy loading for page components
- Support for nested routes

### Dependencies
- Requires React Router DOM v6+ as peer dependency