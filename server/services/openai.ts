import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export class OpenAIService {
  async summarizeLegalDocument(text: string): Promise<{ summary: string; keyPoints: string[]; legalArea: string }> {
    try {
      const prompt = `Analyze this legal document text and provide a comprehensive summary. Focus on:
1. Main legal points and clauses
2. Key obligations and rights
3. Important dates and deadlines
4. Legal implications
5. Area of law (property, criminal, civil, family, etc.)

Text to analyze:
${text}

Respond with JSON in this format:
{
  "summary": "Detailed summary of the document",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "legalArea": "property/criminal/civil/family/other"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a legal document analysis expert specializing in Indian law. Provide clear, accurate summaries of legal documents."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        summary: result.summary || "Unable to generate summary",
        keyPoints: result.keyPoints || [],
        legalArea: result.legalArea || "general"
      };
    } catch (error) {
      console.error('OpenAI summarization error:', error);
      throw new Error('Failed to summarize document: ' + (error as Error).message);
    }
  }

  async enhanceChatResponse(query: string, basicResponse: string): Promise<string> {
    try {
      const prompt = `As an AI legal assistant for Indian law, enhance this basic response to be more helpful and comprehensive.

User Query: ${query}
Basic Response: ${basicResponse}

Please enhance the response by:
1. Adding more specific details about Indian law
2. Including relevant legal provisions or acts
3. Providing step-by-step guidance where applicable
4. Adding important disclaimers
5. Keeping the tone professional but accessible

Provide only the enhanced response text, no JSON format needed.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an AI legal assistant specializing in Indian law. Provide accurate, helpful legal information while always recommending professional legal consultation for specific cases."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800
      });

      return response.choices[0].message.content || basicResponse;
    } catch (error) {
      console.error('OpenAI enhancement error:', error);
      // Return basic response if enhancement fails
      return basicResponse;
    }
  }

  async analyzeLegalQuery(query: string): Promise<{ category: string; complexity: string; suggestedActions: string[] }> {
    try {
      const prompt = `Analyze this legal query for an Indian law context:

Query: ${query}

Provide analysis in JSON format:
{
  "category": "property/criminal/civil/family/consumer/constitutional/other",
  "complexity": "simple/moderate/complex",
  "suggestedActions": ["Action 1", "Action 2", "Action 3"]
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a legal query analysis expert for Indian law. Categorize queries and suggest appropriate actions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 400
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        category: result.category || "general",
        complexity: result.complexity || "moderate",
        suggestedActions: result.suggestedActions || ["Consult with a lawyer", "Gather relevant documents", "Research applicable laws"]
      };
    } catch (error) {
      console.error('OpenAI query analysis error:', error);
      return {
        category: "general",
        complexity: "moderate",
        suggestedActions: ["Consult with a lawyer", "Gather relevant documents"]
      };
    }
  }
}

export const openAIService = new OpenAIService();
