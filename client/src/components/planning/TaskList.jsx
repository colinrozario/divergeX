import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/api';
import { useTasksStore } from '../../store/tasksStore';
import { useToast } from '../shared/ToastContainer';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';
import { ClipboardList, Plus, X, Calendar, Zap, User, Briefcase, Heart, Users, Trash2, CheckCircle, Circle, Clock, CheckSquare } from 'lucide-react';

const TaskList = () => {
  const { tasks, setTasks, addTask, updateTask: updateStoreTask, deleteTask: deleteStoreTask } = useTasksStore();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const toast = useToast();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    energyLevel: 'medium',
    category: 'personal',
    priority: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask(newTask);
      addTask(response.data);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        energyLevel: 'medium',
        category: 'personal',
        priority: 0
      });
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      updateStoreTask(taskId, { status: newStatus });
      if (newStatus === 'completed') {
        toast.success('Task completed! 🎉');
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(taskId);
      deleteStoreTask(taskId);
      toast.success('Task deleted');
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  const getEnergyColor = (level) => {
    const colors = {
      low: 'bg-green-500/10 text-green-600 border-green-500/20',
      medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      high: 'bg-red-500/10 text-red-600 border-red-500/20'
    };
    return colors[level] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
      'in-progress': 'bg-blue-500/10 text-blue-600',
      completed: 'bg-green-500/10 text-green-600'
    };
    return colors[status] || colors.pending;
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <Card>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Task Manager</h2>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto flex items-center gap-2">
            {showForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add New Task</>}
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-[var(--border-subtle)] overflow-x-auto pb-1">
          {[
            { value: 'all', label: 'All Tasks', count: tasks.length },
            { value: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
            { value: 'in-progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length },
            { value: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${filter === tab.value
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Task Form */}
        {showForm && (
          <form onSubmit={handleCreateTask} className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-6 rounded-xl border-2 border-blue-500/20 space-y-4 animate-fade-in">
            <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-4">Create New Task</h3>

            <div>
              <label htmlFor="task-title" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Task Title *
              </label>
              <input
                id="task-title"
                type="text"
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
              />
            </div>

            <div>
              <label htmlFor="task-description" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Description (Optional)
              </label>
              <textarea
                id="task-description"
                placeholder="Add more details..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="task-date" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Due Date
                </label>
                <input
                  id="task-date"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label htmlFor="task-energy" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Energy Level
                </label>
                <div className="relative">
                  <select
                    id="task-energy"
                    value={newTask.energyLevel}
                    onChange={(e) => setNewTask({ ...newTask, energyLevel: e.target.value })}
                    className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-[var(--text-primary)] appearance-none"
                  >
                    <option value="low">Low Energy</option>
                    <option value="medium">Medium Energy</option>
                    <option value="high">High Energy</option>
                  </select>
                  <Zap className="absolute right-3 top-2.5 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="task-category" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    id="task-category"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-[var(--text-primary)] appearance-none"
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="health">Health</option>
                    <option value="social">Social</option>
                  </select>
                  <Briefcase className="absolute right-3 top-2.5 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">Create Task</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <EmptyState
              icon={filter === 'completed' ? <CheckCircle className="w-12 h-12 text-[var(--text-tertiary)]" /> : <ClipboardList className="w-12 h-12 text-[var(--text-tertiary)]" />}
              title={filter === 'completed' ? 'No completed tasks yet' : 'No tasks found'}
              description={
                filter === 'all'
                  ? 'Create your first task to get started with planning!'
                  : `You don't have any ${filter} tasks at the moment.`
              }
              action={
                !showForm && filter === 'all' && (
                  <Button onClick={() => setShowForm(true)}>Create Your First Task</Button>
                )
              }
            />
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-[var(--bg-secondary)] border-2 border-[var(--border-subtle)] rounded-xl p-5 hover:shadow-lg transition-all ${task.status === 'completed' ? 'opacity-75' : ''
                  }`}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                        className={`mt-1 transition-colors ${task.status === 'completed' ? 'text-green-500' : 'text-[var(--text-tertiary)] hover:text-blue-500'}`}
                      >
                        {task.status === 'completed' ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </button>

                      <div className="flex-1">
                        <h4 className={`font-semibold text-[var(--text-primary)] text-lg ${task.status === 'completed' ? 'line-through text-[var(--text-tertiary)]' : ''}`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-[var(--text-secondary)] mt-1">{task.description}</p>
                        )}
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getEnergyColor(task.energyLevel)}`}>
                            <Zap className="w-3 h-3" /> {task.energyLevel} energy
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 border border-blue-500/20 flex items-center gap-1">
                            {task.category === 'personal' ? <User className="w-3 h-3" /> : task.category === 'work' ? <Briefcase className="w-3 h-3" /> : task.category === 'health' ? <Heart className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                            {task.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(task.status)}`}>
                            {task.status === 'completed' ? <CheckSquare className="w-3 h-3" /> : task.status === 'in-progress' ? <Clock className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                            {task.status}
                          </span>
                          {task.dueDate && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-600 border border-purple-500/20 flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="px-3 py-2 border border-[var(--border-default)] rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                      aria-label="Change task status"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-3 py-2 text-red-600 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors border border-red-500/20 hover:border-red-500/30 flex items-center justify-center gap-2"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskList;
