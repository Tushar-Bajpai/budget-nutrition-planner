export interface ValidatedInput {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  height: number;
  weight: number;
  activityLevel: "sedentary" | "light" | "moderate" | "very" | "extra";
  goal: "lose" | "maintain" | "gain";
  mealsPerDay: number;
  dietType:
    | "none"
    | "vegetarian"
    | "vegan"
    | "keto"
    | "paleo"
    | "mediterranean"
    | "gluten-free"
    | "dairy-free";
  allergens: string[];
  cuisines: string[];
  weeklyBudget: number;
  currency: "USD" | "EUR" | "GBP";
  prioritize: "nutrition" | "cost" | "balanced";
}

const validGenders = ["male", "female", "other"];
const validActivityLevels = ["sedentary", "light", "moderate", "very", "extra"];
const validGoals = ["lose", "maintain", "gain"];
const validDietTypes = [
  "none",
  "vegetarian",
  "vegan",
  "keto",
  "paleo",
  "mediterranean",
  "gluten-free",
  "dairy-free",
];
const validCurrencies = ["USD", "EUR", "GBP"];
const validPriorities = ["nutrition", "cost", "balanced"];

export function validatePlannerInput(
  data: unknown
):
  | { valid: true; data: ValidatedInput }
  | { valid: false; errors: string[] } {
  const errors: string[] = [];

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { valid: false, errors: ["Request body must be an object"] };
  }

  const d = data as Record<string, unknown>;

  if (typeof d.name !== "string" || d.name.trim().length === 0) {
    errors.push("Name is required");
  }

  if (typeof d.age !== "number" || !Number.isFinite(d.age) || d.age < 1 || d.age > 120) {
    errors.push("Age must be a number between 1 and 120");
  }

  if (typeof d.gender !== "string" || !validGenders.includes(d.gender)) {
    errors.push("Gender must be male, female, or other");
  }

  if (typeof d.height !== "number" || !Number.isFinite(d.height) || d.height < 50 || d.height > 300) {
    errors.push("Height must be a number between 50 and 300 cm");
  }

  if (typeof d.weight !== "number" || !Number.isFinite(d.weight) || d.weight < 20 || d.weight > 500) {
    errors.push("Weight must be a number between 20 and 500 kg");
  }

  if (typeof d.activityLevel !== "string" || !validActivityLevels.includes(d.activityLevel)) {
    errors.push("Activity level is invalid");
  }

  if (typeof d.goal !== "string" || !validGoals.includes(d.goal)) {
    errors.push("Goal must be lose, maintain, or gain");
  }

  if (
    typeof d.mealsPerDay !== "number" ||
    !Number.isInteger(d.mealsPerDay) ||
    d.mealsPerDay < 1 ||
    d.mealsPerDay > 6
  ) {
    errors.push("Meals per day must be an integer between 1 and 6");
  }

  if (typeof d.dietType !== "string" || !validDietTypes.includes(d.dietType)) {
    errors.push("Diet type is invalid");
  }

  if (!Array.isArray(d.allergens) || !d.allergens.every((item) => typeof item === "string")) {
    errors.push("Allergens must be an array of strings");
  }

  if (!Array.isArray(d.cuisines) || !d.cuisines.every((item) => typeof item === "string")) {
    errors.push("Cuisines must be an array of strings");
  }

  if (
    typeof d.weeklyBudget !== "number" ||
    !Number.isFinite(d.weeklyBudget) ||
    d.weeklyBudget <= 0
  ) {
    errors.push("Weekly budget must be a positive number");
  }

  if (typeof d.currency !== "string" || !validCurrencies.includes(d.currency)) {
    errors.push("Currency must be USD, EUR, or GBP");
  }

  if (typeof d.prioritize !== "string" || !validPriorities.includes(d.prioritize)) {
    errors.push("Prioritize must be nutrition, cost, or balanced");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  const validatedData: ValidatedInput = {
    name: (d.name as string).trim(),
    age: d.age as number,
    gender: d.gender as "male" | "female" | "other",
    height: d.height as number,
    weight: d.weight as number,
    activityLevel: d.activityLevel as "sedentary" | "light" | "moderate" | "very" | "extra",
    goal: d.goal as "lose" | "maintain" | "gain",
    mealsPerDay: d.mealsPerDay as number,
    dietType: d.dietType as
      | "none"
      | "vegetarian"
      | "vegan"
      | "keto"
      | "paleo"
      | "mediterranean"
      | "gluten-free"
      | "dairy-free",
    allergens: (d.allergens as string[]).map((item) => item.trim()).filter(Boolean),
    cuisines: (d.cuisines as string[]).map((item) => item.trim()).filter(Boolean),
    weeklyBudget: d.weeklyBudget as number,
    currency: d.currency as "USD" | "EUR" | "GBP",
    prioritize: d.prioritize as "nutrition" | "cost" | "balanced",
  };

  return {
    valid: true,
    data: validatedData,
  };
}