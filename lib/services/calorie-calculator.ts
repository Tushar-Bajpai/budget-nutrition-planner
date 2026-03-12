import { ValidatedInput } from "@/lib/validators/planner-input";

export interface CalorieResult {
  bmr: number;
  tdee: number;
  target: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function calculateCalories(input: ValidatedInput): CalorieResult {
      const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9,
  };

    let bmr: number;
  if (input.gender === "male") {
    bmr = 88.362 + 13.397 * input.weight + 4.799 * input.height - 5.677 * input.age;
  } else {
    bmr = 447.593 + 9.247 * input.weight + 3.098 * input.height - 4.330 * input.age;
  }

    const tdee = bmr * (activityMultipliers[input.activityLevel] ?? 1.2);

      const goalAdjustments: Record<string, number> = {
    lose: -500,
    maintain: 0,
    gain: 300,
  };

  const target = tdee + (goalAdjustments[input.goal] ?? 0);
  const protein = Math.round((target * 0.30) / 4);
  const carbs   = Math.round((target * 0.45) / 4);
  const fat     = Math.round((target * 0.25) / 9);

    return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    target: Math.round(target),
    protein,
    carbs,
    fat,
  };
}