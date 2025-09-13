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

const GenerateCodeCommentInputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the browser tab.'),
    url: z.string().url().describe('The URL of the browser tab.'),
  })
).describe('An array of browser tab objects, each containing a title and URL.');

export type GenerateCodeCommentInput = z.infer<typeof GenerateCodeCommentInputSchema>;

const GenerateCodeCommentOutputSchema = z.string().describe('A string containing formatted code comments representing the input tabs.');
export type GenerateCodeCommentOutput = z.infer<typeof GenerateCodeCommentOutputSchema>;

export async function generateCodeComment(input: GenerateCodeCommentInput): Promise<GenerateCodeCommentOutput> {
  const result = await generateCodeCommentFlow(input);
  if (result === null) {
    return "";
  }
  return result;
}

const generateCodeCommentPrompt = ai.definePrompt({
  name: 'generateCodeCommentPrompt',
  input: {schema: z.string()},
  output: {schema: GenerateCodeCommentOutputSchema},
  prompt: `You are a code documentation assistant.
  
  Given the following list of browser tabs, generate a block of code comments.
  Each tab should be on its own line, formatted as a triple-slash comment like this:
  /// [Tab Title] - [URL]

  Here is the data for the tabs:
  {{input}}
  `,
});

const generateCodeCommentFlow = ai.defineFlow(
  {
    name: 'generateCodeCommentFlow',
    inputSchema: GenerateCodeCommentInputSchema,
    outputSchema: GenerateCodeCommentOutputSchema,
  },
  async (tabs) => {
    // Format the tabs into a simple string to pass to the prompt
    const formattedTabs = tabs.map(tab => `Title: ${tab.title}, URL: ${tab.url}`).join('\n');
    const result = await generateCodeCommentPrompt(formattedTabs);
    // Handle the case where the result from the prompt is null
    if (result === null) {
        return "";
    }
    return result;
  }
);
