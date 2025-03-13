
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserMenu = () => {
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  
  if (!user) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link to="/auth">Sign In</Link>
      </Button>
    );
  }
  
  // Get initials from name or email
  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    
    return user.email ? user.email[0].toUpperCase() : 'U';
  };
  
  const getDashboardLink = () => {
    if (profile?.role === 'employee') return '/dashboard/employee';
    if (profile?.role === 'stylist') return '/dashboard/stylist';
    return null; // Regular users don't have dashboard access
  };
  
  const dashboardLink = getDashboardLink();
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full" size="icon">
          <Avatar className="h-9 w-9">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/appointments" className="w-full cursor-pointer" onClick={() => setOpen(false)}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>My Appointments</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="w-full cursor-pointer" onClick={() => setOpen(false)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="w-full cursor-pointer" onClick={() => setOpen(false)}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        {dashboardLink && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={dashboardLink} className="w-full cursor-pointer" onClick={() => setOpen(false)}>
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-muted-foreground" 
          onClick={() => {
            setOpen(false);
            signOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
