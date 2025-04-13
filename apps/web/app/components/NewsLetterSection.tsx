"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      console.log(`Subscribed with: ${email}`);
      setEmail("");
      alert("Thank you for subscribing! Check your inbox for updates.");
      // you could trigger a toast or modal confirmation here too
    }
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground px-4">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
        <p className="text-lg text-primary-foreground mb-8">
          Join our newsletter to get the latest quizzes, leaderboards, and coding tips straight to your inbox.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="py-7 px-5 bg-dark focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handleSubscribe}
            variant="secondary"
            className="min-w-full py-7 sm:w-auto flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Subscribe
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
