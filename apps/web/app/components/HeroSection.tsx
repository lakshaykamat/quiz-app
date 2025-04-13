"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-neutral-950 to-neutral-700 text-white">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Test Your Skills. <br /> Elevate Your Knowledge.
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-300 max-w-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Take coding quizzes, challenge your friends, and track your progress in real-time.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button size="lg" className="text-base hover:bg-primary/80 bg-primary text-primary-foreground">
          <Sparkles className="mr-2 h-5 w-5" />
          Start Quiz
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="text-base bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          Learn More
        </Button>
      </motion.div>
    </section>
  );
}
