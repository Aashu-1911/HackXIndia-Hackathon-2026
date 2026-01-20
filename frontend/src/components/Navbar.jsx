import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Navigation Bar Component
 * Provides navigation across different pages based on auth role
 */
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => {
    return location.pathname === path
      ? 'bg-primary-900 text-white shadow-inner'
      : 'text-primary-100 hover:bg-primary-700 hover:text-white';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-800 shadow-md border-b border-primary-700">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to={user?.role === 'admin' ? "/" : "/map"} className="flex items-center gap-2 group">
              <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                 <span className="text-xl" role="img" aria-label="Hospital">🏥</span>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">HackX</span>
              <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-primary-900 text-primary-200 border border-primary-700">
                {user?.role === 'admin' ? 'Dashboard' : 'Map'}
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 lg:space-x-4">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive(
                      '/'
                    )}`}
                  >
                    Overview
                  </Link>
                )}
                
                <Link
                  to="/map"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive(
                    '/map'
                  )}`}
                >
                  Map View
                </Link>

                <div className="ml-4 flex items-center space-x-3 border-l border-primary-600 pl-4">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-medium text-white">
                      {user.name}
                    </span>
                    <span className="text-xs text-primary-300 capitalize">
                      {user.role}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-md text-primary-200 hover:bg-risk-600 hover:text-white transition-colors"
                    title="Logout"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                    '/login'
                  )}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(
                    '/register'
                  )}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
