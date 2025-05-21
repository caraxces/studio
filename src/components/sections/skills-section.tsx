import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skillsData } from '@/lib/data';
import { Lightbulb } from 'lucide-react';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-secondary/20 rounded-lg shadow-inner">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical expertise and abilities. I&apos;m constantly learning and expanding my skill set.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill) => (
            <Card key={skill.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl flex items-center">
                    {skill.icon && <skill.icon className="mr-3 h-6 w-6 text-primary" />}
                    {skill.name}
                  </CardTitle>
                  <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                </div>
                <Progress value={skill.level} aria-label={`${skill.name} proficiency ${skill.level}%`} className="h-3" />
              </CardHeader>
              <CardContent>
                {skill.description && (
                  <CardDescription className="text-sm text-muted-foreground min-h-[3em]">
                    {skill.description}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <p className="text-md text-muted-foreground italic">
             Looking for ways to improve my profile? Try the <a href="#ai-assistant" className="text-primary hover:underline">AI Profile Assistant</a> below!
           </p>
        </div>
      </div>
    </section>
  );
}
