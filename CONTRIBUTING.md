# Contributing to SupplyBridge IL

Thank you for contributing to the B2B Trade Operating System for Israel. To maintain a high-quality, scalable codebase, we follow strict engineering disciplines.

## 🛠 Engineering Standards

### 1. The 60-Line Rule

* **Hard Limit**: No file should exceed 60 lines of code (LOC).


* **Responsibility**: Each file must have exactly ONE responsibility (e.g., a component renders only, a service handles logic only).


* **Enforcement**: This is enforced by ESLint. If a file grows too large, it must be refactored into smaller sub-components or hooks.



### 2. Tech Stack & Patterns

* **Language**: TypeScript (strict mode).


* **Framework**: Next.js App Router.


* **Validation**: Every API route and form must use **Zod** for runtime schema validation.


* **Logging**: Every meaningful event (orders, status changes, searches) must trigger an asynchronous, non-blocking log event.



## 🌿 Git Branching Strategy

We follow a structured branch model to ensure production stability:

* **`main`**: Production-only. Requires a PR, CI pass, and manual review.


* **`develop`**: The primary integration branch. All features merge here first.


* **`feature/[ticket]-[slug]`**: For new features.


* **`fix/[ticket]-[slug]`**: For bug fixes.



## 📝 Pull Request (PR) Requirements

All PRs must follow this format to be considered for review:

1. **Title**: `[TYPE] Short description (#ticket)` (e.g., `[FEAT] Add Cloudinary upload (#42)`).


2. **Description**: Must include what changed, why, and how to test.


3. **Checklist**:
   
* File length $\le$ 60 lines.

* No business logic in UI components.

* Zod validation is present for all inputs.

* Log events are wired correctly.

* `tsc --noEmit` and `npm test` pass locally.
  

## 🧪 Testing Policy

* **Unit Tests**: Use Jest for pure functions and logic.


* **Integration**: Test API routes using a mock MongoDB memory server.


* **Performance**: Any changes affecting the marketplace must be verified against our p95 < 500ms target.



---
