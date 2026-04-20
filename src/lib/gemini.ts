import { GoogleGenAI, Type } from "@google/genai";
import { EmailData } from "./imap.js";
import { CategorizedEmail, MailMindData, Category } from "./types.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function processEmails(emails: EmailData[]): Promise<MailMindData> {
  if (!emails || emails.length === 0) {
    return { emails: [], scheduleItems: [] };
  }

  // To avoid maximum context limit for large snippets, truncate further
  const simplifiedEmails = emails.map(e => ({
    id: e.id,
    subject: e.subject,
    from: e.from,
    date: e.date,
    snippet: e.snippet.substring(0, 150)
  }));

  const prompt = `
    Analyze the following list of raw emails. 
    1. Categorize each email into exactly one of these categories: Appointments, Orders, School/Class, Private, Other.
    2. Provide a 1-sentence summary of each email.
    3. Read through all the emails and construct a comprehensive "Daily Schedule" array summarizing the user's agenda, appointments, and class times for the day. Extract the specific time, event title, detected location (physical or virtual), and a brief one-sentence summary for each entry.

    Raw Emails:
    ${JSON.stringify(simplifiedEmails, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scheduleItems: {
              type: Type.ARRAY,
              description: "The formatted summarized daily schedule entries.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  time: { type: Type.STRING },
                  title: { type: Type.STRING },
                  location: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  category: { type: Type.STRING, description: "Must be Appointments, Orders, School/Class, Private, or Other." }
                },
                required: ["id", "time", "title", "location", "summary", "category"]
              }
            },
            categorizedEmails: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  category: { 
                    type: Type.STRING,
                    description: "Must be Appointments, Orders, School/Class, Private, or Other."
                  },
                  summary: { type: Type.STRING }
                },
                required: ["id", "category", "summary"]
              }
            }
          },
          required: ["scheduleItems", "categorizedEmails"]
        }
      }
    });

    const outputText = response.text || "{}";
    const result = JSON.parse(outputText);

    // Map the results back to the original emails array
    const mappedEmails: CategorizedEmail[] = emails.map(email => {
      const gResult = result.categorizedEmails?.find((c: any) => c.id === email.id);
      return {
        ...email,
        category: (gResult?.category as Category) || 'Other',
        summary: gResult?.summary || email.snippet
      };
    });

    return {
      emails: mappedEmails,
      scheduleItems: result.scheduleItems || []
    };
  } catch (err) {
    console.error("Gemini AI failed to process emails", err);
    // Fallback: assign to Other
    return {
      emails: emails.map(e => ({ ...e, category: 'Other', summary: e.snippet })),
      scheduleItems: []
    };
  }
}
