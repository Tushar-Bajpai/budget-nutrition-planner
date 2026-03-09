"use client";

import { Wallet, ShoppingCart, TrendingDown, CheckCircle2 } from "lucide-react";
import { type GroceryItem } from "@/app/meal-plan/types";

interface BudgetSummaryProps {
  totalCost: number;
  targetBudget: number;
  groceryList: GroceryItem[];
  currency?: string;
}

export function BudgetSummary({ totalCost, targetBudget, groceryList, currency = "$" }: BudgetSummaryProps) {
  const savings = targetBudget - totalCost;
  const budgetPercentage = Math.round((totalCost / targetBudget) * 100);
  const isUnderBudget = totalCost <= targetBudget;

  // Group grocery items by category
  const groupedGroceries = groceryList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <Wallet className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Budget Summary</h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Budget overview */}
        <div className="flex-1">
          {/* Budget progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Weekly Budget Used</span>
              <span className="text-sm font-bold text-foreground">
                {currency}{totalCost.toFixed(2)} / {currency}{targetBudget.toFixed(2)}
              </span>
            </div>
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isUnderBudget ? "bg-primary" : "bg-destructive"
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {budgetPercentage}% of weekly budget
            </p>
          </div>

          {/* Savings card */}
          {isUnderBudget ? (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="p-2 rounded-full bg-primary/20">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  You save {currency}{savings.toFixed(2)} this week!
                </p>
                <p className="text-xs text-muted-foreground">
                  Your meal plan is {currency}{(savings / 7).toFixed(2)} under budget per day
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="p-2 rounded-full bg-destructive/20">
                <Wallet className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {currency}{Math.abs(savings).toFixed(2)} over budget
                </p>
                <p className="text-xs text-muted-foreground">
                  Consider adjusting portions or swapping ingredients
                </p>
              </div>
            </div>
          )}

          {/* Cost breakdown */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-secondary border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Cost per Day</p>
              <p className="text-lg font-bold text-foreground">{currency}{(totalCost / 7).toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Cost per Meal</p>
              <p className="text-lg font-bold text-foreground">{currency}{(totalCost / 28).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Grocery list preview */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Grocery List ({groceryList.length} items)</span>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-4 pr-2">
            {Object.entries(groupedGroceries).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {category}
                </h4>
                <div className="space-y-1.5">
                  {items.map((item, idx) => (
                    <div
                      key={`${category}-${idx}`}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        <span className="text-sm text-foreground">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{item.quantity}</span>
                        <span className="font-medium text-foreground">{currency}{item.estimatedCost.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
