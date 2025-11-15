import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../../services/api';
import { useTasksStore } from '../../store/tasksStore';
import { useToast } from '../shared/ToastContainer';
import Card from '../shared/Card';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmptyState from '../shared/EmptyState';

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
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[level] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700'
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
          <h2 className="text-2xl font-bold text-gray-900">📋 Task Manager</h2>
          <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
            {showForm ? '✕ Cancel' : '+ Add New Task'}
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
          {[
            { value: 'all', label: 'All Tasks', count: tasks.length },
            { value: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
            { value: 'in-progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length },
            { value: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                filter === tab.value
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Task Form */}
        {showForm && (
          <form onSubmit={handleCreateTask} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200 space-y-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Create New Task</h3>
            
            <div>
              <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                id="task-title"
                type="text"
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-visible-ring"
              />
            </div>
            
            <div>
              <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="task-description"
                placeholder="Add more details..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-visible-ring"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="task-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  id="task-date"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-visible-ring"
                />
              </div>

              <div>
                <label htmlFor="task-energy" className="block text-sm font-medium text-gray-700 mb-1">
                  Energy Level
                </label>
                <select
                  id="task-energy"
                  value={newTask.energyLevel}
                  onChange={(e) => setNewTask({ ...newTask, energyLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-visible-ring"
                >
                  <option value="low">🟢 Low Energy</option>
                  <option value="medium">🟡 Medium Energy</option>
                  <option value="high">🔴 High Energy</option>
                </select>
              </div>

              <div>
                <label htmlFor="task-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="task-category"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-visible-ring"
                >
                  <option value="personal">👤 Personal</option>
                  <option value="work">💼 Work</option>
                  <option value="health">❤️ Health</option>
                  <option value="social">👥 Social</option>
                </select>
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
              icon={filter === 'completed' ? '🎉' : '📝'}
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
                className={`bg-white border-2 rounded-xl p-5 hover:shadow-lg transition-all ${
                  task.status === 'completed' ? 'opacity-75' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={(e) => handleStatusChange(task.id, e.target.checked ? 'completed' : 'pending')}
                        className="mt-1 w-5 h-5 text-blue-600 rounded focus-visible-ring"
                        aria-label={`Mark ${task.title} as ${task.status === 'completed' ? 'incomplete' : 'complete'}`}
                      />
                      <div className="flex-1">
                        <h4 className={`font-semibold text-gray-900 text-lg ${task.status === 'completed' ? 'line-through' : ''}`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEnergyColor(task.energyLevel)}`}>
                            {task.energyLevel === 'low' ? '🟢' : task.energyLevel === 'medium' ? '🟡' : '🔴'} {task.energyLevel} energy
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            {task.category === 'personal' ? '👤' : task.category === 'work' ? '💼' : task.category === 'health' ? '❤️' : '👥'} {task.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          {task.dueDate && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                              📅 {new Date(task.dueDate).toLocaleDateString()}
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus-visible-ring bg-white"
                      aria-label="Change task status"
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="in-progress">🔄 In Progress</option>
                      <option value="completed">✅ Completed</option>
                    </select>
                    
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors border border-red-200 hover:border-red-300"
                      aria-label="Delete task"
                    >
                      🗑️ Delete
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
