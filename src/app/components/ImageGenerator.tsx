"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setImageUrl(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/replicate/flux", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok && data.output) {
        setImageUrl(data.output);
      } else {
        setError(data.error || "Failed to generate image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError("An error occurred while generating the image");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Image Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A serene landscape with mountains and a lake"
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Image"
            )}
          </Button>
        </form>
        {error && (
          <div className="mt-4 text-red-500">{error}</div>
        )}
        {imageUrl && (
          <div className="mt-6">
            <Image
              src={imageUrl}
              alt={prompt}
              width={512}
              height={512}
              className="rounded-lg"
            />
          </div>
        )}
      </Card>
    </div>
  );
} 