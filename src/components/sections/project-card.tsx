import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary relative bg-card">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint={project.imageAiHint || 'project image'}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <CardTitle className="text-2xl font-semibold text-primary group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed min-h-[4.5em] line-clamp-3">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-3">
        {project.repoUrl && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </Button>
        )}
        {project.liveUrl && (
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
