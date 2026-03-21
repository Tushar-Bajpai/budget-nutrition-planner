# NutriBudget - Budget Nutrition Planner

NutriBudget is a Next.js web app that generates a personalized 7-day meal plan based on user profile, nutrition goals, diet preference, and weekly budget.

The app takes user inputs, calculates calorie targets, selects meals from a curated in-code meal dataset, builds a grocery list, and shows a complete weekly plan with nutrition and budget summaries.

## Project Highlights

- Personalized weekly meal planning
- Calorie target and macro estimation
- Budget-aware meal output
- Grocery list generation from selected meals
- Regenerate plan flow using the same user input
- Print and PDF export support from browser print flow
- Responsive UI built with reusable components

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19 + Tailwind CSS
- Components: Radix UI + custom UI components
- Validation: custom runtime validator for planner payload
- Analytics: Vercel Analytics
- Package manager: pnpm

## How It Works

1. User fills planner form on /planner.
2. Frontend sends POST request to /api/generate-plan.
3. API validates payload using planner input validator.
4. API calculates calorie targets and macro estimates.
5. API recommends meals from static meal data arrays.
6. API generates grocery list from selected meals.
7. Response is returned as JSON and stored in browser localStorage.
8. /meal-plan reads localStorage and renders the generated plan.

## Backend Overview

This project uses Next.js Route Handlers as backend endpoints.

- POST /api/generate-plan
  - validates request body
  - calculates calories
  - generates weekly meal plan
  - generates grocery list
  - returns formatted plan and summary data

- GET /api/ping
  - health-check endpoint returning status and timestamp

Important note:
- No database is currently connected.
- Meal data is static and stored in source code.


## API Reference

### POST /api/generate-plan

Request body fields:

- name
- age
- gender
- height
- weight
- activityLevel
- goal
- mealsPerDay
- dietType
- allergens
- cuisines
- weeklyBudget
- currency
- prioritize

Successful response includes:

- weeklyPlan (Monday to Sunday with breakfast, lunch, dinner, snack)
- groceryList
- totalCalories
- totalCost
- targetCalories
- targetBudget
- macros (protein, carbs, fat)

### GET /api/ping

Returns:

- status
- timestamp

## Directory Structure

```text
budget-nutrition-planner/
|-- app/
|   |-- api/
|   |   |-- generate-plan/
|   |   |   `-- route.ts
|   |   `-- ping/
|   |       `-- route.ts
|   |-- meal-plan/
|   |   |-- page.tsx
|   |   `-- types.ts
|   |-- planner/
|   |   |-- page.tsx
|   |   `-- types.ts
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|   |-- meal-plan/
|   |   |-- budget-summary.tsx
|   |   |-- day-meal-card.tsx
|   |   |-- meal-item.tsx
|   |   |-- meal-plan-header.tsx
|   |   |-- nutrition-summary.tsx
|   |   |-- printable-meal-plan.tsx
|   |   |-- regenerate-button.tsx
|   |   `-- weekly-meal-grid.tsx
|   |-- planner/
|   |   |-- budget-input.tsx
|   |   |-- calorie-calculator-preview.tsx
|   |   |-- diet-preference-selector.tsx
|   |   |-- generate-plan-button.tsx
|   |   |-- goal-selector.tsx
|   |   `-- user-profile-form.tsx
|   |-- sections/
|   |   |-- benefits-section.tsx
|   |   |-- cta-section.tsx
|   |   |-- features-section.tsx
|   |   |-- footer-section.tsx
|   |   |-- hero-section.tsx
|   |   |-- how-it-works-section.tsx
|   |   |-- problem-section.tsx
|   |   `-- solution-section.tsx
|   |-- ui/
|   |   `-- reusable UI components
|   |-- navbar.tsx
|   `-- theme-provider.tsx
|-- hooks/
|   |-- use-mobile.ts
|   |-- use-scroll-animation.ts
|   `-- use-toast.ts
|-- lib/
|   |-- data/
|   |   `-- meals.ts
|   |-- services/
|   |   |-- calorie-calculator.ts
|   |   |-- grocery-generator.ts
|   |   `-- meal-recommender.ts
|   |-- validators/
|   |   `-- planner-input.ts
|   `-- utils.ts
|-- public/
|   `-- images/
|-- styles/
|   `-- globals.css
|-- components.json
|-- next-env.d.ts
|-- next.config.mjs
|-- package.json
|-- pnpm-lock.yaml
|-- postcss.config.mjs
`-- tsconfig.json
```

## Getting Started

Prerequisites:

- Node.js 18+
- pnpm

Install and run:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

Build for production:

```bash
pnpm build
pnpm start
```

## Scripts

- pnpm dev: Start development server
- pnpm build: Build production bundle
- pnpm start: Start production server
- pnpm lint: Run lint checks

## Current Limitations

- No user authentication
- No server-side persistence
- No database-backed meal catalog
- Allergen and cuisine preferences are collected but not yet applied in recommendation logic

## Suggested Next Steps

- Add database for user accounts and saved meal plans
- Add auth for multi-device access
- Expand meal recommendation scoring by budget and priority
- Apply allergen and cuisine filters in recommendation service

## License

This project is provided as-is for learning and development use.
