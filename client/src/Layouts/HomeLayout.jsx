import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

function HomeLayout({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('access_token'));
      setUserRole(localStorage.getItem('role') || '');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  function hideDrawer() {
    const element = document.getElementsByClassName('drawer-toggle');
    element[0].checked = false;
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');

    window.dispatchEvent(new Event('storage'));

    navigate('/login');
  };

  return (
    <div data-theme="dark" className="min-h-[90vh]">
      {/* Drawer for Sidebar */}
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu size={'32px'} className="font-bold text-white m-4" />
          </label>
        </div>
        <div className="drawer-side w-auto">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && userRole === 'ADMIN' && (
              <>
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/tasks/create">Create Task</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/tasks">All Tasks</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>

            {!isLoggedIn ? (
              <div className="w-full flex items-center justify-center gap-2 mt-4">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-secondary">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 mt-4">
                <Link to="/user/profile" className="btn btn-primary">
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>

      {children}
    </div>
  );
}

export default HomeLayout;
