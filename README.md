# NutriBudget — Budget Nutrition Planner

A modern web application that generates personalized meal plans tailored to your nutritional goals and weekly budget. Plan your meals smartly, eat well, and spend less.

## 🎯 Features

- **Personalized Meal Plans**: Generate customized 7-day meal plans based on your dietary preferences and goals
- **Budget-Friendly**: Set your weekly budget and get meals within your price range
- **Calorie Tracking**: Automatic calorie calculations based on your profile (age, gender, weight, height, activity level)
- **Dietary Preferences**: Support for multiple diet types:
  - Standard
  - Vegetarian
  - Vegan
  - Keto
  - Paleo
  - Mediterranean
  - Gluten-free
  - Dairy-free
- **Nutrition Summary**: Detailed breakdown of macronutrients (protein, carbs, fats)
- **Grocery List**: Auto-generated, consolidated grocery list from your meal plan
- **Export Options**: Print or export your meal plan as PDF
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (headless components)
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React hooks (useState, useEffect)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm

## 📁 Project Structure
budget-nutrition-planner/
├── app/
│ ├── api/
│ │ ├── generate-plan/ # Main meal plan generation endpoint
│ │ └── ping/ # Health check endpoint
│ ├── planner/ # Meal planner form page
│ ├── meal-plan/ # Generated meal plan display page
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Landing page
│ └── globals.css
├── components/
│ ├── planner/ # Form components (profile, goals, preferences, budget)
│ ├── meal-plan/ # Meal plan display components
│ ├── sections/ # Landing page sections (hero, features, CTA, etc.)
│ └── ui/ # Reusable UI components (buttons, cards, dialogs, etc.)
├── hooks/
│ ├── use-mobile.ts # Mobile detection hook
│ ├── use-scroll-animation.ts # Scroll animation hook
│ └── use-toast.ts # Toast notification hook
├── lib/
│ ├── data/
│ │ └── meals.ts # Static meal database
│ ├── services/
│ │ ├── calorie-calculator.ts # Calorie and TDEE calculations
│ │ ├── meal-recommender.ts # Meal selection algorithm
│ │ └── grocery-generator.ts # Grocery list generation
│ ├── validators/
│ │ └── planner-input.ts # Input validation with Zod
│ └── utils.ts # Utility functions
├── public/ # Static assets
├── styles/ # Global styles
├── package.json
├── next.config.mjs
├── tsconfig.json
└── README.md

Install dependencies:
Run the development server:
Open http://localhost:3000 in your browser
Build for production:
📖 How It Works
1. User Profile Setup
Fill in your personal information:

Name, age, gender
Height and weight
Activity level (sedentary to extra active)
Fitness goal (lose, maintain, or gain weight)
Meal preferences (meals per day, diet type)
Weekly budget and currency
2. Calorie Calculation
The app calculates:

BMR (Basal Metabolic Rate): Using Mifflin-St Jeor formula
TDEE (Total Daily Energy Expenditure): Based on activity multiplier
Target Calories: Adjusted for your goal (deficit, maintenance, or surplus)
Macro Split: Protein (30%), Carbs (45%), Fat (25%)
3. Meal Plan Generation
The algorithm:

Filters meals based on your dietary preferences
Selects diverse meals for each day (to avoid repetition)
Ensures meals fit within your weekly budget
Generates a complete 7-day meal schedule
4. Grocery List
Automatically aggregates ingredients from all meals:

Combines quantities for duplicate items
Groups by category (produce, protein, dairy, grains, pantry)
Calculates estimated costs
Ready to use for shopping
🔌 API Endpoints
POST /api/generate-plan
Generates a personalized meal plan.

Request Body:

Response:

GET /api/ping
Health check endpoint.

Response:

💾 Data Storage
Currently, the application uses browser localStorage to store generated meal plans:

generatedMealPlan: The latest generated meal plan
lastPlannerInput: The user's last form inputs for quick regeneration
Plans are not persisted on the server — they're only stored locally in the user's browser.

🔮 Future Enhancements
Planned Features
 User authentication and accounts
 Persistent meal plan storage on backend database
 Save favorite meals and meals
 Edit generated meal plans
 Allergen and cuisine filtering (currently accepted but not used)
 Weekly meal plan regeneration
 Shopping list sharing
 Meal prep instructions
 Recipe details with step-by-step instructions
 Nutrition tracking dashboard
 Integrated grocery ordering
Database Integration
To add user accounts and persistent storage:

Database: PostgreSQL (or MongoDB)
ORM: Prisma or Drizzle
Authentication: NextAuth.js
📝 Development Notes
Form Validation
Input validation happens at two levels:

Client-side: Using React Hook Form with Zod schemas
Server-side: Validated again in /api/generate-plan route
Meal Database
Meals are stored as static arrays in meals.ts. Each meal includes:

Nutritional info (calories, protein, carbs, fat)
Cost per serving
Preparation time
Ingredients with quantities
Diet tags for filtering
Styling
The project uses:

Tailwind CSS for utility-first styling
CSS variables for theme customization
Support for light/dark modes via next-themes
🐛 Known Limitations
No user accounts — plans are stored only in browser localStorage
No meal preferences beyond diet type (allergens/cuisines collected but not filtered)
Meals are pre-defined; no dynamic meal database
No real-time cost updates; prices are hardcoded
No integration with actual grocery stores
📄 License
This project is open source and available under the MIT License.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📧 Contact & Support
For questions or feedback, please open an issue on the GitHub repository.

Built with ❤️ using Next.js and Tailwind CSS
