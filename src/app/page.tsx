import HeroSection from '@/components/sections/hero-section';
import SkillsSection from '@/components/sections/skills-section';
import ProjectsSection from '@/components/sections/projects-section';
import DataScrapingSection from '@/components/sections/DataScrapingSection';
import ImageProcessingSection from '@/components/sections/ImageProcessingSection';
import AiAssistantSection from '@/components/sections/ai-assistant-section';
import ContactSection from '@/components/sections/contact-section';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <HeroSection />
      <SkillsSection />
      <Separator className="my-8 md:my-12" />
      <ProjectsSection />
      <Separator className="my-8 md:my-12" />
      <DataScrapingSection />
      <Separator className="my-8 md:my-12" />
      <ImageProcessingSection />
      <Separator className="my-8 md:my-12" />
      <AiAssistantSection />
      <Separator className="my-8 md:my-12" />
      <ContactSection />
    </div>
  );
}
