'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate code comments from a list of browser tabs.
 *
 * - generateCodeComment - A function that takes an array of tab objects and returns a string of formatted code comments.
 * - GenerateCodeCommentInput - The input type for the generateCodeComment function, an array of tab objects.
 * - GenerateCodeCommentOutput - The return type for the generateCodeComment function, a string of formatted code comments.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TabSchema = z.object({
  id: z.string(),
  title: z.string().describe('The title of the browser tab.'),
  url: z.string().url().describe('The URL of the browser tab.'),
  favIconUrl: z.string().url(),
});

export type Tab = z.infer<typeof TabSchema>;

const GenerateCodeCommentInputSchema = z.array(TabSchema).describe('An array of browser tab objects, each containing a title and URL.');
export type GenerateCodeCommentInput = z.infer<typeof GenerateCodeCommentInputSchema>;

const GenerateCodeCommentOutputSchema = z.string().describe('A string containing formatted code comments representing the input tabs.');
export type GenerateCodeCommentOutput = z.infer<typeof GenerateCodeCommentOutputSchema>;

export async function generateCodeComment(input: GenerateCodeCommentInput): Promise<GenerateCodeCommentOutput> {
  return generateCodeCommentFlow(input);
}

const generateCodeCommentPrompt = ai.definePrompt({
  name: 'generateCodeCommentPrompt',
  input: {schema: GenerateCodeCommentInputSchema},
  output: {schema: GenerateCodeCommentOutputSchema},
  prompt: `You are a code documentation assistant.
  
  Given the following JSON list of browser tabs, generate a block of code comments.
  Each tab should be on its own line, formatted as a triple-slash comment like this:
  /// [Tab Title] - [URL]

  Here is the JSON data for the tabs:
  {{{json this}}}
  `,
});

const generateCodeCommentFlow = ai.defineFlow(
  {
    name: 'generateCodeCommentFlow',
    inputSchema: GenerateCodeCommentInputSchema,
    outputSchema: GenerateCodeCommentOutputSchema,
  },
  async input => {
    const {output} = await generateCodeCommentPrompt(input);
    return output!;
  }
);
