import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import { users, userProfiles, accessibilitySettings } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    const [newUser] = await db.insert(users).values({
      email,
      passwordHash,
      username,
      preferences: {}
    }).returning();

    await db.insert(userProfiles).values({
      userId: newUser.id,
      diagnosisTypes: [],
      sensoryPreferences: {},
      learningPreferences: {}
    });

    await db.insert(accessibilitySettings).values({
      userId: newUser.id
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, req.user.userId));
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, req.user.userId));
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        preferences: user.preferences
      },
      profile
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { username, preferences, profileData } = req.body;

    if (username || preferences) {
      await db.update(users)
        .set({ username, preferences })
        .where(eq(users.id, req.user.userId));
    }

    if (profileData) {
      await db.update(userProfiles)
        .set(profileData)
        .where(eq(userProfiles.userId, req.user.userId));
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
