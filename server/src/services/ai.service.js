import { GoogleGenAI } from '@google/genai';

// The client gets the API key from the environment variable `GEMINI_API_KEY`
const ai = new GoogleGenAI({});

export const analyzeTone = async (text, context = '') => {
  const prompt = `Analyze the emotional tone and social context of this message. Provide a neurodivergent-friendly interpretation.

Message: "${text}"
Context: ${context || 'General communication'}

Provide a JSON response with:
- tone: primary emotional tone (friendly, formal, anxious, confident, neutral, etc.)
- sentiment: positive, negative, or neutral
- socialContext: professional, casual, confrontational, supportive, etc.
- interpretation: clear explanation of the tone for someone who might struggle with social cues
- confidence: 0-100 score
- suggestions: array of tips for understanding or responding

Return ONLY valid JSON, no other text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    const responseText = response.text;
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      tone: 'neutral',
      sentiment: 'neutral',
      socialContext: 'general',
      interpretation: responseText,
      confidence: 50,
      suggestions: []
    };
  } catch (error) {
    console.error('Tone analysis error:', error);
    return {
      tone: 'neutral',
      sentiment: 'neutral',
      socialContext: 'general',
      interpretation: 'Unable to analyze tone at this time.',
      confidence: 0,
      suggestions: []
    };
  }
};

export const formatMessage = async (text, targetTone = 'professional') => {
  const prompt = `Improve this message for clarity and appropriate tone. Target tone: ${targetTone}

Original message: "${text}"

Provide a JSON response with:
- formattedMessage: the improved version
- changes: array of objects with {original, improved, reason}
- toneAdjustments: what was changed about the tone
- clarityImprovements: what was made clearer

Return ONLY valid JSON, no other text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    const responseText = response.text;
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      formattedMessage: text,
      changes: [],
      toneAdjustments: 'No changes needed',
      clarityImprovements: 'Message is clear'
    };
  } catch (error) {
    console.error('Message formatting error:', error);
    return {
      formattedMessage: text,
      changes: [],
      toneAdjustments: 'Unable to format message',
      clarityImprovements: 'Error occurred'
    };
  }
};

export const simulateConversation = async (scenario, userMessage, conversationHistory = []) => {
  const prompt = `You are simulating a ${scenario} conversation to help someone practice social interactions.

Conversation history:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User's message: "${userMessage}"

Provide a JSON response with:
- response: your reply in the conversation
- feedback: constructive feedback on the user's message
- socialCues: array of social cues present in the interaction
- suggestions: tips for improvement
- score: 0-100 rating of the response appropriateness

Return ONLY valid JSON, no other text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    const responseText = response.text;
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      response: 'I understand. Could you tell me more?',
      feedback: 'Good communication',
      socialCues: [],
      suggestions: [],
      score: 75
    };
  } catch (error) {
    console.error('Conversation simulation error:', error);
    return {
      response: 'I understand. Could you tell me more?',
      feedback: 'Unable to provide feedback',
      socialCues: [],
      suggestions: [],
      score: 0
    };
  }
};

export const simplifyText = async (text, targetLevel = 8) => {
  const prompt = `Simplify this text to a grade ${targetLevel} reading level. Break it into digestible chunks and highlight key concepts.

Text: "${text}"

Provide a JSON response with:
- simplifiedText: the simplified version
- chunks: array of text chunks (paragraphs)
- keyPoints: array of main ideas
- vocabulary: array of {word, definition} for complex terms
- readingLevel: estimated grade level as a NUMBER (e.g., 8, not "Grade 8")

Return ONLY valid JSON, no other text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    const responseText = response.text;
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      // Ensure readingLevel is a number
      if (parsed.readingLevel && typeof parsed.readingLevel === 'string') {
        parsed.readingLevel = parseInt(parsed.readingLevel.replace(/\D/g, '')) || targetLevel;
      }
      return parsed;
    }
    
    return {
      simplifiedText: text,
      chunks: [text],
      keyPoints: [],
      vocabulary: [],
      readingLevel: targetLevel
    };
  } catch (error) {
    console.error('Text simplification error:', error);
    return {
      simplifiedText: text,
      chunks: [text],
      keyPoints: [],
      vocabulary: [],
      readingLevel: targetLevel
    };
  }
};

export const generateVisualSummary = async (text) => {
  const prompt = `Create a structured outline and concept map data from this text:

"${text}"

Provide a JSON response with:
- outline: hierarchical structure with main topics and subtopics
- mindMap: {nodes: [{id, label, level}], edges: [{from, to}]}
- keyRelationships: array of concept connections
- summary: brief overview

Return ONLY valid JSON, no other text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    const responseText = response.text;
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      outline: [],
      mindMap: { nodes: [], edges: [] },
      keyRelationships: [],
      summary: text.substring(0, 200)
    };
  } catch (error) {
    console.error('Visual summary error:', error);
    return {
      outline: [],
      mindMap: { nodes: [], edges: [] },
      keyRelationships: [],
      summary: text.substring(0, 200)
    };
  }
};
