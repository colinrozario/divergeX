import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { db } from '../db/index.js';
import { tasks, timelineEvents } from '../db/schema.js';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

const router = express.Router();

router.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const { status, category, startDate, endDate } = req.query;
    
    let query = db.select().from(tasks).where(eq(tasks.userId, req.user.userId));
    
    const allTasks = await query.orderBy(desc(tasks.priority), tasks.dueDate);

    let filtered = allTasks;
    if (status) filtered = filtered.filter(t => t.status === status);
    if (category) filtered = filtered.filter(t => t.category === category);
    if (startDate) filtered = filtered.filter(t => new Date(t.dueDate) >= new Date(startDate));
    if (endDate) filtered = filtered.filter(t => new Date(t.dueDate) <= new Date(endDate));

    res.json(filtered);
  } catch (error) {
    console.error('Fetch tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/tasks', authenticateToken, async (req, res) => {
  try {
    const { title, description, dueDate, energyLevel, category, priority } = req.body;
    
    const [task] = await db.insert(tasks).values({
      userId: req.user.userId,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      energyLevel,
      category,
      priority: priority || 0,
      status: 'pending'
    }).returning();

    res.json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updates = req.body;
    
    const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId));
    
    if (!task || task.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const [updated] = await db.update(tasks)
      .set(updates)
      .where(eq(tasks.id, taskId))
      .returning();

    res.json(updated);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    
    const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId));
    
    if (!task || task.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.delete(tasks).where(eq(tasks.id, taskId));

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

router.get('/timeline', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = db.select().from(timelineEvents).where(eq(timelineEvents.userId, req.user.userId));
    
    const events = await query.orderBy(timelineEvents.startTime);

    res.json(events);
  } catch (error) {
    console.error('Fetch timeline error:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

router.post('/timeline/events', authenticateToken, async (req, res) => {
  try {
    const { taskId, startTime, endTime, color, reminders } = req.body;
    
    const [event] = await db.insert(timelineEvents).values({
      userId: req.user.userId,
      taskId: taskId || null,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      color,
      reminders: reminders || []
    }).returning();

    res.json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

export default router;
