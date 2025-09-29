import React, { useState, useEffect, useRef } from 'react';
import './Layout.css';
import logo from './assets/images/logoCrop.png'
import { GiHamburgerMenu } from "react-icons/gi";
import InputField from './components/InputField';
import { BiHome, BiMessageAdd, BiNotification, BiStar } from 'react-icons/bi';
import { FcTodoList } from 'react-icons/fc';
import { RiTodoLine } from 'react-icons/ri';
import { GoAlert } from 'react-icons/go';
import { IoAlertCircle } from 'react-icons/io5';

// Sample menu structure - replace with your actual menu data
const sampleMenuItems = [
  {
    id: 1,
    name: 'Hospital Admin',
    icon: '🏥',
    path: '/hospital-admin',
    isActive: true
  },
  {
    id: 2,
    name: 'Medical Dashboard',
    icon: '📊',
    path: '/medical-dashboard'
  },
  {
    id: 3,
    name: 'Clinic Dashboard',
    icon: '🏢',
    path: '/clinic-dashboard'
  },
  {
    id: 4,
    name: 'Appointments',
    icon: '📅',
    path: '/appointments'
  },
  {
    id: 5,
    name: 'My Patients',
    icon: '👥',
    path: '/my-patients'
  },
  {
    id: 6,
    name: 'Patient Profile',
    icon: '👤',
    path: '/patient-profile'
  },
  {
    id: 7,
    name: 'Doctors',
    icon: '👨‍⚕️',
    path: '#',
    submenus: [
      { id: 71, name: 'Doctors Dashboard', path: '/doctors-dashboard' },
      { id: 72, name: 'Doctors Grid', path: '/doctors-grid' },
      { id: 73, name: 'Doctors Cards', path: '/doctors-cards' },
      { id: 74, name: 'Doctors Profile', path: '/doctors-profile' },
      { id: 75, name: 'Add Doctor', path: '/add-doctor' },
      { id: 76, name: 'Edit Doctor', path: '/edit-doctor' }
    ]
  },
  {
    id: 8,
    name: 'Patients',
    icon: '🏥',
    path: '#',
    submenus: [
      { id: 81, name: 'Patients Dashboard', path: '/patients-dashboard' },
      { id: 82, name: 'Patients List', path: '/patients-list' }
    ]
  }
];

