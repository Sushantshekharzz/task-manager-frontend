import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export default function Navbar({ name }) {

    const navigate = useNavigate();
    const [toggleIcon, setToggleIcon] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false);


    const firstLetter = name.charAt(0).toUpperCase();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        navigate('/');

    }

    const toggleIconFunc = () => {
        setToggleIcon((prev) => !prev)
    }
    const toggleMenuFunc = () => {
        setToggleMenu((prev) => !prev);
    };
    return (
        <nav class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu"
                            aria-expanded={toggleMenu ? 'true' : 'false'}
                            onClick={toggleMenuFunc} // Toggle mobile menu on button click
                        >
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open main menu</span>
                            <svg
                                class={`block size-6 ${toggleMenu ? 'hidden' : 'block'}`}
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg
                                className={`block size-6 ${toggleMenu ? 'block' : 'hidden'}`}
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`
                                    }
                                    aria-current="page"
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/teams"
                                    className={({ isActive }) =>
                                        `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`
                                    }
                                >
                                    Team
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-1.5"></span>
                            <span class="sr-only">View notifications</span>
                            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </button>
                        <div class="relative ml-3">
                            <div>
                                <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                    onClick={toggleIconFunc}
                                >
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">Open user menu</span>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#D1D5DB', width: '30px', height: '30px',
                                        borderRadius: '50%',
                                        fontSize: '18px',
                                    }}>{firstLetter}</div>
                                </button>
                            </div>
                            {toggleIcon &&
                                <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                    <a class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2"
                                        onClick={handleSignOut}
                                        style={{ cursor: 'pointer' }} 
                                    >Sign out</a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`sm:hidden ${toggleMenu ? 'block' : 'hidden'}`} id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `block rounded-md   px-3 py-2 text-base font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/teams"
                        className={({ isActive }) =>
                            `block rounded-md  px-3 py-2  text-base font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        Team
                    </NavLink>
                </div>
            </div>
        </nav>

    )
}
