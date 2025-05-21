'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, MapPin, ThumbsUp, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Contact Form Data:", data);
    // Replace with actual form submission logic (e.g., API endpoint)
    
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
      action: <ThumbsUp className="text-green-500" />,
    });
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-xl bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
              <CardDescription>I&apos;m excited to hear from you.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <FormControl>
                          <Input id="name" placeholder="John Doe" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" placeholder="john.doe@example.com" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message">Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            id="message"
                            placeholder="Hi, I'd like to discuss..."
                            rows={5}
                            className="resize-none"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full shadow-md" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Send className="mr-2 h-4 w-4 animate-pulse" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MapPin className="mr-3 h-6 w-6 text-primary" /> My Location
                </CardTitle>
                <CardDescription>
                  This is a placeholder for an interactive map.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center p-4 text-center">
                  <div>
                    <Image 
                      src="https://placehold.co/600x338.png" 
                      alt="Map placeholder" 
                      width={600} 
                      height={338} 
                      className="rounded-md shadow-md"
                      data-ai-hint="city map" 
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      An interactive map (e.g., Google Maps) would be displayed here. This requires an API key and further setup.
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-semibold text-lg">City, Country</p>
                  <p className="text-muted-foreground">A more specific address could be here.</p>
                </div>
              </CardContent>
            </Card>
             <Card className="shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p><strong>Email:</strong> your.email@example.com</p>
                <p><strong>Phone:</strong> (Optional) +1 234 567 8900</p>
                <p>Open for freelance opportunities and collaborations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
