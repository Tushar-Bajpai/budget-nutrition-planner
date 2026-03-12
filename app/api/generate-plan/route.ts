import { NextResponse } from "next/server";
import { type Meal } from "@/lib/data/meals";
import { validatePlannerInput } from "@/lib/validators/planner-input";
import { calculateCalories } from "@/lib/services/calorie-calculator";
import { recommendMeals } from "@/lib/services/meal-recommender";
import { generateGroceryList } from "@/lib/services/grocery-generator";

function formatMeal(meal: Meal) {
  return {
    name: meal.name,
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fat: meal.fat,
    cost: meal.costPerServing,
    prepTime: meal.prepTime,
  };
}

export async function POST(request: Request) {
      let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: ["Invalid JSON in request body"] },
      { status: 400 }
    );
  }
    const result = validatePlannerInput(body);

  if (!result.valid) {
    return NextResponse.json(
      { errors: result.errors },
      { status: 400 }
    );
  }
    
  const input = result.data;

  // Step 1: Calculate calorie targets
  const calorieResult = calculateCalories(input);

  // Step 2: Recommend meals for the week
  const recommendationResult = recommendMeals(input, calorieResult);

  // Step 3: Generate grocery list from the meals
  const groceryList = generateGroceryList(recommendationResult.weeklyPlan);

  const formattedWeeklyPlan = Object.fromEntries(
    Object.entries(recommendationResult.weeklyPlan).map(([day, meals]) => [
      day,
      {
        breakfast: formatMeal(meals.breakfast),
        lunch: formatMeal(meals.lunch),
        dinner: formatMeal(meals.dinner),
        snack: formatMeal(meals.snack),
      },
    ])
  );

  const formattedGroceryList = groceryList.items.map((item) => ({
    name: item.name,
    quantity: `${item.totalQuantity} ${item.unit}`.trim(),
    category: item.category,
    estimatedCost: item.estimatedCost,
  }));

  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  for (const day of Object.values(recommendationResult.weeklyPlan)) {
    const meals = [day.breakfast, day.lunch, day.dinner, day.snack];
    for (const meal of meals) {
      totalProtein += meal.protein;
      totalCarbs += meal.carbs;
      totalFat += meal.fat;
    }
  }

  // Step 4: Build the complete response
  return NextResponse.json({
    weeklyPlan: formattedWeeklyPlan,
    groceryList: formattedGroceryList,
    totalCalories: Math.round(recommendationResult.totalCalories / 7),
    totalCost: Math.round(recommendationResult.totalCost * 100) / 100,
    targetCalories: calorieResult.target,
    targetBudget: input.weeklyBudget,
    macros: {
      protein: Math.round(totalProtein / 7),
      carbs: Math.round(totalCarbs / 7),
      fat: Math.round(totalFat / 7),
    },
  });
}