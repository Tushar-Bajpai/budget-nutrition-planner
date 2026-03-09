"use client";

import { User, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { type PlannerFormData } from "@/app/planner/types";

interface UserProfileFormProps {
  data: PlannerFormData;
  onChange: (updates: Partial<PlannerFormData>) => void;
}

const activityLevels = [
  { value: "sedentary", label: "Sedentary (little to no exercise)" },
  { value: "light", label: "Lightly Active (1-3 days/week)" },
  { value: "moderate", label: "Moderately Active (3-5 days/week)" },
  { value: "very", label: "Very Active (6-7 days/week)" },
  { value: "extra", label: "Extra Active (physical job or 2x training)" },
];

export function UserProfileForm({ data, onChange }: UserProfileFormProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
          1
        </div>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Your Profile</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="e.g. Alex Johnson"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="h-11 rounded-xl border-border bg-background focus-visible:ring-primary"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="age" className="text-sm font-medium text-foreground">
            Age <span className="text-muted-foreground">(years)</span>
          </Label>
          <Input
            id="age"
            type="number"
            min={10}
            max={100}
            placeholder="25"
            value={data.age || ""}
            onChange={(e) => onChange({ age: Number(e.target.value) })}
            className="h-11 rounded-xl border-border bg-background focus-visible:ring-primary"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-foreground">Gender</Label>
          <div className="flex gap-2">
            {(["male", "female", "other"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChange({ gender: g })}
                className={`flex-1 h-11 rounded-xl border text-sm font-medium capitalize transition-all duration-150 ${
                  data.gender === g
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Height */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="height" className="text-sm font-medium text-foreground">
            Height <span className="text-muted-foreground">(cm)</span>
          </Label>
          <Input
            id="height"
            type="number"
            min={100}
            max={250}
            placeholder="170"
            value={data.height || ""}
            onChange={(e) => onChange({ height: Number(e.target.value) })}
            className="h-11 rounded-xl border-border bg-background focus-visible:ring-primary"
          />
        </div>

        {/* Weight */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="weight" className="text-sm font-medium text-foreground">
            Weight <span className="text-muted-foreground">(kg)</span>
          </Label>
          <Input
            id="weight"
            type="number"
            min={30}
            max={300}
            placeholder="70"
            value={data.weight || ""}
            onChange={(e) => onChange({ weight: Number(e.target.value) })}
            className="h-11 rounded-xl border-border bg-background focus-visible:ring-primary"
          />
        </div>

        {/* Activity Level */}
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="activity" className="text-sm font-medium text-foreground">
            Activity Level
          </Label>
          <div className="relative">
            <select
              id="activity"
              value={data.activityLevel}
              onChange={(e) => onChange({ activityLevel: e.target.value as PlannerFormData["activityLevel"] })}
              className="w-full h-11 pl-4 pr-10 rounded-xl border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
            >
              <option value="">Select activity level...</option>
              {activityLevels.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
