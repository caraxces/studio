import type { Skill, Project } from './types';
import { Code, Layers, Database, Wind, Palette, Rocket } from 'lucide-react';

export const skillsData: Skill[] = [
  { id: '1', name: 'TypeScript', level: 90, description: 'Building robust, scalable, and maintainable applications with static typing.', icon: Code },
  { id: '2', name: 'Next.js', level: 85, description: 'Developing high-performance, server-rendered React applications with modern features.', icon: Layers },
  { id: '3', name: 'React', level: 95, description: 'Crafting dynamic, interactive, and component-based user interfaces.', icon: Rocket },
  { id: '4', name: 'Node.js & Express', level: 80, description: 'Creating efficient and scalable backend services and APIs.', icon: Database },
  { id: '5', name: 'Tailwind CSS', level: 90, description: 'Rapidly designing beautiful, custom user interfaces with a utility-first approach.', icon: Wind },
  { id: '6', name: 'UI/UX Design', level: 75, description: 'Focusing on user-centered design principles and creating intuitive experiences.', icon: Palette },
];

export const projectsData: Project[] = [
  {
    id: 'p1',
    title: 'ProLaunch SaaS Platform',
    description: 'A comprehensive SaaS solution for product launches, featuring analytics, user management, and subscription billing. Built for scale and performance.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'SaaS dashboard',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'p2',
    title: 'ConnectSphere Social App',
    description: 'A mobile-first social networking application fostering community engagement with real-time chat, event scheduling, and content sharing.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'social media app',
    tags: ['React Native', 'Firebase', 'Node.js', 'GraphQL'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'p3',
    title: 'AI Content Generator',
    description: 'An intelligent content generation tool leveraging advanced AI models to create engaging marketing copy, blog posts, and creative stories.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'AI writing tool',
    tags: ['Python', 'FastAPI', 'GenAI', 'React', 'Docker'],
    repoUrl: '#',
  },
  {
    id: 'p4',
    title: 'EcoTrack Sustainability Hub',
    description: 'A platform for tracking and promoting sustainable practices, featuring data visualization, community challenges, and educational resources.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'eco friendly dashboard',
    tags: ['Vue.js', 'Django', 'Chart.js', 'Leaflet.js'],
    liveUrl: '#',
  },
];

export const professionalSummary = "Highly skilled and creative Full Stack Developer with 5+ years of experience in designing, developing, and deploying robust web applications. Passionate about leveraging modern technologies to build intuitive user experiences and solve complex problems. Proven ability to work in fast-paced environments and collaborate effectively with cross-functional teams to deliver high-quality software solutions."
