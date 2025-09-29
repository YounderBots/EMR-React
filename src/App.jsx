import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import Layout from './Layout';
import userAvatar from './assets/images/userProfilePic.jpg'
import Button from './components/Button';

import { FaChartLine, FaClinicMedical, FaHospital } from "react-icons/fa";
import { FaKitMedical, FaUserDoctor } from 'react-icons/fa6';
import { MdOutlineSchedule } from "react-icons/md";
import { FaBedPulse } from "react-icons/fa6";
import { MdPermDeviceInformation } from "react-icons/md";
import Card from './components/Card';
import Textarea from './components/Textarea';
import Select from './components/Select';
import Container from './Container';
import Modal, { AlertModal, ConfirmModal, DrawerModal } from './components/Modal';
import Table from './components/Table';
import TableTemplate from './components/TableTemplate';





// Custom menu items for different user types
const customMenuItems = [
  {
    id: 1,
    name: 'Hospital Admin',
    icon: <FaHospital className='nav-iconSrc' />,
    path: '/hospital-admin',
    isActive: true
  },
  {
    id: 2,
    name: 'Medical Dashboard',
    icon: <FaKitMedical className='nav-iconSrc' />,
    path: '/medical-dashboard'
  },
  {
    id: 3,
    name: 'Clinic Dashboard',
    icon: <FaClinicMedical className='nav-iconSrc' />,
    path: '/clinic-dashboard'
  },
  {
    id: 4,
    name: 'Appointments',
    icon: <MdOutlineSchedule className='nav-iconSrc' />,
    path: '/appointments'
  },
  {
    id: 5,
    name: 'My Patients',
    icon: <FaBedPulse className='nav-iconSrc' />,
    path: '/my-patients'
  },
  {
    id: 6,
    name: 'Patient Profile',
    icon: <MdPermDeviceInformation className='nav-iconSrc' />,
    path: '/patient-profile'
  },
  {
    id: 7,
    name: 'Doctors',
    icon: <FaUserDoctor className='nav-iconSrc' />,
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

// Custom user info
const customUserInfo = {
  name: 'Ema Wilson',
  role: 'Department Admin',
  avatar: userAvatar // You can add an image URL here
};




const App = () => {
  const [textValue, setTextValue] = useState('')
  const [activeType, setActiveType] = useState('drawer');
  const types = [{
    type: 'drawer',
    label: 'Side Drawer',
    description: 'Slides in from the right side'
  }];



  useEffect(() => {
    document.body.className = 'light'
  }, [])


  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, max-content))',
    gap: 12,
    justifyContent: 'start',
  };


  const handleChange = (e) => {
    setTextValue(e.target.value);

  }





  return (
    <div className="App">
      <Layout
        menuItems={customMenuItems}
        userInfo={customUserInfo}
      >


        <div style={{ margin: 'auto', paddingTop: '10px' }}>
          <TableTemplate
            columns={[
              {
                key: 'serialNo',
                title: '#',
                width: '80px',
                align: 'center'
              },
              {
                key: 'name',
                title: 'Name',
                width: '200px'
              },
              {
                key: 'email',
                title: 'Email'
              },
              {
                align: 'center',
                key: 'role',
                title: 'Role'
              },
              {
                align: 'center',
                key: 'status',
                title: 'Status',
                type: 'badge'
              },
              {
                align: 'center',
                key: 'lastLogin',
                title: 'Last Login'
              }
            ]}
            data={[
              {
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
                email: 'john@example.com',
                id: 1,
                lastLogin: '2024-01-15',
                name: 'John Doe',
                role: 'Admin',
                status: 'active'
              },
              {
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
                email: 'jane@example.com',
                id: 2,
                lastLogin: '2024-01-10',
                name: 'Jane Smith',
                role: 'User',
                status: 'pending'
              },
              {
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
                email: 'mike@example.com',
                id: 3,
                lastLogin: '2024-01-05',
                name: 'Mike Johnson',
                role: 'Moderator',
                status: 'inactive'
              },
              {
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
                email: 'sarah@example.com',
                id: 4,
                lastLogin: '2024-01-14',
                name: 'Sarah Wilson',
                role: 'User',
                status: 'active'
              },
              {
                avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32&h=32&fit=crop&crop=face',
                email: 'alex@example.com',
                id: 5,
                lastLogin: '2024-01-12',
                name: 'Alex Chen',
                role: 'Developer',
                status: 'active'
              }
            ]}
            exportable
            pagination
            searchable
            title="User Management"
          />
        </div>




      </Layout>
    </div>
  );
}

export default App;