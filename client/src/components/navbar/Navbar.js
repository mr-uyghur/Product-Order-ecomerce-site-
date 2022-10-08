import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const [active, setActive] = React.useState(false);
  return (
    <nav className="w-screen bg-white p-2">
      <div className="max-w-7xl mx-auto flex gap-x-2">
        <div class="relative inline-block text-left">
          <div>
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="menu-button"
              ariaExpanded="true"
              ariaHaspopup="true"
              onClick={() => setActive(!active)}
            >
              Options
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          {active && (
            <div
              class="absolute right-[-7rem] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              ariaOrientation="vertical"
              ariaLabelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1 flex flex-col gap-y-2 justify-center w-full" role="none">
                <Link
                  to="/"
                  className={`font-semibold hover:text-blue-600 ${pathname === '/' ? 'text-blue-600' : ''}`}
                  onClick={() => setActive(!active)}
                >
                  Products
                </Link>
                <Link
                  to="/order"
                  className={`font-semibold hover:text-blue-600 ${pathname === '/order' ? 'text-blue-600' : ''}`}
                  onClick={() => setActive(!active)}
                >
                  Orders
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* <Link to="/" className={`font-semibold hover:text-blue-600 ${pathname === '/' ? 'text-blue-600' : ''}`}>
          Products
        </Link>
        <Link to="/order" className={`font-semibold hover:text-blue-600 ${pathname === '/order' ? 'text-blue-600' : ''}`} >
          Orders
        </Link> */}
      </div>
    </nav>
  );
}
