"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Activity, TrendingUp } from "lucide-react";

interface NutritionSummaryProps {
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  totalCalories: number;
  targetCalories: number;
}

const COLORS = {
  protein: "#3b82f6", // blue
  carbs: "#f59e0b",   // amber
  fat: "#ec4899",     // pink
};

export function NutritionSummary({ macros, totalCalories, targetCalories }: NutritionSummaryProps) {
  const chartData = [
    { name: "Protein", value: macros.protein * 4, grams: macros.protein, color: COLORS.protein },
    { name: "Carbs", value: macros.carbs * 4, grams: macros.carbs, color: COLORS.carbs },
    { name: "Fat", value: macros.fat * 9, grams: macros.fat, color: COLORS.fat },
  ];

  const totalMacroCalories = chartData.reduce((acc, item) => acc + item.value, 0);
  const caloriePercentage = Math.round((totalCalories / targetCalories) * 100);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Daily Nutrition Summary</h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Macro pie chart */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-popover text-popover-foreground text-xs rounded-lg px-3 py-2 shadow-lg border border-border">
                          <p className="font-semibold">{data.name}</p>
                          <p>{data.grams}g ({Math.round((data.value / totalMacroCalories) * 100)}%)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{totalCalories}</span>
              <span className="text-xs text-muted-foreground">kcal/day</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Macro breakdown cards */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Macro Breakdown (Avg/Day)</span>
          </div>

          {/* Protein */}
          <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-700">Protein</span>
              <span className="text-sm font-bold text-blue-700">{macros.protein}g</span>
            </div>
            <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((macros.protein / 150) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-blue-600 mt-1">{macros.protein * 4} kcal from protein</p>
          </div>

          {/* Carbs */}
          <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-amber-700">Carbohydrates</span>
              <span className="text-sm font-bold text-amber-700">{macros.carbs}g</span>
            </div>
            <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((macros.carbs / 300) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-amber-600 mt-1">{macros.carbs * 4} kcal from carbs</p>
          </div>

          {/* Fat */}
          <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-pink-700">Fat</span>
              <span className="text-sm font-bold text-pink-700">{macros.fat}g</span>
            </div>
            <div className="w-full h-2 bg-pink-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((macros.fat / 100) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-pink-600 mt-1">{macros.fat * 9} kcal from fat</p>
          </div>

          {/* Calorie target indicator */}
          <div className="mt-2 p-3 rounded-xl bg-muted border border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Calorie Target</span>
              <span className="font-bold text-foreground">{caloriePercentage}% of {targetCalories} kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
