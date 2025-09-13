/**
 * @fileoverview This file defines a client-side function for interacting with the AI flow.
 */

import { GenerateCodeCommentInput, GenerateCodeCommentOutput } from "./flows/generate-code-comment";

// The default port for the Genkit developer UI is 4000
const GENKIT_API_URL = 'http://localhost:4000/api/flows/generateCodeCommentFlow';

export async function generateCodeComment(input: GenerateCodeCommentInput): Promise<GenerateCodeCommentOutput> {
  try {
    const response = await fetch(GENKIT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    // The actual output is nested in the 'output' property of the response
    return result.output;
  } catch (error) {
    console.error('Failed to generate code comment:', error);
    // Return an empty string or a specific error message
    return "// An error occurred while generating comments.";
  }
}
