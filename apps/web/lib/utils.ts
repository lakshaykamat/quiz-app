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

export function getEnvironmentApiUrl(): string {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT as string;
  if (env === 'development') {
     return 'http://localhost:8000/api/v1';
  }
  return process.env.NEXT_PUBLIC_API_URL as string;
}