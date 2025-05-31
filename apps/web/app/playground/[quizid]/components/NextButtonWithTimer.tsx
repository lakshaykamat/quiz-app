"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function NextButtonWithTimer({
  onNext,
  duration = 5000,
  label = "Next",
}: {
  onNext: () => void;
  duration?: number;
  label?: string;
}) {
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let current = 100;
    clearInterval(timerRef.current as NodeJS.Timeout);

    timerRef.current = setInterval(() => {
      current -= 100 / (duration / 100);
      setProgress(current);
      if (current <= 0) {
        clearInterval(timerRef.current as NodeJS.Timeout);
        onNext();
      }
    }, 100);

    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, [onNext, duration]);

  return (
    <div className="space-y-2 mt-6">
      {/* <Progress value={progress} className="h-2" /> */}
      <Button onClick={onNext} className="w-full">
        {label}
      </Button>
    </div>
  );
}
