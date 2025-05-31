"use client";

import Image from "next/image";
import React from "react";
import Countdown from "react-countdown";

interface QuizHeaderProps {
  title: string;
  endTime: number;
  imageUrl: string;
  onTimeUp: () => void;
}

function QuizHeader({
  title,
  endTime,
  imageUrl,
  onTimeUp,
}: QuizHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image alt={title} width={60} height={60} src={imageUrl} />
        <h1 className="text-3xl font-bold text-primary drop-shadow">{title}</h1>
      </div>
      <Countdown
        date={endTime}
        onComplete={onTimeUp}
        renderer={({ minutes, seconds }) => (
          <span className="font-bold text-lg bg-muted px-4 py-1 rounded text-accent-foreground">
            {minutes}:{seconds}
          </span>
        )}
      />
    </div>
  );
}
export default React.memo(QuizHeader)