
import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { PageTransition } from '@/components/ui/PageTransition';

interface DashboardLayoutProps {
  role: 'employee' | 'stylist';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <DashboardHeader role={role} />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar role={role} />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardLayout;
