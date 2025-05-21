export interface Skill {
  id: string;
  name: string;
  level: number; // Percentage 0-100
  description?: string;
  icon?: React.ElementType; // Optional: Lucide icon component
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAiHint?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}
