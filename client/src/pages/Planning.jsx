import Breadcrumbs from '../components/layout/Breadcrumbs';
import TaskList from '../components/planning/TaskList';

const Planning = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumbs />
        
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📅</span>
            <h1 className="text-5xl font-bold text-gray-900">Planning & Organization</h1>
          </div>
          <p className="text-xl text-gray-600">
            Manage your tasks and stay organized with energy-aware planning
          </p>
        </div>

        <div className="max-w-4xl">
          <TaskList />
        </div>

        <div className="mt-8 max-w-4xl bg-purple-50 rounded-3xl p-8">
          <h3 className="font-bold text-purple-900 mb-4 text-xl">⚡ Energy-Aware Planning</h3>
          <ul className="space-y-3 text-purple-800">
            <li>• Tag tasks with energy levels to plan your day effectively</li>
            <li>• Schedule high-energy tasks when you're most alert</li>
            <li>• Save low-energy tasks for when you need something easier</li>
            <li>• Use categories to organize tasks by life area</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Planning;
