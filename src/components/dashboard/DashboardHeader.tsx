
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  role: 'employee' | 'stylist';
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ role }) => {
  return (
    <header className="h-16 border-b border-border bg-background z-10">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-semibold text-lg text-primary">
            Luxe Hair Salon
          </Link>
          <span className="text-muted-foreground ml-2 text-sm px-2 py-1 bg-primary/10 rounded-md">
            {role === 'employee' ? 'Admin' : 'Stylist'}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
                aria-label="User menu"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
