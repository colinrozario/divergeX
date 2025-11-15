import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { simplifyText, generateVisualSummary } from '../services/ai.service.js';
import { db } from '../db/index.js';
import { learningContent } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';

const router = express.Router();

router.post('/process-text', authenticateToken, async (req, res) => {
  try {
    const { text, readingLevel, domainType } = req.body;
    
    const processed = await simplifyText(text, readingLevel || 8);
    
    const [saved] = await db.insert(learningContent).values({
      userId: req.user.userId,
      originalContent: text,
      simplifiedContent: processed.simplifiedText,
      readingLevel: processed.readingLevel,
      domainType
    }).returning();

    res.json({ ...processed, id: saved.id });
  } catch (error) {
    console.error('Text processing error:', error);
    res.status(500).json({ error: 'Failed to process text' });
  }
});

router.post('/generate-visual-summary', authenticateToken, async (req, res) => {
  try {
    const { text, contentId } = req.body;
    
    const visual = await generateVisualSummary(text);
    
    if (contentId) {
      await db.update(learningContent)
        .set({ visualSummaryUrl: JSON.stringify(visual) })
        .where(eq(learningContent.id, contentId));
    }

    res.json(visual);
  } catch (error) {
    console.error('Visual summary error:', error);
    res.status(500).json({ error: 'Failed to generate visual summary' });
  }
});

router.get('/learning-history', authenticateToken, async (req, res) => {
  try {
    const history = await db.select()
      .from(learningContent)
      .where(eq(learningContent.userId, req.user.userId))
      .orderBy(desc(learningContent.createdAt))
      .limit(20);

    res.json(history);
  } catch (error) {
    console.error('Fetch history error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.get('/content/:id', authenticateToken, async (req, res) => {
  try {
    const [content] = await db.select()
      .from(learningContent)
      .where(eq(learningContent.id, parseInt(req.params.id)));

    if (!content || content.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Fetch content error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

export default router;
