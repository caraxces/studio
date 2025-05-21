'use server';

/**
 * @fileOverview A profile improvement suggestion AI agent.
 *
 * - getProfileImprovementSuggestions - A function that handles the profile improvement suggestion process.
 * - ProfileImprovementSuggestionsInput - The input type for the getProfileImprovementSuggestions function.
 * - ProfileImprovementSuggestionsOutput - The return type for the getProfileImprovementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileImprovementSuggestionsInputSchema = z.object({
  skillsDescription: z
    .string()
    .describe('The current description of skills in the profile.'),
});
export type ProfileImprovementSuggestionsInput = z.infer<
  typeof ProfileImprovementSuggestionsInputSchema
>;

const ProfileImprovementSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('Suggestions to improve the profile, focusing on trending skills and effective wording.'),
});
export type ProfileImprovementSuggestionsOutput = z.infer<
  typeof ProfileImprovementSuggestionsOutputSchema
>;

export async function getProfileImprovementSuggestions(
  input: ProfileImprovementSuggestionsInput
): Promise<ProfileImprovementSuggestionsOutput> {
  return profileImprovementSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'profileImprovementSuggestionsPrompt',
  input: {schema: ProfileImprovementSuggestionsInputSchema},
  output: {schema: ProfileImprovementSuggestionsOutputSchema},
  prompt: `You are a profile enhancement assistant. Analyze the skills and descriptions provided and suggest improvements, focusing on trending skills and effective wording.

Skills Description: {{{skillsDescription}}}

Provide suggestions to improve the profile's appeal, phrased as friendly suggestions.`,
});

const profileImprovementSuggestionsFlow = ai.defineFlow(
  {
    name: 'profileImprovementSuggestionsFlow',
    inputSchema: ProfileImprovementSuggestionsInputSchema,
    outputSchema: ProfileImprovementSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