const Layout = ({ children, menuItems = sampleMenuItems, userInfo = null }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeMenu, setActiveMenu] = useState(1);
  const [activeSubmenu, setActiveSubmenu] = useState(null);


  const [hovered, setHovered] = useState(null);
  const hideTimer = useRef(null);
  const menus = {
    star: ["Favorites"],
    todo: ["Tasks"],
    alert: ["Notifications"],
    message: ["New Message", "Inbox"],
    user: ["Profile", "Change Theme", "Logout"],
  };

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };
  }, []);

  // Called when pointer/focus enters trigger OR popover
  const handlePopoverEnter = (id) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setHovered(id);
  };

  // Called when pointer/focus leaves both trigger and popover
  const handlePopoverLeave = () => {
    // small delay to allow pointer to move into the popover
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setHovered(null);
      hideTimer.current = null;
    }, 150); // 100-250ms is a good UX window
  };

  const handleTheme = () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  }
};


  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMenuClick = (menuId, hasSubmenus) => {
    if (hasSubmenus) {
      toggleSubmenu(menuId);
    } else {
      setActiveMenu(menuId);
      setActiveSubmenu();
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  };

  const defaultUserInfo = {
    name: 'Ema Wilson',
    role: 'Department Admin',
    avatar: null
  };

  const user = userInfo || defaultUserInfo;

  return (
    <div className="layout">
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div className="layout-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div className="logo-container">
            <div className="logo-icon">
              <img src={logo} alt="" className='logo-icon' />
            </div>
            {isSidebarOpen && <span className="logo-text">EMR</span>}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="hamburger-line"><GiHamburgerMenu /></span>
          </button>
        </div>

        {/* User Info */}
        {isSidebarOpen && (
          <div className="sidebar-user">
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.role}</p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <div
                  className={`nav-link 
    ${activeMenu === item.id ? 'active' : ''} 
    ${item.submenus && activeSubmenu && item.submenus.some(s => s.id === activeSubmenu) ? 'active' : ''}
    ${item.submenus ? 'has-submenu' : ''}`}
                  onClick={() => handleMenuClick(item.id, !!item.submenus)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {isSidebarOpen && (
                    <>
                      <span className="nav-text">{item.name}</span>
                      {item.submenus && (
                        <span className={`nav-arrow ${expandedMenus[item.id] ? 'expanded' : ''}`}>
                          ▼
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Submenu */}
                {item.submenus && isSidebarOpen && (
                  <ul className={`submenu ${expandedMenus[item.id] ? 'submenu-open' : ''}`}>
                    {item.submenus.map((submenu) => (
                      <li key={submenu.id} className="submenu-item">
                        <div
                          className={`submenu-link ${activeMenu === submenu.id ? 'active' : ''}`}
                          onClick={() => {
                            setActiveMenu(item.id);   // parent stays highlighted
                            setActiveSubmenu(submenu.id); // submenu is active
                          }}
                        >
                          <div
                            className={`submenu-link ${activeSubmenu === submenu.id ? 'active' : ''}`}
                            onClick={() => {
                              setActiveMenu(item.id);
                              setActiveSubmenu(submenu.id);
                            }}
                          >
                            {activeSubmenu === submenu.id && <span className="submenu-active-arrow">›</span>}
                            {submenu.name}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Support Contact */}
        {isSidebarOpen && (
          <div className="sidebar-support">
            <div className="support-card">
              <div className="support-icon">📞</div>
              <div className="support-info">
                <span className="support-number">0987654321</span>
                <span className="support-text">Customer Support</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <header className="navbar">
          <div className="navbar-left">
            <button className="sidebar-toggle top" onClick={toggleSidebar}>
              <span className="hamburger-line"><GiHamburgerMenu /></span>
            </button>

            {/* BreadCrumbs Card  */}
            {/* <div className="breadcrumb">
              <span className="breadcrumb-home">🏠</span>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">Hospital Dashboard</span>
            </div> */}
          </div>

          <div className="navbar-center">
            <div className="search-container">

              <InputField
                customWidth="100%"
                placeholder="Test"
                size="custom"
                value=""
              />
            </div>
          </div>




          <div className="navbar-right">
            <div className="navbar-icons">

              {/* STAR */}
              <div
                className="nav-item"
                onMouseEnter={() => handlePopoverEnter("star")}
                onMouseLeave={handlePopoverLeave}
                onFocus={() => handlePopoverEnter("star")}
                onBlur={handlePopoverLeave}
                tabIndex={-1}
              >
                <button className="nav-icon-btn" aria-haspopup="true" aria-expanded={hovered === "star"}>
                  <BiStar />
                </button>

                {hovered === "star" && (
                  <div
                    className="popover"
                    onMouseEnter={() => handlePopoverEnter("star")}
                    onMouseLeave={handlePopoverLeave}
                    onFocus={() => handlePopoverEnter("star")}
                    onBlur={handlePopoverLeave}
                    role="menu"
                  >
                    {menus.star.map((m, i) => (
                      <div key={i} role="menuitem" tabIndex={0} className="popover-item">{m}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* TODO */}
              <div
                className="nav-item"
                onMouseEnter={() => handlePopoverEnter("todo")}
                onMouseLeave={handlePopoverLeave}
                onFocus={() => handlePopoverEnter("todo")}
                onBlur={handlePopoverLeave}
                tabIndex={-1}
              >
                <button className="nav-icon-btn"><RiTodoLine /></button>
                {hovered === "todo" && (
                  <div
                    className="popover"
                    onMouseEnter={() => handlePopoverEnter("todo")}
                    onMouseLeave={handlePopoverLeave}
                    role="menu"
                  >
                    {menus.todo.map((m, i) => <div key={i} role="menuitem" tabIndex={0} className="popover-item">{m}</div>)}
                  </div>
                )}
              </div>

              {/* ALERT */}
              <div
                className="nav-item"
                onMouseEnter={() => handlePopoverEnter("alert")}
                onMouseLeave={handlePopoverLeave}
                onFocus={() => handlePopoverEnter("alert")}
                onBlur={handlePopoverLeave}
                tabIndex={-1}
              >
                <button className="nav-icon-btn"><IoAlertCircle /></button>
                {hovered === "alert" && (
                  <div
                    className="popover"
                    onMouseEnter={() => handlePopoverEnter("alert")}
                    onMouseLeave={handlePopoverLeave}
                    role="menu"
                  >
                    {menus.alert.map((m, i) => <div key={i} role="menuitem" tabIndex={0} className="popover-item">{m}</div>)}
                  </div>
                )}
              </div>

              {/* MESSAGE */}
              <div
                className="nav-item"
                onMouseEnter={() => handlePopoverEnter("message")}
                onMouseLeave={handlePopoverLeave}
                onFocus={() => handlePopoverEnter("message")}
                onBlur={handlePopoverLeave}
                tabIndex={-1}
              >
                <button className="nav-icon-btn notification-btn" aria-haspopup="true" aria-expanded={hovered === "message"}>
                  <BiMessageAdd />
                  <span className="notification-badge">5</span>
                </button>
                {hovered === "message" && (
                  <div
                    className="popover"
                    onMouseEnter={() => handlePopoverEnter("message")}
                    onMouseLeave={handlePopoverLeave}
                    role="menu"
                  >
                    {menus.message.map((m, i) => <div key={i} role="menuitem" tabIndex={0} className="popover-item">{m}</div>)}
                  </div>
                )}
              </div>
            </div>
            {/* USER */}
            <div
              className="navbar-user nav-item"
              onMouseEnter={() => handlePopoverEnter("user")}
              onMouseLeave={handlePopoverLeave}
              onFocus={() => handlePopoverEnter("user")}
              onBlur={handlePopoverLeave}
              tabIndex={-1}
            >
              <div className="user-avatar" role="button" aria-haspopup="true" aria-expanded={hovered === "user"}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>

              {hovered === "user" && (
                <div
                  className="popover"
                  onMouseEnter={() => handlePopoverEnter("user")}
                  onMouseLeave={handlePopoverLeave}
                  role="menu"
                >
                  {menus.user.map((m, i) => (
                    <div
                      key={i}
                      role="menuitem"
                      tabIndex={0}
                      className="popover-item"
                      onClick={m === "Change Theme" ? handleTheme : undefined}
                    >
                      {m}
                    </div>
                  ))}                </div>
              )}
            </div>
          </div>


        </header>
        <header className="navbar">



          {/* BreadCrumbs Card  */}
          <div className="breadcrumb">
            <span className="breadcrumb-home">
              <BiHome />
            </span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Hospital Dashboard</span>
          </div>


          <div className="navbar-right">
            <div className="date-range">
              08/22/2025 - 09/20/2025
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

