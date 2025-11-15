import Breadcrumbs from '../components/layout/Breadcrumbs';
import TaskList from '../components/planning/TaskList';

const Planning = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">📅</span>
          <h1 className="text-4xl font-bold text-gray-900">Planning & Organization</h1>
        </div>
        <p className="text-lg text-gray-600">
          Manage your tasks and stay organized with energy-aware planning
        </p>
      </div>

      <div className="max-w-4xl">
        <TaskList />
      </div>

      <div className="mt-8 max-w-4xl bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold text-purple-900 mb-2">⚡ Energy-Aware Planning</h3>
        <ul className="space-y-2 text-sm text-purple-800">
          <li>• Tag tasks with energy levels to plan your day effectively</li>
          <li>• Schedule high-energy tasks when you're most alert</li>
          <li>• Save low-energy tasks for when you need something easier</li>
          <li>• Use categories to organize tasks by life area</li>
        </ul>
      </div>
    </div>
  );
};

export default Planning;
