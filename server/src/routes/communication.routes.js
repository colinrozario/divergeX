import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { analyzeTone, formatMessage, simulateConversation } from '../services/ai.service.js';
import { db } from '../db/index.js';
import { communicationHistory, conversationSimulations } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';

const router = express.Router();

router.post('/analyze-tone', authenticateToken, async (req, res) => {
  try {
    const { text, context } = req.body;
    
    const analysis = await analyzeTone(text, context);
    
    await db.insert(communicationHistory).values({
      userId: req.user.userId,
      originalText: text,
      analyzedTone: analysis,
      context
    });

    res.json(analysis);
  } catch (error) {
    console.error('Tone analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze tone' });
  }
});

router.post('/format-message', authenticateToken, async (req, res) => {
  try {
    const { text, targetTone } = req.body;
    
    const formatted = await formatMessage(text, targetTone);
    
    await db.insert(communicationHistory).values({
      userId: req.user.userId,
      originalText: text,
      formattedMessage: formatted.formattedMessage,
      context: targetTone
    });

    res.json(formatted);
  } catch (error) {
    console.error('Message formatting error:', error);
    res.status(500).json({ error: 'Failed to format message' });
  }
});

router.post('/simulate-conversation', authenticateToken, async (req, res) => {
  try {
    const { scenario, message, conversationHistory: history } = req.body;
    
    const simulation = await simulateConversation(scenario, message, history || []);
    
    res.json(simulation);
  } catch (error) {
    console.error('Conversation simulation error:', error);
    res.status(500).json({ error: 'Failed to simulate conversation' });
  }
});

router.post('/save-conversation', authenticateToken, async (req, res) => {
  try {
    const { scenarioType, conversationData, feedback, difficultyLevel } = req.body;
    
    await db.insert(conversationSimulations).values({
      userId: req.user.userId,
      scenarioType,
      conversationData,
      feedback,
      difficultyLevel,
      completedAt: new Date()
    });

    res.json({ message: 'Conversation saved successfully' });
  } catch (error) {
    console.error('Save conversation error:', error);
    res.status(500).json({ error: 'Failed to save conversation' });
  }
});

router.get('/conversation-history', authenticateToken, async (req, res) => {
  try {
    const history = await db.select()
      .from(conversationSimulations)
      .where(eq(conversationSimulations.userId, req.user.userId))
      .orderBy(desc(conversationSimulations.completedAt))
      .limit(20);

    res.json(history);
  } catch (error) {
    console.error('Fetch history error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

export default router;
