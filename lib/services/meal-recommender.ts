import { Meal, breakfasts, lunches, dinners, snacks } from "@/lib/data/meals";
import { CalorieResult } from "@/lib/services/calorie-calculator";
import { ValidatedInput } from "@/lib/validators/planner-input";

export interface DayPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
}

export interface WeeklyPlan {
  Monday: DayPlan;
  Tuesday: DayPlan;
  Wednesday: DayPlan;
  Thursday: DayPlan;
  Friday: DayPlan;
  Saturday: DayPlan;
  Sunday: DayPlan;
}

export interface RecommendationResult {
  weeklyPlan: WeeklyPlan;
  totalCalories: number;
  totalCost: number;
}

export function recommendMeals(
  input: ValidatedInput,
  calories: CalorieResult
): RecommendationResult {

      const dietType = input.dietType;

  function matchesDiet(meal: Meal): boolean {
    if (dietType === "none") return true;
    return meal.dietTags.includes(dietType);
  }

  const filteredBreakfasts = breakfasts.filter(matchesDiet);
  const filteredLunches    = lunches.filter(matchesDiet);
  const filteredDinners    = dinners.filter(matchesDiet);
  const filteredSnacks     = snacks.filter(matchesDiet);

  if (filteredBreakfasts.length === 0) filteredBreakfasts.push(...breakfasts);
  if (filteredLunches.length === 0)    filteredLunches.push(...lunches);
  if (filteredDinners.length === 0)    filteredDinners.push(...dinners);
  if (filteredSnacks.length === 0)     filteredSnacks.push(...snacks);

  const breakfastOffset = Math.floor(Math.random() * filteredBreakfasts.length);
  const lunchOffset = Math.floor(Math.random() * filteredLunches.length);
  const dinnerOffset = Math.floor(Math.random() * filteredDinners.length);
  const snackOffset = Math.floor(Math.random() * filteredSnacks.length);

    function pickMeal(pool: Meal[], dayIndex: number): Meal {
    return pool[dayIndex % pool.length];
  }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

  const weeklyPlan = {} as WeeklyPlan;

  for (let i = 0; i < 7; i++) {
    const day = days[i];
    weeklyPlan[day] = {
      breakfast: pickMeal(filteredBreakfasts, i + breakfastOffset),
      lunch:     pickMeal(filteredLunches, i + lunchOffset),
      dinner:    pickMeal(filteredDinners, i + dinnerOffset),
      snack:     pickMeal(filteredSnacks, i + snackOffset),
    };
  }

    let totalCalories = 0;
  let totalCost = 0;

  for (const day of Object.values(weeklyPlan)) {
    const meals = [day.breakfast, day.lunch, day.dinner, day.snack];
    for (const meal of meals) {
      totalCalories += meal.calories;
      totalCost += meal.costPerServing;
    }
  }

    return {
    weeklyPlan,
    totalCalories,
    totalCost,
  };
}

 