'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getProfileImprovementSuggestions, type ProfileImprovementSuggestionsOutput } from '@/ai/flows/profile-improvement-suggestions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, ThumbsUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  skillsDescription: z.string().min(50, { message: "Please describe your skills in at least 50 characters." }).max(1000),
});

type FormData = z.infer<typeof formSchema>;

export default function AiAssistantSection() {
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillsDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const result: ProfileImprovementSuggestionsOutput = await getProfileImprovementSuggestions({
        skillsDescription: data.skillsDescription,
      });
      setSuggestions(result.suggestions);
      toast({
        title: "Suggestions Generated!",
        description: "AI has provided some tips to improve your profile.",
        action: <ThumbsUp className="text-green-500" />,
      });
    } catch (err) {
      console.error("AI Assistant Error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Generating Suggestions",
        description: errorMessage,
        action: <AlertTriangle className="text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-16 md:py-24 bg-secondary/20 rounded-lg shadow-inner">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center">
            <Sparkles className="mr-3 h-8 w-8 text-primary" />
            AI Profile <span className="text-primary ml-2">Assistant</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered suggestions to enhance your skills description and make your profile stand out!
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl bg-card">
          <CardHeader>
            <CardTitle>Boost Your Profile</CardTitle>
            <CardDescription>
              Enter your current skills description, and our AI will provide friendly tips focusing on trending skills and effective wording.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="skillsDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="skillsDescription" className="text-lg">Your Current Skills Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="skillsDescription"
                          placeholder="e.g., Proficient in React, Node.js, and cloud technologies. Experienced in building full-stack applications..."
                          rows={6}
                          className="resize-none"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Suggestions
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {error && (
           <Alert variant="destructive" className="mt-8 max-w-2xl mx-auto">
             <AlertTriangle className="h-4 w-4" />
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>{error}</AlertDescription>
           </Alert>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="mt-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center">
              <Lightbulb className="mr-3 h-7 w-7 text-primary" />
              Here are some suggestions:
            </h3>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <Alert key={index} className="bg-accent/30 border-accent text-accent-foreground">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <AlertTitle className="font-semibold">Suggestion #{index + 1}</AlertTitle>
                  <AlertDescription>{suggestion}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
