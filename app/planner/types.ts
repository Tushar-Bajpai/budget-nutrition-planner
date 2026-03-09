export interface PlannerFormData {
  // Profile
  name: string;
  age: number;
  gender: "male" | "female" | "other" | "";
  height: number; // cm
  weight: number; // kg
  activityLevel: "sedentary" | "light" | "moderate" | "very" | "extra" | "";

  // Goal
  goal: "lose" | "maintain" | "gain" | "";
  mealsPerDay: number;

  // Diet
  dietType: "none" | "vegetarian" | "vegan" | "keto" | "paleo" | "mediterranean" | "gluten-free" | "dairy-free";
  allergens: string[];
  cuisines: string[];

  // Budget
  weeklyBudget: number;
  currency: "USD" | "EUR" | "GBP";
  prioritize: "nutrition" | "cost" | "balanced";
}

export const defaultFormData: PlannerFormData = {
  name: "",
  age: 0,
  gender: "",
  height: 0,
  weight: 0,
  activityLevel: "",
  goal: "",
  mealsPerDay: 3,
  dietType: "none",
  allergens: [],
  cuisines: [],
  weeklyBudget: 75,
  currency: "USD",
  prioritize: "balanced",
};

/** Harris-Benedict BMR → TDEE calculation */
export function calculateCalories(data: PlannerFormData): {
  bmr: number;
  tdee: number;
  target: number;
  protein: number;
  carbs: number;
  fat: number;
} {
  if (!data.age || !data.height || !data.weight || !data.gender || !data.activityLevel) {
    return { bmr: 0, tdee: 0, target: 0, protein: 0, carbs: 0, fat: 0 };
  }

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9,
  };

  let bmr: number;
  if (data.gender === "male") {
    bmr = 88.362 + 13.397 * data.weight + 4.799 * data.height - 5.677 * data.age;
  } else {
    bmr = 447.593 + 9.247 * data.weight + 3.098 * data.height - 4.330 * data.age;
  }

  const tdee = bmr * (activityMultipliers[data.activityLevel] ?? 1.2);

  const adjustments: Record<string, number> = {
    lose: -500,
    maintain: 0,
    gain: 300,
  };

  const target = tdee + (adjustments[data.goal] ?? 0);

  // Macro split (protein 30%, carbs 45%, fat 25%)
  const protein = Math.round((target * 0.30) / 4);
  const carbs = Math.round((target * 0.45) / 4);
  const fat = Math.round((target * 0.25) / 9);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    target: Math.round(target),
    protein,
    carbs,
    fat,
  };
}
