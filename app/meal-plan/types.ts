export interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cost: number;
  prepTime: number; // minutes
}

export interface DayMeal {
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
  snack: MealItem;
}

export type DayName = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface WeeklyMealPlan {
  [key: string]: DayMeal;
}

export interface GroceryItem {
  name: string;
  quantity: string;
  category: string;
  estimatedCost: number;
}

export interface MealPlanData {
  weeklyPlan: WeeklyMealPlan;
  groceryList: GroceryItem[];
  totalCalories: number;
  totalCost: number;
  targetCalories: number;
  targetBudget: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Sample meal data generator
export function generateSampleMealPlan(
  targetCalories: number,
  weeklyBudget: number,
  dietType: string
): MealPlanData {
  const days: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const breakfasts: MealItem[] = [
    { name: "Greek Yogurt Parfait", calories: 320, protein: 18, carbs: 42, fat: 8, cost: 2.50, prepTime: 5 },
    { name: "Oatmeal with Berries", calories: 290, protein: 8, carbs: 52, fat: 6, cost: 1.80, prepTime: 10 },
    { name: "Scrambled Eggs & Toast", calories: 380, protein: 22, carbs: 28, fat: 18, cost: 2.20, prepTime: 12 },
    { name: "Smoothie Bowl", calories: 350, protein: 12, carbs: 58, fat: 8, cost: 3.00, prepTime: 8 },
    { name: "Avocado Toast", calories: 340, protein: 10, carbs: 35, fat: 18, cost: 2.80, prepTime: 7 },
    { name: "Banana Pancakes", calories: 400, protein: 14, carbs: 62, fat: 12, cost: 2.00, prepTime: 15 },
    { name: "Overnight Oats", calories: 310, protein: 11, carbs: 48, fat: 9, cost: 1.60, prepTime: 5 },
  ];

  const lunches: MealItem[] = [
    { name: "Chicken Caesar Salad", calories: 420, protein: 35, carbs: 18, fat: 24, cost: 4.50, prepTime: 15 },
    { name: "Quinoa Buddha Bowl", calories: 480, protein: 18, carbs: 62, fat: 16, cost: 4.00, prepTime: 20 },
    { name: "Turkey Wrap", calories: 390, protein: 28, carbs: 38, fat: 14, cost: 3.80, prepTime: 10 },
    { name: "Lentil Soup & Bread", calories: 360, protein: 16, carbs: 52, fat: 8, cost: 2.50, prepTime: 25 },
    { name: "Tuna Sandwich", calories: 410, protein: 32, carbs: 36, fat: 16, cost: 3.20, prepTime: 8 },
    { name: "Veggie Stir Fry", calories: 380, protein: 14, carbs: 48, fat: 14, cost: 3.50, prepTime: 18 },
    { name: "Mediterranean Bowl", calories: 450, protein: 20, carbs: 52, fat: 18, cost: 4.20, prepTime: 15 },
  ];

  const dinners: MealItem[] = [
    { name: "Grilled Salmon & Rice", calories: 520, protein: 38, carbs: 42, fat: 20, cost: 6.50, prepTime: 25 },
    { name: "Chicken Stir Fry", calories: 480, protein: 36, carbs: 38, fat: 18, cost: 5.00, prepTime: 22 },
    { name: "Pasta Primavera", calories: 440, protein: 16, carbs: 68, fat: 12, cost: 3.80, prepTime: 20 },
    { name: "Beef Tacos", calories: 550, protein: 32, carbs: 42, fat: 26, cost: 5.50, prepTime: 25 },
    { name: "Baked Chicken & Veggies", calories: 460, protein: 40, carbs: 28, fat: 18, cost: 4.80, prepTime: 35 },
    { name: "Shrimp Fried Rice", calories: 490, protein: 28, carbs: 58, fat: 16, cost: 5.20, prepTime: 20 },
    { name: "Vegetable Curry", calories: 420, protein: 14, carbs: 56, fat: 16, cost: 4.00, prepTime: 30 },
  ];

  const snacks: MealItem[] = [
    { name: "Apple & Almond Butter", calories: 220, protein: 6, carbs: 26, fat: 12, cost: 1.50, prepTime: 2 },
    { name: "Trail Mix", calories: 180, protein: 5, carbs: 18, fat: 10, cost: 1.20, prepTime: 1 },
    { name: "Greek Yogurt", calories: 150, protein: 15, carbs: 12, fat: 4, cost: 1.00, prepTime: 1 },
    { name: "Hummus & Carrots", calories: 160, protein: 6, carbs: 20, fat: 6, cost: 1.30, prepTime: 3 },
    { name: "Protein Bar", calories: 200, protein: 20, carbs: 22, fat: 8, cost: 2.00, prepTime: 0 },
    { name: "Cheese & Crackers", calories: 190, protein: 8, carbs: 16, fat: 10, cost: 1.40, prepTime: 2 },
    { name: "Mixed Nuts", calories: 170, protein: 5, carbs: 8, fat: 14, cost: 1.10, prepTime: 0 },
  ];

  const weeklyPlan: WeeklyMealPlan = {};
  let totalCalories = 0;
  let totalCost = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  days.forEach((day, i) => {
    const dayMeal: DayMeal = {
      breakfast: breakfasts[i % breakfasts.length],
      lunch: lunches[i % lunches.length],
      dinner: dinners[i % dinners.length],
      snack: snacks[i % snacks.length],
    };
    weeklyPlan[day] = dayMeal;
    
    totalCalories += dayMeal.breakfast.calories + dayMeal.lunch.calories + dayMeal.dinner.calories + dayMeal.snack.calories;
    totalCost += dayMeal.breakfast.cost + dayMeal.lunch.cost + dayMeal.dinner.cost + dayMeal.snack.cost;
    totalProtein += dayMeal.breakfast.protein + dayMeal.lunch.protein + dayMeal.dinner.protein + dayMeal.snack.protein;
    totalCarbs += dayMeal.breakfast.carbs + dayMeal.lunch.carbs + dayMeal.dinner.carbs + dayMeal.snack.carbs;
    totalFat += dayMeal.breakfast.fat + dayMeal.lunch.fat + dayMeal.dinner.fat + dayMeal.snack.fat;
  });

  const groceryList: GroceryItem[] = [
    { name: "Chicken Breast", quantity: "2 lbs", category: "Protein", estimatedCost: 8.50 },
    { name: "Salmon Fillet", quantity: "1 lb", category: "Protein", estimatedCost: 10.00 },
    { name: "Eggs", quantity: "1 dozen", category: "Protein", estimatedCost: 4.00 },
    { name: "Greek Yogurt", quantity: "32 oz", category: "Dairy", estimatedCost: 5.50 },
    { name: "Rice", quantity: "2 lbs", category: "Grains", estimatedCost: 3.00 },
    { name: "Oats", quantity: "1 lb", category: "Grains", estimatedCost: 2.50 },
    { name: "Mixed Vegetables", quantity: "2 lbs", category: "Produce", estimatedCost: 5.00 },
    { name: "Bananas", quantity: "1 bunch", category: "Produce", estimatedCost: 1.50 },
    { name: "Berries", quantity: "1 lb", category: "Produce", estimatedCost: 4.00 },
    { name: "Avocados", quantity: "3 count", category: "Produce", estimatedCost: 4.50 },
    { name: "Olive Oil", quantity: "16 oz", category: "Pantry", estimatedCost: 6.00 },
    { name: "Almond Butter", quantity: "12 oz", category: "Pantry", estimatedCost: 5.00 },
  ];

  return {
    weeklyPlan,
    groceryList,
    totalCalories: Math.round(totalCalories / 7),
    totalCost: Math.round(totalCost * 100) / 100,
    targetCalories,
    targetBudget: weeklyBudget,
    macros: {
      protein: Math.round(totalProtein / 7),
      carbs: Math.round(totalCarbs / 7),
      fat: Math.round(totalFat / 7),
    },
  };
}
