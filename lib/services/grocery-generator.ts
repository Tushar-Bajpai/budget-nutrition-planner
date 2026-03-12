import { Meal } from "@/lib/data/meals";
import { WeeklyPlan, DayPlan } from "@/lib/services/meal-recommender";

export interface GroceryItem {
  name: string;
  totalQuantity: string;
  unit: string;
  category: string;
  estimatedCost: number;
}

export interface GroceryList {
  items: GroceryItem[];
  totalCost: number;
}

export function generateGroceryList(weeklyPlan: WeeklyPlan): GroceryList {

      interface IngredientKey {
    name: string;
    unit: string;
    category: string;
  }

  const ingredientMap = new Map<string, { quantity: number; cost: number }>();

  const allMeals: Meal[] = [];
  for (const day of Object.values(weeklyPlan)) {
    const dayMeals: Meal[] = [day.breakfast, day.lunch, day.dinner, day.snack];
    allMeals.push(...dayMeals);
  }

    for (const meal of allMeals) {
    const costPerIngredient = meal.costPerServing / (meal.ingredients.length || 1);
    for (const ingredient of meal.ingredients) {
      const key = `${ingredient.name}|${ingredient.unit}|${ingredient.category}`;
      
      const quantity = parseFloat(ingredient.quantity) || 1;

      if (ingredientMap.has(key)) {
        const existing = ingredientMap.get(key)!;
        existing.quantity += quantity;
        existing.cost += costPerIngredient;
      } else {
        ingredientMap.set(key, {
          quantity,
          cost: costPerIngredient,
        });
      }
    }
  }

    const items: GroceryItem[] = Array.from(ingredientMap).map(([key, data]) => {
    const [name, unit, category] = key.split("|");
    
    return {
      name,
      totalQuantity: data.quantity.toString(),
      unit,
      category,
      estimatedCost: data.cost,
    };
  });

    const totalCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);

  return {
    items,
    totalCost,
  };
}