import Breadcrumbs from '../components/layout/Breadcrumbs';
import TaskList from '../components/planning/TaskList';
import { Calendar, Zap } from 'lucide-react';

const Planning = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <Calendar className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">Planning & Organization</h1>
          </div>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
            Manage your tasks and stay organized with energy-aware planning.
          </p>
        </div>

        <div className="max-w-4xl">
          <TaskList />
        </div>

        <div className="mt-12 max-w-4xl bg-purple-500/5 border border-purple-500/10 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-purple-500" />
            <h3 className="font-bold text-[var(--text-primary)] text-xl">Energy-Aware Planning</h3>
          </div>
          <ul className="space-y-3 text-[var(--text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Tag tasks with energy levels to plan your day effectively</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Schedule high-energy tasks when you're most alert</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Save low-energy tasks for when you need something easier</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Use categories to organize tasks by life area</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Planning;
