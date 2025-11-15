import { create } from 'zustand';

export const useTasksStore = create((set) => ({
  tasks: [],
  filter: { status: null, category: null },
  
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(task => task.id === id ? { ...task, ...updates } : task)
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  
  setFilter: (filter) => set((state) => ({
    filter: { ...state.filter, ...filter }
  })),
}));
