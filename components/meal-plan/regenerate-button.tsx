"use client";

import { useState } from "react";
import { RefreshCw, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RegenerateButtonProps {
  onRegenerate?: () => void;
}

export function RegenerateButton({ onRegenerate }: RegenerateButtonProps) {
  const [loading, setLoading] = useState(false);

  function handleRegenerate() {
    setLoading(true);
    // Simulate regeneration
    setTimeout(() => {
      setLoading(false);
      onRegenerate?.();
    }, 2000);
  }

  return (
    <section className="py-10 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Not happy with this plan?</p>
              <p className="text-xs text-muted-foreground">Regenerate to get a new meal selection based on your preferences</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-border gap-2"
            >
              <Link href="/planner">
                <ArrowLeft className="w-4 h-4" />
                Edit Preferences
              </Link>
            </Button>
            <Button
              onClick={handleRegenerate}
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Plan
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
