"use client";

import { type DayName, type MealPlanData } from "@/app/meal-plan/types";

interface PrintableMealPlanProps {
  mealPlanData: MealPlanData;
  currency?: string;
}

const orderedDays: DayName[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function formatCurrency(value: number, currency: string) {
  return `${currency}${value.toFixed(2)}`;
}

export function PrintableMealPlan({ mealPlanData, currency = "$" }: PrintableMealPlanProps) {
  const generatedOn = new Date().toLocaleDateString();

  return (
    <div className="print-only print-document">
      <header className="print-document-header">
        <p className="print-kicker">NutriBudget</p>
        <h1 className="print-document-title">Personalized Meal Plan</h1>
        <p className="print-document-subtitle">Generated on {generatedOn}</p>
      </header>

      <section className="print-section">
        <h2 className="print-section-title">Plan Summary</h2>
        <table className="print-table">
          <tbody>
            <tr>
              <th>Average Daily Calories</th>
              <td>{mealPlanData.totalCalories} kcal</td>
              <th>Target Daily Calories</th>
              <td>{mealPlanData.targetCalories} kcal</td>
            </tr>
            <tr>
              <th>Weekly Cost</th>
              <td>{formatCurrency(mealPlanData.totalCost, currency)}</td>
              <th>Weekly Budget</th>
              <td>{formatCurrency(mealPlanData.targetBudget, currency)}</td>
            </tr>
            <tr>
              <th>Protein</th>
              <td>{mealPlanData.macros.protein} g/day</td>
              <th>Carbohydrates</th>
              <td>{mealPlanData.macros.carbs} g/day</td>
            </tr>
            <tr>
              <th>Fat</th>
              <td>{mealPlanData.macros.fat} g/day</td>
              <th>Meals</th>
              <td>Breakfast, lunch, dinner, snack</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="print-section">
        <h2 className="print-section-title">Weekly Meal Schedule</h2>
        <table className="print-table print-schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
              <th>Snack</th>
              <th>Daily Calories</th>
              <th>Daily Cost</th>
            </tr>
          </thead>
          <tbody>
            {orderedDays.map((day) => {
              const meals = mealPlanData.weeklyPlan[day];
              const dayCalories =
                meals.breakfast.calories + meals.lunch.calories + meals.dinner.calories + meals.snack.calories;
              const dayCost = meals.breakfast.cost + meals.lunch.cost + meals.dinner.cost + meals.snack.cost;

              return (
                <tr key={day}>
                  <td>{day}</td>
                  <td>
                    <strong>{meals.breakfast.name}</strong>
                    <div className="print-muted">{meals.breakfast.calories} kcal, {meals.breakfast.prepTime} min</div>
                  </td>
                  <td>
                    <strong>{meals.lunch.name}</strong>
                    <div className="print-muted">{meals.lunch.calories} kcal, {meals.lunch.prepTime} min</div>
                  </td>
                  <td>
                    <strong>{meals.dinner.name}</strong>
                    <div className="print-muted">{meals.dinner.calories} kcal, {meals.dinner.prepTime} min</div>
                  </td>
                  <td>
                    <strong>{meals.snack.name}</strong>
                    <div className="print-muted">{meals.snack.calories} kcal, {meals.snack.prepTime} min</div>
                  </td>
                  <td>{dayCalories} kcal</td>
                  <td>{formatCurrency(dayCost, currency)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="print-section print-page-break">
        <h2 className="print-section-title">Grocery List</h2>
        <table className="print-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Estimated Cost</th>
            </tr>
          </thead>
          <tbody>
            {mealPlanData.groceryList.map((item) => (
              <tr key={`${item.name}-${item.quantity}-${item.category}`}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>{formatCurrency(item.estimatedCost, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
