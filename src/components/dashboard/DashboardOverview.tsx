
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppointment } from '@/context/AppointmentContext';
import { Calendar, Users, Scissors, Clock } from 'lucide-react';

interface DashboardOverviewProps {
  role: 'employee' | 'stylist';
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ role }) => {
  const { services, stylists } = useAppointment();
  
  // Mock data
  const totalAppointments = 24;
  const upcomingAppointments = 8;
  const completedAppointments = 16;
  const totalClients = 42;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {role === 'employee' ? 'Active Stylists' : 'Upcoming Appointments'}
            </CardTitle>
            {role === 'employee' ? (
              <Scissors className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Clock className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {role === 'employee' ? stylists.length : upcomingAppointments}
            </div>
            <p className="text-xs text-muted-foreground">
              {role === 'employee' ? 'Available for bookings' : 'Scheduled this week'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {role === 'employee' ? 'Total Clients' : 'Completed Appointments'}
            </CardTitle>
            {role === 'employee' ? (
              <Users className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Calendar className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {role === 'employee' ? totalClients : completedAppointments}
            </div>
            <p className="text-xs text-muted-foreground">
              {role === 'employee' ? '+12% from last month' : 'Past 30 days'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {role === 'employee' ? 'Available Services' : 'Services Offered'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
            <p className="text-xs text-muted-foreground">
              Active on booking system
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              {role === 'employee' 
                ? 'Overview of recent appointments and actions' 
                : 'Your recent appointments and schedule'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>No recent activity to display</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              {role === 'employee' ? 'Quick Actions' : 'Today\'s Schedule'}
            </CardTitle>
            <CardDescription>
              {role === 'employee'
                ? 'Commonly used dashboard functions'
                : 'Your appointments for today'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {role === 'employee' ? (
                <p>Add quick action buttons here</p>
              ) : (
                <p>No appointments scheduled for today</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
