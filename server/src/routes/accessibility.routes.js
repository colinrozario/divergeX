import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { db } from '../db/index.js';
import { accessibilitySettings } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.get('/settings', authenticateToken, async (req, res) => {
  try {
    const [settings] = await db.select()
      .from(accessibilitySettings)
      .where(eq(accessibilitySettings.userId, req.user.userId));

    res.json(settings || {
      theme: 'light',
      fontFamily: 'professional',
      fontSize: 100,
      motionReduced: false,
      highContrast: false,
      screenReaderMode: false
    });
  } catch (error) {
    console.error('Fetch settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/settings', authenticateToken, async (req, res) => {
  try {
    const updates = req.body;
    
    const [existing] = await db.select()
      .from(accessibilitySettings)
      .where(eq(accessibilitySettings.userId, req.user.userId));

    let result;
    if (existing) {
      [result] = await db.update(accessibilitySettings)
        .set(updates)
        .where(eq(accessibilitySettings.userId, req.user.userId))
        .returning();
    } else {
      [result] = await db.insert(accessibilitySettings)
        .values({ userId: req.user.userId, ...updates })
        .returning();
    }

    res.json(result);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
