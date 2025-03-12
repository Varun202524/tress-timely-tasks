
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Scissors, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  role: 'employee' | 'stylist';
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);

  const employeeLinks = [
    { 
      href: '/dashboard/employee', 
      label: 'Overview', 
      icon: <LayoutDashboard className="h-5 w-5" />,
      end: true
    },
    { 
      href: '/dashboard/employee/users', 
      label: 'Manage Users', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      href: '/dashboard/employee/stylists', 
      label: 'Manage Stylists', 
      icon: <Scissors className="h-5 w-5" /> 
    },
    { 
      href: '/dashboard/employee/appointments', 
      label: 'Appointments', 
      icon: <Calendar className="h-5 w-5" /> 
    }
  ];

  const stylistLinks = [
    { 
      href: '/dashboard/stylist', 
      label: 'Overview', 
      icon: <LayoutDashboard className="h-5 w-5" />,
      end: true
    },
    { 
      href: '/dashboard/stylist/appointments', 
      label: 'Appointments', 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      href: '/dashboard/stylist/schedule', 
      label: 'My Schedule', 
      icon: <Clock className="h-5 w-5" /> 
    },
    { 
      href: '/dashboard/stylist/profile', 
      label: 'My Profile', 
      icon: <UserCircle className="h-5 w-5" /> 
    }
  ];

  const links = role === 'employee' ? employeeLinks : stylistLinks;

  return (
    <div 
      className={cn(
        "bg-white border-r border-border h-full transition-all duration-300 flex flex-col",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className={cn("font-medium text-primary", collapsed && "hidden")}>
          {role === 'employee' ? 'Admin Dashboard' : 'Stylist Dashboard'}
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                end={link.end}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border mt-auto">
        <NavLink
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? (
            <span className="text-xs text-muted-foreground">Exit</span>
          ) : (
            <span className="text-sm text-muted-foreground">Return to Website</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
