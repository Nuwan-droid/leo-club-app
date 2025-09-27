import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import Sidebar from './admin_elements/sildebar';
import Header from './admin_elements/header';
import Breadcrumb from './admin_elements/Breadcrumb';


import Dashboard from './dashboard/dashboard';
import Users from './users/Users';
import Request from './request/request';
import Projects from './projects/ListProject';
import EventCalendar from './eventCalendar/ListEventCalendar';
import Newsletters from './newsletter/Newsletters';
import LearningHub from './learninghub/LearningHub';
import EventVolunteer from './eventvolunteer/EventVolunteer';
import Products from './products/ListProducts';
import Orders from './orders/Orders';
import Donations from './donations/Donations';
import Donation from './donation/Donation';
import ManageAbout from './manageabout/ManageAbout';
import AccountManagement from './admin_elements/AccountManagement';
import ManageExecutiveMembers from './manage-executive-members/ManageExecutiveMembers';



const Adminmain = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Breadcrumb />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/request" element={<Request />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/eventCalendar" element={<EventCalendar />} />
            <Route path="/newsletters" element={<Newsletters />} />
            <Route path="/learning-hub" element={<LearningHub />} />
            <Route path="/event-volunteer" element={<EventVolunteer />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/donation" element={<Donations />} />
            <Route path="/project-donation" element={<Donation />} />
            <Route path="/manage-about" element={<ManageAbout />} />
            <Route path="/account-settings" element={<AccountManagement />} />
           
            <Route path="*" element={<Navigate to="/admin" replace />} />
            <Route path="/manage-executive-members" element={<ManageExecutiveMembers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Adminmain;
