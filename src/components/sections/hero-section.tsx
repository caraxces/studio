'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { professionalSummary } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const animationDelay = (index: number) => ({
    animationDelay: `${index * 150}ms`,
    opacity: 0, // Initial state for animation
  });

  return (
    <section id="hero" className="py-20 md:py-32 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${isVisible ? 'animate-fadeInUp' : ''}`}
              style={animationDelay(0)}
            >
              Hi, I&apos;m <span className="text-primary">Your Name</span>
            </h1>
            <p 
              className={`text-lg md:text-xl text-muted-foreground ${isVisible ? 'animate-fadeInUp' : ''}`}
              style={animationDelay(1)}
            >
              A Passionate Full Stack Developer
            </p>
            <p 
              className={`text-md text-foreground leading-relaxed ${isVisible ? 'animate-fadeInUp' : ''}`}
              style={animationDelay(2)}
            >
              {professionalSummary}
            </p>
            <div 
              className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'animate-fadeInUp' : ''}`}
              style={animationDelay(3)}
            >
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="#projects">
                  <Briefcase className="mr-2 h-5 w-5" /> View My Work
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-shadow">
                <Link href="#contact">
                  Contact Me <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div 
            className={`relative order-first md:order-last ${isVisible ? 'animate-fadeInUp' : ''}`}
            style={animationDelay(1)} // Delay image slightly less or same as title
          >
            <div className="aspect-square rounded-full overflow-hidden shadow-2xl border-4 border-primary/20 mx-auto w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <Image
                src="https://placehold.co/400x400.png"
                alt="Your Name - Professional Portrait"
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
                data-ai-hint="professional portrait"
              />
            </div>
             {/* Optional: decorative elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-accent/30 rounded-full filter blur-2xl opacity-70 -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-lg transform rotate-45 filter blur-2xl opacity-60 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
