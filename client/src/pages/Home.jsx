import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/shared/Button';

const Home = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24">
        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden">
          {/* Main Content */}
          <div className="px-8 sm:px-16 lg:px-24 pt-20 pb-16 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Manage Your<br />Funds Effortlessly
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Spaces are like personal buckets in your app. Give them names and visuals to make them yours, and set aside cash for anything you need
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              {!isAuthenticated ? (
                <Link to="/register">
                  <Button variant="dark" size="lg" className="rounded-full px-8 min-w-[160px]">
                    Apply Now
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button variant="dark" size="lg" className="rounded-full px-8 min-w-[160px]">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
            
            <p className="text-sm text-gray-500">
              Master your money with award-winning banking on your phone.
            </p>
          </div>

          {/* Features Section */}
          <div className="px-8 sm:px-16 lg:px-24 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-[32px] overflow-hidden aspect-[4/3] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <span className="text-6xl">💬</span>
                    </div>
                    <p className="text-gray-600 font-medium">Communication Tools</p>
                  </div>
                </div>
              </div>

              {/* Right: Features List */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-700">Instant alerts</span>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-700">Bills management</span>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-700">Virtual cards</span>
                </div>

                {/* Money Card */}
                <div className="relative mt-8">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-white shadow-2xl">
                    <p className="text-sm text-gray-400 mb-2">Money in</p>
                    <p className="text-4xl font-bold mb-4">$ 5,129.86</p>
                    <div className="inline-block bg-lime-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                      +2.51%
                    </div>
                    <p className="text-xs text-gray-400">Receive $ 1,990 this month</p>
                  </div>
                  
                  {/* Decorative cubes */}
                  <div className="absolute -bottom-4 -right-4 flex gap-2">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg transform rotate-12"></div>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg transform -rotate-6"></div>
                    <div className="w-12 h-12 bg-lime-400 rounded-lg"></div>
                    <div className="w-12 h-12 bg-gray-300 rounded-lg transform rotate-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        {isAuthenticated && (
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Link to="/communication" className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Communication</h3>
              <p className="text-gray-600">Analyze tone and format messages effectively</p>
            </Link>

            <Link to="/learning" className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Learning</h3>
              <p className="text-gray-600">Simplify complex text and visual summaries</p>
            </Link>

            <Link to="/planning" className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600">Manage tasks and build timelines</p>
            </Link>
          </div>
        )}

        {/* CTA Section */}
        {!isAuthenticated && (
          <div className="mt-16 bg-white rounded-3xl p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join DivergeX today and experience tools designed with neurodivergent individuals in mind.
            </p>
            <Link to="/register">
              <Button variant="dark" size="lg" className="rounded-full px-8">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

