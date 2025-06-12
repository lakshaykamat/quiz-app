import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDifficulty(n:number){
  if(n <= 0) return "Easy";
  if(n <= 1) return "Medium";
  if(n <= 2) return "Hard";
  return "Unknown";
}